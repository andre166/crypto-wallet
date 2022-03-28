import React, { useState, createContext } from "react";
import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";
import Routes from "./routes";
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
  IconButton,
  MenuItem,
  Menu,
  FormGroup,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PieChartIcon from "@mui/icons-material/PieChart";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ForumIcon from "@mui/icons-material/Forum";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { getToken } from "./services/cmcService";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { currencyFormatterValorFull } from "./utils/currencyHelpers";
import DolContext from "./context/DollarContext";

function App({ socket }) {
  let pathname = window.location.pathname;

  const [reRender, setReRender] = useState(true);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dollarPrice, setDollarPrice] = useState(4.73);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <BrowserRouter>
        <DolContext.Provider
          value={{
            usdPrice: dollarPrice,
            setDollarPrice,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Minha Carteira
                </Typography>
                <Link
                  to="/SandBox"
                  style={{ textDecoration: "none", color: "#fff" }}
                  onClick={() => setReRender(!reRender)}
                >
                  <Button
                    sx={{ mr: 2 }}
                    variant={pathname == "/SandBox" ? "contained" : "text"}
                    color={pathname == "/SandBox" ? "info" : "inherit"}
                    startIcon={<BeachAccessIcon />}
                  >
                    SandBox
                  </Button>
                </Link>
                <Link
                  to="/Taxas"
                  style={{ textDecoration: "none", color: "#fff" }}
                  onClick={() => setReRender(!reRender)}
                >
                  <Button
                    sx={{ mr: 2 }}
                    variant={pathname == "/Taxas" ? "contained" : "text"}
                    color={pathname == "/Taxas" ? "info" : "inherit"}
                    startIcon={<AttachMoneyIcon />}
                  >
                    Taxas
                  </Button>
                </Link>
                <Link
                  to="/Farm"
                  style={{ textDecoration: "none", color: "#fff" }}
                  onClick={() => setReRender(!reRender)}
                >
                  <Button
                    sx={{ mr: 2 }}
                    variant={pathname == "/Farm" ? "contained" : "text"}
                    color={pathname == "/Farm" ? "info" : "inherit"}
                    startIcon={<LocalDiningIcon />}
                  >
                    Farm
                  </Button>
                </Link>

                <Link
                  to="/Portifolio"
                  style={{ textDecoration: "none", color: "#fff" }}
                  onClick={() => setReRender(!reRender)}
                >
                  <Button
                    variant={pathname == "/Portifolio" ? "contained" : "text"}
                    color={pathname == "/Portifolio" ? "info" : "inherit"}
                    startIcon={<PieChartIcon />}
                  >
                    Portifólio
                  </Button>
                </Link>

                <Link
                  to="/Forum"
                  style={{ textDecoration: "none", color: "#fff" }}
                  onClick={() => setReRender(!reRender)}
                >
                  <Button
                    sx={{ ml: 2 }}
                    variant={pathname == "/Forum" ? "contained" : "text"}
                    color={pathname == "/Forum" ? "info" : "inherit"}
                    startIcon={<ForumIcon />}
                  >
                    Forum
                  </Button>
                </Link>
                <Link
                  to="/Agenda"
                  style={{ textDecoration: "none", color: "#fff" }}
                  onClick={() => setReRender(!reRender)}
                >
                  <Button
                    sx={{ mx: 2 }}
                    variant={pathname == "/Agenda" ? "contained" : "text"}
                    color={pathname == "/Agenda" ? "info" : "inherit"}
                    startIcon={<BookmarksIcon />}
                  >
                    <Badge badgeContent={1} color="error">
                      Agenda
                    </Badge>
                  </Button>
                </Link>
                <Link
                  to="/Calendario"
                  style={{ textDecoration: "none", color: "#fff" }}
                  onClick={() => setReRender(!reRender)}
                >
                  <Button
                    sx={{ mx: 2 }}
                    variant={pathname == "/Calendario" ? "contained" : "text"}
                    color={pathname == "/Calendario" ? "info" : "inherit"}
                    startIcon={<CalendarMonthIcon />}
                  >
                    <Badge badgeContent={2} color="warning">
                      Calendário
                    </Badge>
                  </Button>
                </Link>

                <Box
                  sx={{
                    ml: 4,
                    mr: 2,
                    background: "#46a1fc",
                    py: 0.5,
                    px: 1.4,
                    borderRadius: 2,
                  }}
                >
                  <div>USD</div>

                  <div>{currencyFormatterValorFull(dollarPrice)}</div>
                </Box>
                <IconButton color="inherit" sx={{ mr: 2 }}>
                  <Badge badgeContent={4} color="warning">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
          </Box>
          <Routes />
        </DolContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
