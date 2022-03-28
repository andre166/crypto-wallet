import * as React from "react";
import {
  Button,
  Box,
  MenuItem,
  Menu,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LinkIcon from "@mui/icons-material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function BasicMenu({ ativo }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let { explorer, website } = ativo?.info?.urls || {};

  const arr = [
    `https://coinmarketcap.com/currencies/${ativo?.info?.slug}/`,
    website[0],
    ...explorer,
  ];

  const msg = ["CoinMarketCap", "Site oficial"];

  const openExplorers = (url) => {
    window.open(url, "_blank");
    handleClose();
  };

  return (
    <Box>
      <Button
        startIcon={<SearchIcon />}
        endIcon={<ArrowDropDownIcon />}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        size="small"
        color="primary"
      >
        Sites
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {arr.map((e, i) => {
          if (i < 2) {
            return (
              <MenuItem key={e} onClick={() => openExplorers(e)}>
                <Box
                  sx={{
                    mr: 2,
                    color: "text.secondary",
                    width: 126,
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {msg[i]}
                </Box>
                {e}
                <Box sx={{ ml: "auto" }}>
                  <OpenInNewIcon sx={{ ml: 2, color: "text.secondary" }} />
                </Box>
              </MenuItem>
            );
          }

          return (
            <>
              {i == 2 && <Divider />}
              <MenuItem
                key={e}
                onClick={() => openExplorers(e)}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {e}
                <Box sx={{ ml: "auto" }}>
                  <OpenInNewIcon sx={{ ml: 2, color: "text.secondary" }} />
                </Box>
              </MenuItem>
            </>
          );
        })}
      </Menu>
    </Box>
  );
}
