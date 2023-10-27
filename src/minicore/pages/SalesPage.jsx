import dayjs from 'dayjs';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MinicoreLayout } from "../layout/MinicoreLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { startFetchingSales } from '../../store/sale';

export const SalesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onNewSale = () => {
    navigate("/createSale");
  };

  const onGetSales = () => {
    const valueStartDate = new Date(startDate.$d).toISOString();
    const valueEndDate = new Date(endDate.$d).toISOString();
    dispatch(startFetchingSales({valueStartDate, valueEndDate}))
  }

  const { sales } = useSelector(state => state.sales);

  const columns = [
    { id: "seller", label: "Seller", minWidth: 170 },
    { id: "totalSales", label: "Total Sales", minWidth: 100 },
    {
      id: "totalAmount",
      label: "Total Amount",
      minWidth: 100,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs())
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <MinicoreLayout>
      <Grid container spacing={0} sx={{ mb: 2 }}>
        <Grid item sx={{ ml: 4 }}>
          <Typography variant="h4" color="primary.main" component="div">
            Sales
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        sx={{ minHeight: "100vh", padding: 4 }}
      >
        <Grid container direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Button variant="contained" onClick={onNewSale}>
            New Sale
          </Button>
          <Grid justifyContent="space-between">
            <DatePicker
              sx={{ marginInline: 2}}
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              />
            <DatePicker
              sx={{ marginInline: 2}}
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              />
            <Button 
              sx={{ padding: 2}}
              variant="contained" 
              onClick={onGetSales}
            >
              Get sales
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    { columns.map((column) => (
                      <TableCell 
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth}}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  { 
                    sales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover tabIndex={-1} key={row.seller._id}>
                            { columns.map(({id, align, format}) => {
                              const value = row[id];
                              return(
                                <TableCell key={id} align={align}>
                                  { format && typeof value === 'number' ? format(value) : id === 'seller' ? row.seller.username : value }
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={sales.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </MinicoreLayout>
  );
};
