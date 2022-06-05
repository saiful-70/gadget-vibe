import { useQuery } from "react-query";
import { commerce } from "../../lib/commerce";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";

const Orders = () => {
  const { data, isLoading } = useQuery("orders", () => {
    const customerData = commerce.customer.about();
    const orders = commerce.customer.getOrders(customerData.id);
    return orders;
  });
  if (isLoading) <CircularProgress />;
  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      {data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Order Table">
            <TableHead>
              <TableRow sx={{ fontWeight: 700 }}>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Qunatity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Paid?</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>

                  <TableCell align="right">
                    {row.order.line_items.length}
                  </TableCell>
                  <TableCell align="right">
                    {row.order.total.formatted_with_symbol}
                  </TableCell>
                  <TableCell align="right">{row.status_payment}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Orders;
