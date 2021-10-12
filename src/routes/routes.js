import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import {Search} from '../pages/Search'
import {Item} from '../pages/Item'
import {SearchBar} from '../components/SearchBar'


export const Routes = () => {
   return(
       <BrowserRouter>
           <Route component={ SearchBar }  path="/" exact />
           <Route component={ Search }  path="/items" />
           <Route component={ Item }  path="/item" />
       </BrowserRouter>
   )
}

