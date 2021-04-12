import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header';
import Home from './screens/home';
import ProductDetails from './screens/productDetails';
import Cart from './screens/cart'
import Login from './screens/login';
import Register from './screens/register';
import ForgotPassword from './screens/forgotPassword';
import Shipping from './screens/shipping';
import Payment from './screens/payment';
import PlaceOrder from './screens/placeOrder';
import Order from './screens/order';
import MyOrders from './screens/myOrders';
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/product/:id' component={ProductDetails} />
        <Route path='/cart/:id?' component={Cart} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/shipping' component={Shipping} />
        <Route path='/payment' component={Payment} />
        <Route path='/placeOrder' component={PlaceOrder} />
        <Route path='/order/:id' component={Order} />
        <Route path='/orders' component={MyOrders} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
