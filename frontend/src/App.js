import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Product from './components/product/Product.js';
// import Warehouse from './components/Warehouse/Warehouse';
import Order from './components/order/Order';
import Shipping from './components/shipping/Shipping';
import Weather from './components/weather/Weather.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Weather} />
        <Route path="/product" component={Product} />
       {/* <Route path="/warehouse" component={Warehouse} /> */}
        <Route path="/order" component={Order} />
        <Route path="/shipping" component={Shipping} />
      </Switch>
    </Router>
  );
}

export default App;