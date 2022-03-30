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
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

function OrdemDialog({ onClose, open, rest }) {
  const { ativo, handleOpenSnackBar, onCrudEnd, crudType, order, usdPrice } =
    rest;

  const [dateError, setDateError] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const delOrder = async () => {
    let orderID = order.id_order;
    await deleteOrder(orderID);
    await onCrudEnd("ordem");
    handleClose();
    handleOpenSnackBar(true, "success", "Ordem excluída com sucesso!", 3000);
  };

  const orderModel = (
    {
      id_order,
      data_compra,
      aporte,
      cotacao_na_compra,
      saldo,
      fk_user_cripto,
      fk_user,
    } = {},
    ...rest
  ) => {
    let params = {
      id_order: id_order || null,
      data_compra: data_compra
        ? moment(data_compra).format("YYYY-MM-DD")
        : null,
      aporte: aporte ? currencyToFloat(aporte) : 0,
      cotacao_na_compra: cotacao_na_compra ? parseFloat(cotacao_na_compra) : 0,
      saldo: saldo || 0,
      fk_user_cripto: fk_user_cripto || null,
      fk_user: fk_user || null,
    };

    return params;
  };

  const onSubmit = async (values) => {
    let saldo = generateSaldo(values.aporte, values.cotacao_na_compra);
    let resp = null;

    let params = {
      id_order: null,
      saldo,
      fk_user_cripto: ativo?.id_user_cripto,
      fk_user: mockedUser().id,
    };

    let objOrder = { ...values, ...params };
    let o = orderModel(objOrder);

    if (crudType === "EDIT") {
      let orderID = order.id_order;
      params.id_order = orderID;

      let objOrder = { ...values, ...params };
      let o = orderModel(objOrder);
      await delete o["fk_user"];

      resp = await patchOrder(o);
    } else {
      let o = orderModel({ ...values, ...params });
      resp = await addOrder(o);
    }

    console.log("resp", resp);

    if (resp.Error) {
      handleOpenSnackBar(true, "error", resp.Error, 6000);
      return;
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

  const generateSaldo = (aporte, cotacao, returnType) => {
    let n1 = currencyToFloat(aporte);
    let n2 = parseFloat(cotacao);

    let s = n1 / n2;

    if (!s || s == "Infinity") {
      s = 0;
    }

    if (returnType == "string") {
      s = currencyFormatterValorFull(s, "decimal");
    }
    return s || 0;
  };

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
              crudType === "EDIT" ? order.cotacao_na_compra : 0,
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
                  startIcon={<CurrencyExchangeIcon />}
                />
                <Box>
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      marginTop: 15,
                      marginRight: 18,
                      zIndex: 4,
                    }}
                  >
                    <Tooltip title="Valor atual do ativo">
                      <IconButton
                        onClick={() =>
                          setFieldValue(
                            "cotacao_na_compra",
                            ativo?.info?.quote?.USD?.price * usdPrice * 100
                          )
                        }
                      >
                        <CurrencyExchangeIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <NumberFormat
                    endIcon={<div>a</div>}
                    label="Cotação na compra"
                    variant="outlined"
                    // format={(e) => currencyFormatter(e, "currency", 2, 7)}
                    // value={values.cotacao_na_compra}
                    value={parseFloat(values.cotacao_na_compra || 0)}
                    name="cotacao_na_compra"
                    // thousandSeparator
                    onChange={handleChange}
                    customInput={TextField}
                    margin="dense"
                    fullWidth
                  />
                </Box>

                <Divider sx={{ mt: 2, mb: 1 }} />
                <Box>
                  Saldo:{" "}
                  {generateSaldo(
                    values.aporte,
                    values.cotacao_na_compra,
                    "string"
                  )}
                </Box>
              </Box>

              <DialogActions>
                <Button color="error" onClick={handleClose}>
                  cancelar
                </Button>

                <Button
                  variant="contained"
                  disabled={
                    generateSaldo(values.aporte, values.cotacao_na_compra) <= 0
                  }
                  type="submit"
                >
                  {crudType === "ADD" ? "Cadastrar" : "Editar"}
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
