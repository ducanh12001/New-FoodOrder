import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/HomePage/Cart';
import Detail from './pages/HomePage/Detail';
import Final from './pages/HomePage/Final';
import Home from './pages/HomePage/Home';
import Payment from './pages/HomePage/Payment';
import Product2 from './pages/HomePage/Product2';
import SharedLayout from './pages/HomePage/SharedLayout';
import Manage from './pages/Manage/Manage';
import LoginScreen from './pages/User/LoginScreen';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path=":typeId" element={<Product2 />} />
          <Route path=":typeId/:dishId" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/pay" element={<Payment />} />
          <Route path="/final" element={<Final />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="manage" element={<Manage />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
