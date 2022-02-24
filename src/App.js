import React from 'react';
import axios from 'axios';
import './App.css';
import { Container, Table, Form, Button, Accordion, Badge } from 'react-bootstrap';
import Header from './Header';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    }
  }

  url = process.env.REACT_APP_SERVER // class variable for DRYness

  getStocks = () => {
    axios.get(this.url)
    .then((stockData) => this.setState({ stocks: stockData.data }))
    .then(() => this.updatePrices(this.state.stocks))
  }

  componentDidMount() { this.getStocks() }

  deleteStock = async (id) => {
    try {
      await axios.delete(this.url+'/'+id);
      let updatedStocks = this.state.stocks.filter(s => s._id !== id);
      this.setState( {stocks: updatedStocks} )  
    } catch (err) { console.log(err) }
  }

  addStock = async (symbol) => {
    if(this.state.stocks.filter(s => s.ticker === symbol)[0]) {
      alert(symbol+' is already displayed')
    } else {
      let aStock = await axios.post(this.url+'?ticker='+symbol, );
      let pData = await axios.get('https://finnhub.io/api/v1/quote?token=c7talcqad3i8dq4tunfg&symbol='+symbol);
      aStock.data.price = pData.data.c;
      this.setState({ stocks: [...this.state.stocks, aStock.data]})  
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.addStock(e.target.ticker.value.toUpperCase());
    e.target.reset()
  }

  updatePrices = async (sArray) => {
    let updStocks = JSON.parse(JSON.stringify(sArray));
    for (let i=0; i<sArray.length; i++) {
      let pData = await axios.get('https://finnhub.io/api/v1/quote?token=c7talcqad3i8dq4tunfg&symbol='+updStocks[i].ticker);
      updStocks[i].price = pData.data.c;
    }
    this.setState({ stocks: updStocks })
  }
  
  render() {
    let tList = this.state.stocks.map((e,i) => 
      <tr key={i}>
        <td>{e.ticker}</td>
        <td>{Math.round(e.price)}</td>
        <td>{e.price ? Math.round(e.price*e.shares) : 0}</td>
        <td>{Math.round((e.debt-e.cash)*10)/10}</td>
        <td>{e.price ? Math.round(e.price*e.shares+e.debt-e.cash) : 0}</td>
        <td>{Math.round((e.annual[0].ebit+e.annual[0].da)*10)/10}</td>
        <td>{Math.round((e.annual[0].capex)*10)/10}</td>
        <td>{e.price ? Math.round((e.price*e.shares+e.debt-e.cash)/(e.annual[0].ebit+e.annual[0].da)) : 0}x</td>
        <td><Badge bg="secondary" onClick={()=> this.deleteStock(e._id)}>x</Badge></td>
      </tr>
    )

    return (
      <>
        <Header />
        <Container>
          <h3>Meaningful, simple, stock valuation</h3>
          <h6>Units $b, except price in $ and nondimensional items</h6>
         </Container>
        <Container>
          <Table striped variant="dark" size="sm">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>MktCap</th>
                <th>NetDebt</th>
                <th>TEV</th>
                <th>Ebitda</th>
                <th>Capex</th>
                <th>TEV/ebitda</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tList}
            </tbody>
          </Table>
        </Container>
        <Container>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Add new stock</Accordion.Header>
              <Accordion.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" name='ticker' placeholder="ticker" />
                  </Form.Group>
                  <Button variant="outline-secondary" type="submit">Submit</Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Why is TEV more meaningful than p/e...</Accordion.Header>
              <Accordion.Body>
                P/E mostly ignores the capital structure of the business.  TEV (Total Enterprise Value)
                fully accounts for it.
                A simple expample could help us see the issue.  Business A has no cash and 50 of debt.
                Business B has 100 cash and no debt.  Both have the same earnings and p/e.
                Which one would you buy?
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
        <footer>
          <p>Created by GoodHacker 2022</p>
        </footer>
      </>
    )  
  }
}

export default App;
