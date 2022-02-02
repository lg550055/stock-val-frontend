import React from 'react';
import axios from 'axios';
import './App.css';
import { Container, Table, Form, Button, Accordion, Badge } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';


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
  }

  componentDidMount() { this.getStocks() }

  deleteStock = async (id) => {
    try {
      await axios.delete(this.url+'/'+id);
      let updatedStocks = this.state.stocks.filter(s => s._id !== id);
      this.setState( {stocks: updatedStocks} )  
    } catch (err) { console.log(err) }
  }

  addStock = async (stock) => {
    let aStock = await axios.post(this.url, stock);
    console.log(aStock.data);
    this.setState({ stocks: [...this.state.stocks, aStock.data]})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let newStock = {
      ticker: e.target.ticker.value,
      fy2021: {
        revenue: e.target.revenue.value,
        ebitda: e.target.ebitda.value,
        capex: e.target.capex.value,
        shares: e.target.shares.value,
        cash: e.target.cash.value,
        debt: e.target.debt.value
      }  
    };
    this.addStock(newStock);
  }


  // getP = (ticker='BABA') => {
  //   axios.get('https://finnhub.io/api/v1/quote?token=c7talcqad3i8dq4tunfg&symbol='+ticker)
  //     .then(res => res.data.c);
  // }

  // getPrice = (ticker='BABA') => {
  //   let url = 'https://stock-val.herokuapp.com/price?ticker='+ticker;
  //   axios.get(url)
  //     .then((pData) => pData.data)
  // }
  
  render() {

    let tList = this.state.stocks.map((e,i) => 
      <tr key={i}>
        <td>{e.ticker}</td>
        <td>{e.price}</td>
        <td>{e.price * e.fy2021.shares + e.fy2021.debt - e.fy2021.cash}</td>
        <td>{e.fy2021.revenue}</td>
        <td>{e.fy2021.ebitda - e.fy2021.capex}</td>
        <td><Badge bg="secondary" onClick={()=> this.deleteStock(e._id)}>delete</Badge></td>
      </tr>
    )

    return (
      <>
        <Header />
          <br></br>
          <Container>
            <h3>Meaningful, simple, stock valuation</h3>
            <br></br>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Price</th>
                  <th>TEV</th>
                  <th>TEV/rev</th>
                  <th>TEV/E-C</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tList}
              </tbody>
            </Table>
          </Container>
          <br></br>
          <Container>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add new stock</Accordion.Header>
                <Accordion.Body>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label>Add new stock</Form.Label>
                      <Form.Control type="text" name='ticker' placeholder="ticker" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>FY2021 Financials</Form.Label>
                      <Form.Control type="number" name="revenue" placeholder="revenue" />
                      <Form.Control type="number" name="ebitda" placeholder="ebitda" />
                      <Form.Control type="number" name="capex" placeholder="capex" />
                      <Form.Control type="number" name="cash" placeholder="cash" />
                      <Form.Control type="number" name="debt" placeholder="debt" />
                      <Form.Control type="number" name="shares" placeholder="shares" />
                    </Form.Group>
                    <Button variant="outline-info" type="submit">Submit</Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        <Footer />
      </>
    )  
  }
}

export default App;
