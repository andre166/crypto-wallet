import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DialogActions, IconButton, Tooltip } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PrintComponent from "../../Components/PrintComponent";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function DialogPrintPdf({ isDisabled }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Gerar relatório">
        <IconButton
          size="small"
          disabled={isDisabled}
          onClick={handleClickOpen}
        >
          <PictureAsPdfIcon />
        </IconButton>
      </Tooltip>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            alingItens: "center",
            justifyContent: "flex-end",
            padding: "10px 0px",
            overflow: "hidden",
          }}
        >
          <PrintComponent
            trigger={
              <IconButton>
                <PrintIcon />
              </IconButton>
            }
          ></PrintComponent>
        </div>

        <div
          style={{
            padding: 20,
            overflow: "auto",
            height: "25cm",
            display: "flex",
            alignItens: "center",
            justifyContent: "center",
            borderTop: "1px solid #eeeeee",
            borderBottom: "1px solid #eeeeee",
          }}
        >
          aa
        </div>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
