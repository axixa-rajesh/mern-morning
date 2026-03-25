import { useState } from 'react';
import { BrowserRouter as BRouter, Route, Routes } from 'react-router-dom';
import CategoryList from './components/categories/List';
import CategoryCreate from './components/categories/Create';
import CategoryEdit from './components/categories/Edit';
import ProductList from './components/products/List';
import ProductCreate from './components/products/Create';
import UserCreate from './components/users/Registration';
import ProductEdit from './components/products/Edit';
import "./custom.css";
import Login from './components/users/Login';
import checklogin from './libs/checklogin';
import Navbar from './Navbar';
import ValidRoute from './ValidRoute';
function App() {
  //localStorage.removeItem('token');
 
  return <>
    <BRouter>
      <Navbar></Navbar>
      <Routes>
      
        <Route path='/categories' element={<CategoryList></CategoryList>} ></Route>
        <Route path='/categories/create' element={<CategoryCreate></CategoryCreate>} ></Route>
        <Route path='/categories/edit/:id' element={<CategoryEdit></CategoryEdit>} ></Route>
        <Route element={<ValidRoute />}>
        <Route path='/products' element={<ProductList></ProductList>} ></Route>
        <Route path='/products/create' element={<ProductCreate></ProductCreate>} ></Route>
          <Route path='/products/edit/:id' element={<ProductEdit></ProductEdit>} ></Route>
        </Route>
        <Route path='/user/create' element={<UserCreate></UserCreate>} ></Route>
        <Route path='/user/login' element={<Login></Login>} ></Route>
      </Routes>
    </BRouter>
  </>
}

export default App
