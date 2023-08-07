import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import { Navigator, RouteType } from './components/navigators/Navigator';
import routesConfig from './config/routes.json'
import AddAnnouncement from './components/pages/AddAnnouncement';
import PricePage from './components/pages/PricePage';
import CategoriesPage from './components/pages/CategoriesPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Navigator routes={routesConfig.pages}/>}> 
                <Route index element = {<HomePage/>}/>
                <Route path='add/newAnnouncement' element = {<AddAnnouncement/>}/>
                <Route path='pricePage' element = {<PricePage/>}/>
                <Route path='categories' element={<CategoriesPage></CategoriesPage>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
