import React from 'react';
import Scroll from './scroll'
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Detail from './detail';
import Home from './home'


function FrontApp(){
    return(
        <div className="login-wrapper">
            <Router>
                <Home/>
                <Route path="/detail" exact component={Detail} />
                <Route path="/list" exact component={Scroll} />
                <Route path="/home" exact component={Home} />   
            </Router>
        </div>
    );
}
export default FrontApp
