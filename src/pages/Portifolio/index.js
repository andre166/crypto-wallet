import React, { useState, useEffect } from "react";
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
import { getUserTokenList } from "../../services/userTokenService";
import { getOrderList } from "../../services/orderService";
import { mockedUser } from "../../utils/mockedUser";
import LoadingPage from "../../Components/LoadingPage";
import promisseAllWrapper from "../../utils/promisseAllWrapper";
import MuiAlert from "@mui/material/Alert";
import OrdemDialog from "./OrdemDialog";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import DeleteAtivoDialogWrapper from "./DeleteAtivoDialog";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { currencyFormatterGeral } from "../../utils/currencyHelpers";
import AtivosGrid from "./AtivosGrid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

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

function Portifolio() {
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
  });

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    let userID = mockedUser().id;

    const values = await promisseAllWrapper([
      getToken(),
      getUserTokenList(userID),
    ]);

    console.log("values[0]", values[0]);
    console.log("values[1]", values[1]);

    let ordersResp = {};

    if (values[1]?.length > 0) {
      values[1].map((e) => {
        let token = values[0]?.data.find((t) => t.id == e.cmc_id);
        if (token) {
          e.info = { ...e.info, ...token };
        }
      });

      ordersResp = await getOrderList(
        userID,
        values[1][0].id_user_cripto_ativos
      );
    }

    setOrders(ordersResp);
    setTokenList(values[0]?.data || []);
    setUserTokenList(values[1] || []);
    setLoading(false);
  };

  const handleOpenSnackBar = (open, severity, message) => {
    setAlert({
      open,
      severity,
      message,
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

    let ordersResp = await getOrderList(
      userID,
      selectedAtivo.id_user_cripto_ativos
    );

    setOrders(ordersResp);

    setContainerLoading(false);
    // setTimeout(() => {
    // }, 1000);
  };

  const classes = useStyles();

  const onCrudEnd = async (type) => {
    let userID = mockedUser().id;

    if (type == "ativo") {
      const resp = await getUserTokenList(userID);
      setUserTokenList(resp);
      return;
    }
    if (type == "ordem") {
      const selectedAtivo = userTokenList[tabValue];

      const ordersResp = await getOrderList(
        userID,
        selectedAtivo.id_user_cripto_ativos
      );
      setOrders(ordersResp);

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
          {isZero && isZero !== "default" ? "0.00%" : subtitle}{" "}
          {!isZero && (
            <>
              {isBiggerComparison ? (
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
    let price = userTokenList[tabValue]?.info?.quote?.USD?.price;
    let oneHour =
      userTokenList[tabValue]?.info?.quote?.USD?.percent_change_1h?.toFixed(2) +
      "%";
    let oneWeek =
      userTokenList[tabValue]?.info?.quote?.USD?.percent_change_24h?.toFixed(
        2
      ) + "%";
    let oneDay =
      userTokenList[tabValue]?.info?.quote?.USD?.percent_change_7d?.toFixed(2) +
      "%";

    let isBiggerOneHour = oneHour.charAt(0) !== "-";
    let isBiggerOneDay = oneDay.charAt(0) !== "-";
    let isBiggerOneWeek = oneWeek.charAt(0) !== "-";

    let zeroRegex = /(-0.00%|0.00%)/g;

    let isZeroOneHour = oneHour.match(zeroRegex);
    let isZeroOneDay = oneDay.match(zeroRegex);
    let isZeroOneWeek = oneWeek.match(zeroRegex);

    return (
      <Box sx={{ p: 1, display: "flex" }}>
        <InfoAtivoPrice
          title="USD"
          subtitle={currencyFormatterGeral(price, "en-US", "USD")}
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
    let price = userTokenList[tabValue]?.info?.quote?.USD?.price?.toFixed(2);
    let oneHour =
      userTokenList[tabValue]?.info?.quote?.USD?.percent_change_1h?.toFixed(2) +
      "%";
    let oneWeek =
      userTokenList[tabValue]?.info?.quote?.USD?.percent_change_24h?.toFixed(
        2
      ) + "%";
    let oneDay =
      userTokenList[tabValue]?.info?.quote?.USD?.percent_change_7d?.toFixed(2) +
      "%";

    let isBiggerOneHour = oneHour.charAt(0) !== "-";
    let isBiggerOneDay = oneDay.charAt(0) !== "-";
    let isBiggerOneWeek = oneWeek.charAt(0) !== "-";

    let zeroRegex = /(-0.00%|0.00%)/g;

    let isZeroOneHour = oneHour.match(zeroRegex);
    let isZeroOneDay = oneDay.match(zeroRegex);
    let isZeroOneWeek = oneWeek.match(zeroRegex);

    return (
      <Box sx={{ p: 1, display: "flex" }}>
        <InfoAtivoPrice
          title="Aporte"
          subtitle={currencyFormatterGeral(price, "en-US", "USD")}
          isBiggerComparison={isBiggerOneHour}
          isZero={"default"}
          isUserSaldo
        />
        <InfoAtivoPrice
          title="Valor atual"
          subtitle={currencyFormatterGeral(price, "en-US", "USD")}
          isBiggerComparison={isBiggerOneHour}
          isZero={"default"}
          isUserSaldo
        />

        <InfoAtivoPrice
          title="Lucro/Prejuízo"
          subtitle={currencyFormatterGeral(price, "en-US", "USD")}
          isBiggerComparison={isBiggerOneHour}
          isZero={"default"}
          isUserSaldo
        />

        <InfoAtivoPrice
          title="Preço Médio"
          subtitle={oneHour}
          isBiggerComparison={isBiggerOneHour}
          isZero={isZeroOneHour}
          isUserSaldo
        />

        <InfoAtivoPrice
          title="Saldo"
          subtitle={oneDay}
          isBiggerComparison={isBiggerOneDay}
          isZero={isZeroOneDay}
          noBorder
          isUserSaldo
        />
      </Box>
    );
  };

  if (loading) return <LoadingPage />;

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
                secondaryAction={currencyVisibility ? "R$ 90,00" : "******"}
              >
                <ListItemText primary="Patrimônio" />
              </ListItem>

              <ListItem
                disablePadding
                divider
                secondaryAction={currencyVisibility ? "R$ 90,00" : "******"}
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
                    // variant="fullWidth"
                    sx={{ width: "100%", position: "relative" }}
                  >
                    {userTokenList.map((token) => (
                      <StyledTab
                        key={`user-token-tab-${token.name}`}
                        label={`${token.symbol}`}
                      />
                    ))}
                  </StyledTabs>
                </Paper>

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
                    <Card>{renderAtivoPrice()}</Card>
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
                    <Box>
                      <DeleteAtivoDialogWrapper
                        ativo={userTokenList[tabValue]}
                        onCrudEnd={onCrudEnd}
                        handleOpenSnackBar={handleOpenSnackBar}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Box sx={{ mx: 1 }}>
                        <OrdemDialog
                          ativo={userTokenList[tabValue]}
                          onCrudEnd={onCrudEnd}
                          handleOpenSnackBar={handleOpenSnackBar}
                          crudType="ADD"
                        />
                      </Box>
                      <Box sx={{ mx: 1 }}>
                        <Tooltip title="Abrir ativo no Coin Market Cap">
                          <IconButton size="small">
                            <OpenInNewIcon
                              variant="outlined"
                              onClick={() =>
                                window.open(
                                  `https://coinmarketcap.com/currencies/${userTokenList[tabValue].slug}/`,
                                  "_blank"
                                )
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Box sx={{ mx: 1 }}>
                        <Tooltip title="Download excel">
                          <IconButton
                            size="small"
                            disabled={orders?.length == 0}
                          >
                            <FileDownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box sx={{ ml: 1 }}>
                        <Tooltip title="Gerar relatório">
                          <IconButton disabled={orders?.length == 0}>
                            <PictureAsPdfIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Paper
                  sx={{
                    flex: 1,
                    mt: 0.5,
                    background: "none !important",
                    overflow: "auto",
                    pr: 2,
                    pb: 2,
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
                        <>
                          <MyTable
                            orders={orders}
                            currencyVisibility={currencyVisibility}
                            onCrudEnd={onCrudEnd}
                            handleOpenSnackBar={handleOpenSnackBar}
                            ativo={userTokenList[tabValue]}
                          />
                          <Box sx={{ mt: 3 }}>
                            <Paper>
                              <BarChart />
                            </Paper>
                          </Box>
                        </>
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
        autoHideDuration={3000}
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
