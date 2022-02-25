import { transactions } from "./MockAPIResponse";
import { Table, Container } from 'react-bootstrap'

const result = transactions.reduce((subTotals, transaction) => {
  const month = new Date(transaction.Date).getMonth()+1
  const year = new Date(transaction.Date).getFullYear()
  const monthYear = month + "/" + year
  if (subTotals[monthYear] == null) {
    subTotals[monthYear] = []
  }
  if (subTotals[monthYear][transaction.Person] == null) {
    subTotals[monthYear][transaction.Person] = 0
  }
  subTotals[monthYear][transaction.Person] += transaction.Amount
  return subTotals
})

console.log(result)

const Transactions = () => {
  const TransactionsComponent = !transactions ? " " :
    transactions.map((transaction, index) => {
      const over50Reward = transaction.Amount < 50 ? 0 : 
        (transaction.Amount >= 100 ? 50 : ( transaction.Amount - 50))
      const over100Reward = transaction.Amount < 100 ? 0 : ( transaction.Amount - 100) * 2
      const totalReward = over50Reward + over100Reward
      return (
        <tr key={index}>
          <td>{transaction.Person}</td>
          <td>{new Date(transaction.Date).getMonth()+1}</td>
          <td>{transaction.Date}</td>
          <td>{transaction.Amount}</td>
          <td>{over50Reward === 0 ? "" : over50Reward.toFixed(0)}</td>
          <td>{over100Reward === 0 ? "" : over100Reward.toFixed(0)}</td>
          <td>{totalReward === 0 ? "" : totalReward.toFixed(0)}</td>
        </tr>
      )
    })

  return ( 
    <>
      <h3>Transactions </h3>
      <Container>
    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Month</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Over $50 Rewards</th>
            <th>Over $100 Rewards</th>
            <th>Total Rewards</th>
          </tr>
        </thead>
        <tbody>
          {TransactionsComponent}
        </tbody>
      </Table>
    </Container>
    </>
   );
}
 
export default Transactions;
