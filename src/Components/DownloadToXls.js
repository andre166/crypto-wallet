import React, { Component } from "react";
import { debounce } from "lodash";

class DownloadToXls extends Component {
  constructor() {
    super();

    this.reset = debounce(this.reset, 500, { leading: false, trailing: true });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.reset();
    }
  }

  reset = () => {
    this.form && this.form.reset();
  };

  render() {
    return (
      <form
        ref={(node) => {
          this.form = node;
        }}
        action={this.props.url}
        method={"post"}
      >
        <textarea
          style={{ display: "none" }}
          name={"data"}
          defaultValue={JSON.stringify(this.props.data)}
        />

        {React.Children.map(
          this.props.children,
          (child) =>
            child &&
            React.cloneElement(child, {
              ...child.props,
              onClick: (e) => {
                this.form.submit();
              },
            })
        )}
      </form>
    );
  }
}
export default DownloadToXls;
