import React, { Component } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "max-content",
    height: "max-content",
    boxSizing: "border-box",
  },
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  timerWrapper: {
    position: "absolute",
    color: "#000",
    fontWeight: "bold",
    background: "#e9e9e9",
    padding: "0.3em",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

const LOAD_TIME = 9;

class LoadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.loading ? props.loading : false,
      loadingTime: props.inicialTime ? props.inicialTime : LOAD_TIME,
      ignoreProps: false,
    };
  }

  loop = () => {
    let { loadingTime } = this.state;
    let { inicialTime, onTimeEnd } = this.props;

    let sec = --loadingTime;

    setTimeout(() => {
      this.setState({
        loadingTime: sec,
      });

      if (sec > 0) {
        this.loop();
      } else {
        this.setState({
          isLoading: false,
          loadingTime: inicialTime ? inicialTime : LOAD_TIME,
          ignoreProps: false,
        });
        onTimeEnd && onTimeEnd();
      }
    }, 1000);
  };

  handleClick = () => {
    const { timeLoading } = this.props;

    this.setState({
      isLoading: true,
    });

    timeLoading && this.loop();
  };

  componentDidUpdate(prevProps, prevState) {
    let { loading, isDebounce } = this.props;
    let prevLoading = prevProps.loading;

    if (prevLoading == true && loading == false && isDebounce) {
      this.setState({
        isLoading: true,
        ignoreProps: true,
      });
      this.loop();
    }
  }

  render() {
    const {
      classes,
      children,
      disableButton,
      loading,
      isDebounce,
      timeLoading,
    } = this.props;
    const { isLoading, loadingTime, ignoreProps } = this.state;

    let load = loading !== undefined && !ignoreProps ? loading : isLoading;
    let timeLoad = timeLoading !== undefined ? timeLoading : false;

    if (isDebounce && ignoreProps) {
      timeLoad = true;
    }

    return (
      <div className={classes.root}>
        <div
          className={classes.wrapper}
          onClick={load ? () => {} : this.handleClick}
        >
          {load && timeLoad && (
            <div className={classes.timerWrapper}>
              {loadingTime < 10 ? `0${loadingTime}` : loadingTime}
            </div>
          )}
          {React.cloneElement(children, {
            disabled: load || disableButton,
          })}

          {load && !timeLoad && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoadingButton);

LoadingButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  onTimeEnd: PropTypes.func,
  disableButton: PropTypes.bool,
  loading: PropTypes.bool,
  isDebounce: PropTypes.bool,
  inicialTime: PropTypes.number,
};
