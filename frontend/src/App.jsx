import { useState } from 'react';
import { BrowserRouter as BRouter, Route, Routes } from 'react-router-dom';
import CategoryList from './components/categories/List';
import CategoryCreate from './components/categories/Create';
import CategoryEdit from './components/categories/Edit';
import "./custom.css";
function App() {
  return <>
    <BRouter>
      <Routes>
        <Route path='/categories' element={<CategoryList></CategoryList>} ></Route>
        <Route path='/categories/create' element={<CategoryCreate></CategoryCreate>} ></Route>
        <Route path='/categories/edit/:id' element={<CategoryEdit></CategoryEdit>} ></Route>
      </Routes>
    </BRouter>
  </>
}

export default App
