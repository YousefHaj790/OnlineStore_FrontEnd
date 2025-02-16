import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Components/redux/store'; 
import HeaderNavigator from './Components/Layout/HeaderNavigator';
import Main from './Components/Main_pages/Main';
import Footer from './Components/Layout/Footer';
import About from './Components/Main_pages/About';
import ContactUs from './Components/Main_pages/ContactUs';
import Products from './Components/Main_pages/Products';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Categories from './Components/Main_pages/Categories';
import BuyProduct from './Components/Tasks/BuyProduct';
import AdminP from './Components/Drop_Down/AdminP';
import ShopingCart from './Components/Drop_Down/ShopingCart';
import Favorites from './Components/Drop_Down/Favorites';
import './App.css';




function App() {
  return (
    <Provider store={store}>
      <div style={{ position: 'relative' }} className="App">
        <Router>
          <HeaderNavigator />
          <main>
            <Routes>
              <Route path="/" element={<Login />}>
                <Route path="Register" element={<Register />} />
              </Route>
              <Route path="/main" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactUs/:userId" element={<ContactUs />} />
              <Route path="/adminP/:userId" element={<AdminP />} />
              <Route path="/adminP/:userId/:Category" element={<AdminP />} />
              <Route path="/adminP/:userId/:Category/:ProductId" element={<AdminP />} />
              <Route path=":userId/ShopingCart" element={<ShopingCart />} />
              <Route path=":userId/Favorites" element={<Favorites />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Products/:Category" element={<Categories />}>
                <Route path=":ProductId" element={<BuyProduct />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
