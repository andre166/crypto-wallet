import * as React from "react";
import PropTypes from "prop-types";
import { Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import OrdemDialogWrapper from "./OrdemDialog";
import moment from "moment";
import {
  currencyFormatterValorFull,
  currencyFormatter,
  FloatToBrlNumber,
} from "../../utils/currencyHelpers";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ backgroundColor: "#cee7ff" }}
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({
  orders = [],
  currencyVisibility,
  onCrudEnd,
  handleOpenSnackBar,
  ativo,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headCells = [
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  return (
    <Paper>
      <TableContainer sx={{ minWidth: 100, height: "calc(100vh - 418px)" }}>
        {/* <TableContainer sx={{ minWidth: 100 }}> */}
        <Table stickyHeader aria-label="sticky table" size="small">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={orders.length}
            headCells={headCells}
          />
          <TableBody>
            {stableSort(orders, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    <TableCell align="center" id={labelId}>
                      {moment(row.data_compra).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {currencyFormatterValorFull(row.cotacao_na_compra)}
                    </TableCell>
                    <TableCell align="center">
                      {currencyVisibility
                        ? currencyFormatterValorFull(row.aporte)
                        : "******"}
                    </TableCell>
                    <TableCell align="center">
                      {currencyVisibility
                        ? FloatToBrlNumber(row.saldo)
                        : "******"}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          position: "relative",
                          justifyContent: "center",
                          p: 0,
                          m: 0,
                        }}
                      >
                        <OrdemDialogWrapper
                          crudType="DELETE"
                          order={row}
                          onCrudEnd={onCrudEnd}
                          handleOpenSnackBar={handleOpenSnackBar}
                        />
                        <OrdemDialogWrapper
                          crudType="EDIT"
                          order={row}
                          ativo={ativo}
                          onCrudEnd={onCrudEnd}
                          handleOpenSnackBar={handleOpenSnackBar}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 36 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={false}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <Divider /> */}
    </Paper>
  );
}
