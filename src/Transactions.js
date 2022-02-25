import { transactions } from "./MockAPIResponse";
import { Table, Container } from 'react-bootstrap'

// create 2 hashes:, a customer's monthly totals & customer's overall totals

let customerMonthsHash = []
let customerTotalHash = []
transactions.forEach(transaction => {
  const month = new Date(transaction.Date).getMonth()+1 + "/" + new Date(transaction.Date).getFullYear()
  const over50Reward = transaction.Amount < 50 ? 0 : 
        (transaction.Amount >= 100 ? 50 : ( transaction.Amount - 50))
  const over100Reward = transaction.Amount < 100 ? 0 : ( transaction.Amount - 100) * 2
  const totalReward = over50Reward + over100Reward

  const customerAndMonth = transaction.Person + "-" + month
  if (!customerMonthsHash[customerAndMonth]) {
    customerMonthsHash[customerAndMonth] = totalReward
  } else {
    customerMonthsHash[customerAndMonth] += totalReward
  }
  if (!customerTotalHash[transaction.Person]) {
    customerTotalHash[transaction.Person] = totalReward
  } else {
    customerTotalHash[transaction.Person] += totalReward
  }

})

// turn monthly hash to objects
var key
var customerMonths = []
for (key in customerMonthsHash) {
    customerMonths.push({
        month: key.split("-")[0],
        customer: key.split("-")[1],
        amount: customerMonthsHash[key]
    })
}
// turn customer total hash to objects
var customerTotals = []
for (key in customerTotalHash) {
    customerTotals.push({
        customer: key,
        amount: customerTotalHash[key]
    })
}

const CustomerMonthsComponent = customerMonths.map((customerMonth, index) => {
  return (
    <tr key={index}>
      <td>{customerMonth.customer}</td>
      <td>{customerMonth.month}</td>
      <td>{customerMonth.amount}</td>
    </tr>
  )
})

const CustomerTotalsComponent = customerTotals.map((customerTotal, index) => {
  return (
    <tr key={index}>
      <td>{customerTotal.customer}</td>
      <td>{customerTotal.amount}</td>
    </tr>
  )
})

const MonthlySummary = () => {
  return ( 
    <>
      <h3>Monthly Summary </h3>
      <Container>
    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Customer</th>
            <th>Monthly Points</th>
          </tr>
        </thead>
        <tbody>
          {CustomerMonthsComponent}
        </tbody>
      </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {CustomerTotalsComponent}
        </tbody>
      </Table>
    </Container>
    </>
   );
}
 
export default MonthlySummary;
