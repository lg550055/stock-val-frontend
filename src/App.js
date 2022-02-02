import axios from 'axios';
import './App.css';
import Header from './Header';
import Footer from './Footer';


function App() {

  let url = 'https://stock-val.herokuapp.com/stocks';
  axios.get(url)
    .then((stockData) => stockData.data[0].ticker)

    let ticker = 'BABA';
    let purl = 'https://stock-val.herokuapp.com/price?ticker='+ticker;
  axios.get(purl)
    .then((pData) => console.log(pData.data))


  return (
    <>
      <Header />
      <p>Hello World!</p>
      <Footer />
    </>
  );
}

export default App;
