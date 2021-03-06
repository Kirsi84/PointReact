import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Views/Home'
import About from './Views/About'
import Contact from './Views/Contact'
import Message from './Views/Message'
import Product from './Views/Product'
import Error from './Views/Error'

function App() {
  return (
    <div className="relative pb-10 min-h-screen">
      <Router>
        
        <Header />

        <div className="p-3">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>
                  
          <Route path="/message">
            <Message />
          </Route>

          <Route path="/products/:id">
            <Product />
          </Route>

          <Route path="/error">
            <Error />
          </Route>

        </Switch>
        </div>

        <Footer />

      </Router>
    </div>
  );
}

export default App;
