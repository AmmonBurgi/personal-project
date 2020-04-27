import React from 'react';
import routes from './routes'
import Header from './Components/Header/Header'
import {withRouter} from 'react-router-dom'
// import {ToastContainer} from 'react-toastify'
import './App.css';

function App(props) {
  return (
    <div className="App">
     {props.location.pathname === '/' ?
     (<>
     {routes}
     </>) :
     (<>
     <Header />
     {routes}
     </>)}
     {/* <ToastContainer /> */}
    </div>
    
  );
}
export default withRouter(App);
