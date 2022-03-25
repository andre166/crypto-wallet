import React, { useState } from "react";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  autocompleteClasses,
  Button,
  IconButton,
  DialogTitle,
  Dialog,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
  LinearProgress,
  ListItem,
  Tooltip,
  tooltipClasses,
  CircularProgress,
  circularProgressClasses,
  Box,
  AppBar,
  Toolbar,
  MenuIcon,
  Tab,
  Tabs,
  Switch,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
  TextField,
  useMediaQuery,
  ListSubheader,
  Popper,
  DialogActions,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import { addTokenOnUser } from "../../services/userTokenService";
import mockedUser from "../../utils/mockedUser";

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = [];

  children.forEach((item) => {
    itemData.push([item[0], item[1].name]);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * 8}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + 8,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
}

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

function SimpleDialog({ onClose, open, rest }) {
  const { tokenList, onCrudEnd, userTokenList, handleOpenSnackBar } = rest;
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    onClose();
    setInputValue("");
    setValue("");
  };

  const onSubmit = async () => {
    let params = {
      id_user_cripto_ativos: null,
      name: value.name,
      slug: value.slug,
      symbol: value.symbol,
      token_address: value.token_address || "",
      cmc_id: value.id,
      user_fk: mockedUser().id,
    };
    await addTokenOnUser(params);
    await onCrudEnd("ativo");
    handleClose();
    handleOpenSnackBar(true, "success", "Ativo cadastrado com sucesso!");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Cadastrar Ativo</DialogTitle>
      <div style={{ padding: 18 }}>
        <Autocomplete
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          getOptionDisabled={(option) => {
            if (userTokenList.find((e) => e.name == option.name)) {
              return true;
            }
          }}
          sx={{ width: 300 }}
          disableListWrap
          PopperComponent={StyledPopper}
          ListboxComponent={ListboxComponent}
          options={tokenList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Token" />}
          renderOption={(props, option) => [props, option]}
          renderGroup={(params) => params}
        />
      </div>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          cancelar
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={!inputValue}>
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        size="small"
        color="primary"
        variant="contained"
      >
        Cadastrar Ativo
      </Button>

      <SimpleDialog open={open} onClose={handleClose} rest={{ ...props }} />
    </div>
  );
}
