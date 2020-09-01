import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sweet from 'sweetalert';
import Navigation from './components/Navigation'
import NotesList from './components/ProductList'
import CreateProduct from './components/CreateProduct'
import Home from './components/Home';


import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-10">
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={NotesList} />
        <Route path="/edit/:id" component={CreateProduct} />
        <Route path="/create" component={CreateProduct} />
     
        </div>
      
    </Router>
  );
}

export default App;
