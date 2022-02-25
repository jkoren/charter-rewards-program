import { transactions } from "./MockAPIResponse";
import { Table, Container } from 'react-bootstrap'

// create 2 hashes:, a customer's monthly totals & customer's overall totals

let customerMonthsHash = []
let customerTotal = []
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
  if (!customerTotal[transaction.Person]) {
    customerTotal[transaction.Person] = totalReward
  } else {
    customerTotal[transaction.Person] += totalReward
  }

})

// turn hash to objects
var key
var customerMonths = []
for (key in customerMonthsHash) {
    customerMonths.push({
        month: key.split("-")[0],
        customer: key.split("-")[1],
        amount: customerMonthsHash[key]
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
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {CustomerMonthsComponent}
        </tbody>
      </Table>
    </Container>
    </>
   );
}
 
export default MonthlySummary;
