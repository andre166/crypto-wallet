import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
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
  IconButton,
  Snackbar,
} from "@mui/material";
import MyTable from "./myTable";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import AtivoDialog from "./AtivoDialog";
import { getToken } from "../../services/cmcService";
import {
  getUserTokenList,
  countUserAportesInfo,
} from "../../services/userTokenService";
import { getOrderList } from "../../services/orderService";
import { mockedUser } from "../../utils/mockedUser";
import LoadingPage from "../../Components/LoadingPage";
import promisseAllWrapper from "../../utils/promisseAllWrapper";
import MuiAlert from "@mui/material/Alert";
import OrderDialog from "./OrderDialog";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import DeleteAtivoDialogWrapper from "./DeleteAtivoDialog";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  currencyFormatterGeral,
  currencyFormatterValorFull,
  currencyFormatter,
} from "../../utils/currencyHelpers";
import AtivosGrid from "./AtivosGrid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DolContext from "../../context/DollarContext";
import DownloadToXls from "../../Components/DownloadToXls";
import DialogPrintPdf from "./DialogPrintPdf";
import MenuExplorer from "./MenuExplorer";
import { getAtivoValues } from "./portifolioHelpers";

const columns = [
  {
    id: "data_compra",
    disablePadding: true,
    label: "Data da compra",
  },
  {
    id: "cotacao_na_compra",

    disablePadding: false,
    label: "Cotação na compra",
  },
  {
    id: "aporte",

    disablePadding: false,
    label: "Aporte",
  },
  {
    id: "saldo",

    disablePadding: false,
    label: "Saldo",
  },
  {
    id: "actions",

    disablePadding: false,
    label: "Ação",
  },
];

const useStyles = makeStyles({
  gridContainerGeral: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "460px auto",
    position: "relative",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    background: theme.palette.primary.main,
    color: "#fff",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "red",
  },
}));

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, pt: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Portifolio(props) {
  let { usdPrice } = useContext(DolContext);
  const classes = useStyles();

  const [userAporteInfo, setUserAporteInfo] = useState({});
  const [userInfoGeral, setUserInfoGeral] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [containerLoading, setContainerLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenList, setTokenList] = useState([]);
  const [userTokenList, setUserTokenList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [currencyVisibility, setCurrencyVisibility] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
    time: 3000,
  });

  const tabAtivo = userTokenList[tabValue];

  useEffect(() => {
    loadPage();
  }, []);

  const setTokenValues = ({ userTokens, tokensGeral }) => {
    userTokens.map((e) => {
      let token = tokensGeral?.find((t) => t.id == e.cmc_id);
      if (token) {
        e.info = { ...e.info, ...token };
      }
    });
  };

  const loadPage = async () => {
    let userID = mockedUser().id;

    let paramsToCountAportesAllAtivosInfo = {
      userID,
      skipMedia: 1,
      skipSaldo: 1,
    };

    const values = await promisseAllWrapper([
      getToken(),
      getUserTokenList(userID),
      countUserAportesInfo(paramsToCountAportesAllAtivosInfo),
    ]);

    console.log("values[0]", values[0]);
    console.log("values[1]", values[1]);
    console.log("values[2]", values[2]);

    let ordersResp = {};
    let countResp = {};

    if (values[1]?.length > 0) {
      setTokenValues({
        tokensGeral: values[0]?.data || [],
        userTokens: values[1],
      });

      ordersResp = await getOrderList(userID, values[1][0].id_user_cripto);

      let paramsToCountAportesInfo = {
        userID,
        user_cripto: values[1][0].id_user_cripto,
      };
      countResp = await countUserAportesInfo(paramsToCountAportesInfo);
    }

    setUserInfoGeral(values[2] || {});
    setUserAporteInfo(countResp);
    setOrders(ordersResp || {});
    setTokenList(values[0]?.data || []);
    setUserTokenList(values[1] || []);
    setLoading(false);
  };

  const handleOpenSnackBar = (open, severity, message, time) => {
    setAlert({
      open,
      severity,
      message,
      time,
    });
  };

  const handleCloseSnackBar = () => {
    setAlert({
      ...alert,
      open: false,
    });
  };

  const handleChangeCurrencyVisibility = () => () => {
    setCurrencyVisibility(!currencyVisibility);
  };

  const handleChangeCheked = async (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeTab = async (event, newValue) => {
    let selectedAtivo = userTokenList[newValue];
    let userID = mockedUser().id;

    setTabValue(newValue);

    setContainerLoading(true);

    let paramsToCountAportesInfo = {
      userID,
      user_cripto: selectedAtivo.id_user_cripto,
    };

    const values = await promisseAllWrapper([
      countUserAportesInfo(paramsToCountAportesInfo),
      getOrderList(userID, selectedAtivo.id_user_cripto),
    ]);

    setUserAporteInfo(values[0]);
    setOrders(values[1]);

    setContainerLoading(false);
  };

  const onCrudEnd = async (type) => {
    let userID = mockedUser().id;

    if (type == "ativo") {
      const resp = await getUserTokenList(userID);

      setTokenValues({ tokensGeral: tokenList, userTokens: resp });

      setUserTokenList(resp);
      return;
    }
    if (type == "ordem") {
      let paramsToCountAportesInfo = {
        userID,
        user_cripto: tabAtivo.id_user_cripto,
      };

      let paramsToCountAportesInfoGeral = {
        userID,
        skipMedia: 1,
        skipSaldo: 1,
      };

      let orderResp = await getOrderList(userID, tabAtivo.id_user_cripto);
      let countResp = await countUserAportesInfo(paramsToCountAportesInfo);
      let countGeralResp = await countUserAportesInfo(
        paramsToCountAportesInfoGeral
      );

      setUserAporteInfo(countResp || {});
      setUserInfoGeral(countGeralResp || {});
      setOrders(orderResp);

      return;
    }
  };

  const InfoAtivoPrice = ({
    title,
    subtitle,
    isBiggerComparison,
    noBorder,
    isZero,
    isUserSaldo,
    noPercent,
    noIcon,
    invertIcon,
  }) => (
    <Box
      style={{
        padding: "0px 0.7em",
      }}
      sx={{
        borderRight: !noBorder && "2px solid #e0e0e0",
      }}
    >
      <Typography color="text.primary" style={{ margin: 0, padding: 0 }}>
        {title}
      </Typography>
      {!isUserSaldo || (currencyVisibility && isUserSaldo) ? (
        <Typography
          color={
            !isZero
              ? isBiggerComparison
                ? "success.light"
                : "error.light"
              : "text.secondary"
          }
          style={{ margin: 0 }}
        >
          {isZero && isZero !== "default"
            ? noPercent
              ? currencyFormatterValorFull(0)
              : "0.00%"
            : subtitle}{" "}
          {!isZero && !noIcon && (
            <>
              {isBiggerComparison ? (
                invertIcon ? (
                  <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                ) : (
                  <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                )
              ) : invertIcon ? (
                <ArrowUpwardIcon sx={{ fontSize: 16 }} />
              ) : (
                <ArrowDownwardIcon sx={{ fontSize: 16 }} />
              )}
            </>
          )}
        </Typography>
      ) : (
        "******"
      )}
    </Box>
  );

  const renderAtivoPrice = () => {
    const { valorAtual } = getAtivoValues(tabAtivo, usdPrice);

    let oneHour =
      tabAtivo?.info?.quote?.USD?.percent_change_1h?.toFixed(2) + "%";
    let oneWeek =
      tabAtivo?.info?.quote?.USD?.percent_change_24h?.toFixed(2) + "%";
    let oneDay =
      tabAtivo?.info?.quote?.USD?.percent_change_7d?.toFixed(2) + "%";

    let isBiggerOneHour = oneHour.charAt(0) !== "-";
    let isBiggerOneDay = oneDay.charAt(0) !== "-";
    let isBiggerOneWeek = oneWeek.charAt(0) !== "-";

    let zeroRegex = /(-0.00%|0.00%)/g;

    let isZeroOneHour = oneHour.match(zeroRegex);
    let isZeroOneDay = oneDay.match(zeroRegex);
    let isZeroOneWeek = oneWeek.match(zeroRegex);

    console.log("valorAtual", valorAtual);

    return (
      <Box sx={{ p: 1, display: "flex" }}>
        <InfoAtivoPrice
          title="Preço"
          subtitle={currencyFormatterGeral(valorAtual)}
          isBiggerComparison={isBiggerOneHour}
          isZero={"default"}
        />

        <InfoAtivoPrice
          title="1H"
          subtitle={oneHour}
          isBiggerComparison={isBiggerOneHour}
          isZero={isZeroOneHour}
        />

        <InfoAtivoPrice
          title="1d"
          subtitle={oneDay}
          isBiggerComparison={isBiggerOneDay}
          isZero={isZeroOneDay}
        />
        <InfoAtivoPrice
          title="7d"
          subtitle={oneWeek}
          isBiggerComparison={isBiggerOneWeek}
          noBorder
          isZero={isZeroOneWeek}
        />
      </Box>
    );
  };

  const renderUserGeralInfo = () => {
    let { price, valorAtual } = getAtivoValues(tabAtivo, usdPrice);

    const { mediaAporte = 0, saldo = 0, totalAporte = 0 } = userAporteInfo;

    let isBiggerMedia = mediaAporte > valorAtual;

    console.log("mediaAporte", mediaAporte);
    console.log("price", price);
    console.log("isBiggerMedia", isBiggerMedia);

    let valorAtualTotal = valorAtual * saldo;

    let isBiggerValorAtual = valorAtualTotal > totalAporte;
    let diference = valorAtualTotal - totalAporte;

    let isLucro = diference.toString().charAt(0) !== "-";

    let isZeroValorAtual = valorAtualTotal == 0;
    let isZeroDiference = diference == 0;
    let isZeroMediaAporte = mediaAporte == 0 || !mediaAporte;

    return (
      <Box sx={{ p: 1, display: "flex" }}>
        <InfoAtivoPrice
          title="Aporte"
          subtitle={currencyFormatterValorFull(totalAporte)}
          isZero={"default"}
          isUserSaldo
        />
        <InfoAtivoPrice
          title="Valor atual"
          subtitle={currencyFormatterValorFull(valorAtualTotal)}
          isBiggerComparison={isBiggerValorAtual}
          isZero={isZeroValorAtual}
          noPercent={isZeroValorAtual}
          isUserSaldo
        />

        <InfoAtivoPrice
          title="Lucro/Prejuízo"
          subtitle={currencyFormatterValorFull(diference?.toFixed(2))}
          isBiggerComparison={isLucro}
          isZero={isZeroDiference}
          noPercent={isZeroDiference}
          isUserSaldo
        />

        <InfoAtivoPrice
          title="Preço Médio"
          subtitle={currencyFormatterValorFull(mediaAporte)}
          isBiggerComparison={!isBiggerMedia}
          isZero={isZeroMediaAporte}
          noPercent={isZeroMediaAporte}
          invertIcon
          isUserSaldo
        />

        <InfoAtivoPrice
          title="Saldo"
          subtitle={currencyFormatterValorFull(saldo, "decimal")}
          noBorder
          isZero={"default"}
          isUserSaldo
        />
      </Box>
    );
  };

  if (loading) return <LoadingPage />;

  const dataForDownload = {
    data: orders,
    fields: ["data_compra", "aporte", "cotacao_na_compra", "saldo"],
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 72px)",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <div
        className={classes.gridContainerGeral}
        style={{
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            padding: "12px 18px",
            background: "rgba(102, 178, 255, 0.15)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            marginLeft: 8,
            borderRadius: 6,
            justifyContent: "stretch",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: " center" }}>
              Resumo
              <Switch
                checked={checked}
                onChange={handleChangeCheked}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>

            <AtivoDialog
              tokenList={tokenList}
              onCrudEnd={onCrudEnd}
              userTokenList={userTokenList}
              handleOpenSnackBar={handleOpenSnackBar}
            />
          </div>

          <Paper sx={{ p: 2 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                size="small"
                onClick={handleChangeCurrencyVisibility()}
              >
                {currencyVisibility ? (
                  <VisibilityIcon fontSize={"small"} />
                ) : (
                  <VisibilityOffIcon fontSize={"small"} />
                )}
              </IconButton>
            </div>
            <List sx={{ width: "100%" }}>
              <ListItem
                disablePadding
                divider
                secondaryAction={
                  currencyVisibility
                    ? currencyFormatterValorFull(userInfoGeral.totalAporte)
                    : "******"
                }
              >
                <ListItemText primary="Aportes" />
              </ListItem>
              <ListItem
                disablePadding
                divider
                secondaryAction={currencyVisibility ? "Breve" : "******"}
              >
                <ListItemText primary="Patrimônio" />
              </ListItem>

              <ListItem
                disablePadding
                divider
                secondaryAction={currencyVisibility ? "Breve" : "******"}
              >
                <ListItemText primary="Lucro/Prejuízo" />
              </ListItem>
              <ListItem
                divider
                disablePadding
                secondaryAction={userTokenList.length}
              >
                <ListItemText primary="Ativos" />
              </ListItem>
            </List>
            <ListItem
              disablePadding
              secondaryAction={
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    sx={{ mr: 1 }}
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                  >
                    excel
                  </Button>
                  <Button variant="outlined" startIcon={<PictureAsPdfIcon />}>
                    PDF
                  </Button>
                </Box>
              }
            >
              <ListItemText primary="Relatório geral" />
            </ListItem>
          </Paper>

          <Box sx={{ mt: 2, display: "flex" }}>
            <Card sx={{ width: 232 }}>
              <CardContent>
                <div>
                  <div>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "success.main",
                        alignItems: "center",
                        display: "flex",
                      }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Maior lucro <ArrowUpwardIcon sx={{ ml: 1 }} />
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h5" component="div">
                      Shib
                    </Typography>

                    <Typography color="text.secondary" variant="h4">
                      298%
                    </Typography>
                  </div>
                </div>
                <Typography sx={{ mb: 0 }} color="text.secondary">
                  {currencyVisibility ? "R$ 90.000,00" : "******"}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 232, ml: 1 }}>
              <CardContent>
                <div>
                  <div>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "error.main",
                        alignItems: "center",
                        display: "flex",
                      }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Maior Prejuízo <ArrowDownwardIcon sx={{ ml: 1 }} />
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h5" component="div">
                      Shib
                    </Typography>

                    <Typography color="text.secondary" variant="h4">
                      298%
                    </Typography>
                  </div>
                </div>
                <Typography sx={{ mb: 0 }} color="text.secondary">
                  {currencyVisibility ? "R$ 90.000,00" : "******"}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              position: "relative",
              boxSizing: "border-box",
              flex: 1,
              mt: 2,
            }}
          >
            <Card sx={{ height: "96%", maxHeight: 460, position: "relative" }}>
              <PieChart />
            </Card>
          </Box>
        </div>
        <div
          style={{
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "98%",
              // maxWidth: 1100,
              height: "100%",
              position: "relative",
              marginTop: 8,
              overflow: "hidden",
            }}
          >
            {checked ? (
              <AtivosGrid userTokenList={userTokenList} />
            ) : userTokenList.length > 0 ? (
              <Box
                sx={{
                  width: "calc(100vw - 490px)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  height: "100%",
                  // border: "1px solid blue",
                  overflow: "hidden",
                }}
              >
                <Paper>
                  <StyledTabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ width: "100%", position: "relative" }}
                  >
                    {userTokenList.map((token) => (
                      <StyledTab
                        key={`user-token-tab-${token.info.symbol}`}
                        label={`${token.info.symbol}`}
                      />
                    ))}
                  </StyledTabs>
                </Paper>

                {!containerLoading && (
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            width: 45,
                            height: 45,
                            marginRight: "0.6em",
                          }}
                        >
                          <img
                            alt={tabAtivo?.info?.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              position: "relative",
                              objectFit: "contain",
                            }}
                            src={tabAtivo?.info?.logo}
                          />
                        </div>
                        <Box sx={{ mr: 1 }}>
                          <Typography color="text.secondary" variant="h4">
                            {tabAtivo?.info?.name}
                          </Typography>
                        </Box>
                        <DeleteAtivoDialogWrapper
                          ativo={tabAtivo}
                          onCrudEnd={onCrudEnd}
                          handleOpenSnackBar={handleOpenSnackBar}
                        />
                        <Box sx={{ mx: 1 }}>
                          <MenuExplorer ativo={tabAtivo} />
                        </Box>

                        {/* <Box>
                          <Tooltip title="Abrir site oficial do ativo">
                            <IconButton
                              onClick={() =>
                                window.open(
                                  tabAtivo?.info?.urls?.website[0] || "",
                                  "_blank"
                                )
                              }
                            >
                              <LinkIcon />
                            </IconButton>
                          </Tooltip>
                        </Box> */}
                      </Box>

                      <Card>{renderUserGeralInfo()}</Card>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 0.6,
                      }}
                    >
                      <Card>{renderAtivoPrice()}</Card>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Box sx={{ mx: 1 }}>
                          <OrderDialog
                            ativo={tabAtivo}
                            onCrudEnd={onCrudEnd}
                            handleOpenSnackBar={handleOpenSnackBar}
                            crudType="ADD"
                            usdPrice={usdPrice}
                          />
                        </Box>

                        <Box sx={{ ml: 1 }}>
                          <DownloadToXls
                            url={"http://localhost:3001/rest/json2xls"}
                            data={dataForDownload}
                          >
                            <Tooltip title="Download em excel">
                              <IconButton disabled={orders?.length == 0}>
                                <FileDownloadIcon />
                              </IconButton>
                            </Tooltip>
                          </DownloadToXls>
                        </Box>
                        <Box sx={{ mx: 1 }}>
                          <DialogPrintPdf isDisabled={orders?.length == 0} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}

                <Paper
                  sx={{
                    flex: 1,
                    mt: 0.5,
                    background: "none !important",
                    overflow: "auto",
                    // pr: 2,
                    // pb: 2,
                  }}
                  elevation={orders.length == 0 && 0}
                >
                  {userTokenList.map((token, i) => (
                    <TabPanel
                      key={`user-token-tabPanel-${token.name}`}
                      value={tabValue}
                      index={i}
                    >
                      {containerLoading ? (
                        <div
                          style={{
                            height: "100%",
                            flex: 1,
                            position: "relative",
                          }}
                        >
                          <LoadingPage />
                        </div>
                      ) : orders.length > 0 ? (
                        <MyTable
                          orders={orders}
                          currencyVisibility={currencyVisibility}
                          onCrudEnd={onCrudEnd}
                          handleOpenSnackBar={handleOpenSnackBar}
                          ativo={tabAtivo}
                          columns={columns}
                          usdPrice={usdPrice}
                        />
                      ) : (
                        <Alert severity="warning">
                          Nenhuma ordem cadastrada!
                        </Alert>
                      )}
                    </TabPanel>
                  ))}
                </Paper>
              </Box>
            ) : (
              <div>
                <Alert severity="warning">Nenhum ativo cadastrado!</Alert>
              </div>
            )}
          </div>
        </div>
      </div>
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.time || 3000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Portifolio;
