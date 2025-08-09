import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrderPage';
import MostOrderPage from './pages/MostOrderPage';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      
          <Routes>
          
         <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/mostorder" element={<MostOrderPage />} />
          
        </Routes>
      
    </Router>
  );
}

export default App;

