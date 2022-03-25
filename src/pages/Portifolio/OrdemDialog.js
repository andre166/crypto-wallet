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
import { addOrder, deleteOrder, patchOrder } from "../../services/orderService";
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
import EditIcon from "@mui/icons-material/Edit";

function OrdemDialog({ onClose, open, rest }) {
  const { ativo, handleOpenSnackBar, onCrudEnd, crudType, order } = rest;

  const [dateError, setDateError] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const delOrder = async () => {
    let orderID = order.id_order;
    await deleteOrder(orderID);
    await onCrudEnd("ordem");
    handleClose();
    handleOpenSnackBar(true, "success", "Ordem excluída com sucesso!");
  };

  const orderModel = (
    {
      id_order,
      data_compra,
      aporte,
      cotacao_na_compra,
      fk_user_cripto_ativos,
      user_fk,
    } = {},
    ...rest
  ) => {
    let params = {
      id_order: id_order || null,
      data_compra: data_compra
        ? moment(data_compra).format("YYYY-MM-DD")
        : null,
      aporte: aporte ? currencyToFloat(aporte) : null,
      cotacao_na_compra: cotacao_na_compra
        ? currencyToFloat(cotacao_na_compra)
        : null,
      fk_user_cripto_ativos: fk_user_cripto_ativos || null,
      user_fk: user_fk || null,
    };

    return params;
  };

  const onSubmit = async (values) => {
    let params = {
      id_order: null,
      fk_user_cripto_ativos: ativo?.id_user_cripto_ativos,
      user_fk: mockedUser().id,
    };

    if (crudType === "EDIT") {
      let orderID = order.id_order;
      params.id_order = orderID;

      let objOrder = { ...values, ...params };
      let o = orderModel(objOrder);
      await delete o["user_fk"];

      await patchOrder(o);
    } else {
      let o = orderModel({ ...values, ...params });
      await addOrder(o);
    }

    await onCrudEnd("ordem");
    handleClose();
    handleOpenSnackBar(
      true,
      "success",
      crudType == "EDIT"
        ? "Ordem editada com sucesso!"
        : "Ordem inserida com sucesso!"
    );
  };

  const title = {
    ADD: "Inserir ordem",
    DELETE: "Excluir ordem",
    EDIT: "Editar ordem",
  };

  crudType == "EDIT" && console.log("order", order);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title[crudType]}</DialogTitle>

      {crudType !== "DELETE" ? (
        <Formik
          validationSchema={ordemSchema}
          onSubmit={onSubmit}
          initialValues={{
            data_compra: crudType === "EDIT" ? order.data_compra : new Date(),
            aporte:
              crudType === "EDIT"
                ? currencyFormatter(order.aporte * 100)
                : currencyFormatter(0),
            cotacao_na_compra:
              crudType === "EDIT"
                ? currencyFormatter(order.cotacao_na_compra * 100)
                : currencyFormatter(0),
          }}
          render={({ values, handleChange, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit} noValidate autocomplete="off">
              <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={ptBr}
                >
                  <DatePicker
                    label="Data da compra"
                    value={values.data_compra}
                    onChange={(newValue) => {
                      setFieldValue("data_compra", newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    onError={(erro) => {
                      if (erro) {
                        setDateError(true);
                      } else {
                        setDateError(false);
                      }
                    }}
                  />
                </LocalizationProvider>

                <NumberFormat
                  label="Aporte"
                  variant="outlined"
                  format={(e) => currencyFormatter(e)}
                  value={values.aporte}
                  name="aporte"
                  thousandSeparator
                  onChange={handleChange}
                  customInput={TextField}
                  margin="dense"
                  fullWidth
                  style={{ margin: "1.5em 0px" }}
                />

                <NumberFormat
                  label="Cotação na compra"
                  variant="outlined"
                  format={(e) => currencyFormatter(e)}
                  value={values.cotacao_na_compra}
                  name="cotacao_na_compra"
                  thousandSeparator
                  onChange={handleChange}
                  customInput={TextField}
                  margin="dense"
                  fullWidth
                />
              </Box>

              <DialogActions>
                <Button color="error" onClick={handleClose}>
                  cancelar
                </Button>

                <Button
                  variant="contained"
                  // onClick={() => onSubmit(values)}
                  type="submit"
                  disabled={
                    !values.data_compra ||
                    dateError ||
                    values.cotacao_na_compra < 0 ||
                    values.aporte.cotacao_na_compra == 0 ||
                    values.aporte < 0 ||
                    values.aporte.length == 0
                  }
                >
                  Cadastrar
                </Button>
              </DialogActions>
            </Form>
          )}
        />
      ) : (
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Não
          </Button>

          <Button variant="contained" onClick={delOrder}>
            Sim
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

OrdemDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function OrdemDialogWrapper(props) {
  const { crudType } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      {crudType == "ADD" ? (
        <Button
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
          size="small"
          color="primary"
          variant="contained"
        >
          Inserir ordem
        </Button>
      ) : crudType == "DELETE" ? (
        <IconButton size="small" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <IconButton size="small" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      )}

      <OrdemDialog open={open} onClose={handleClose} rest={{ ...props }} />
    </div>
  );
}
