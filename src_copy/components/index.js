import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from 'react-router-dom';
import Subscribe from './subscribe';
import Password from './password';
import Home from './home';

const WebPages = () => {
    return(
        <Router>
            <Route exact path="/" component={Subscribe} />
            <Route path="/password/:id" component={Password} />
            <Route path="/home" component={Home} />
        </Router>
    );
};

export default WebPages;