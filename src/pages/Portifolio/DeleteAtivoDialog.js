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
  DialogContent,
  Alert,
} from "@mui/material";
import { addOrder } from "../../services/orderService";
import mockedUser from "../../utils/mockedUser";
import { Formik, Form, ErrorMessage } from "formik";
import ordemSchema from "./schemas/ordemSchema";
import moment from "moment";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ptBr from "date-fns/locale/pt-BR";
import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";
import {
  currencyFormatterValorFull,
  currencyFormatter,
  currencyToFloat,
} from "../../utils/currencyHelpers";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteAtivoDialog({ onClose, open, rest }) {
  const { ativo, handleOpenSnackBar, onCrudEnd } = rest;

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async () => {
    console.log("excluindo...");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        Deseja excluir {ativo?.info?.name}({ativo?.info?.symbol})
      </DialogTitle>

      <DialogContent>
        <Alert severity="warning">
          Será excluído o ativo e todas as ordens do mesmo (as ordens excluídas
          não poderão ser recuperadas uma vez em que forem excluídas).
        </Alert>
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Não
        </Button>

        <Button variant="contained" onClick={onSubmit}>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteAtivoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function DeleteAtivoDialogWrapper(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        // startIcon={<DeleteIcon />}
        size="small"
        color="error"
        variant="outlined"
      >
        <DeleteIcon />
      </IconButton>

      <DeleteAtivoDialog
        open={open}
        onClose={handleClose}
        rest={{ ...props }}
      />
    </div>
  );
}
