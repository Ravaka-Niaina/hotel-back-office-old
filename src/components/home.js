import React from 'react';
import {Link} from 'react-router-dom';
const axios = require('axios').default;

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            menu: []
        };
    }

    logout(e){
        e.preventDefault();
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + "/user/logout",
            withCredentials: true
        })
        .then(res => this.props.history.push('/'));

        console.log(document.cookie);
    }

    setMenu(res){
        console.log(res);
        if(res.status === 200){
            if(res.menu.length > 0){
                let currentState = JSON.parse(JSON.stringify(this.state));
                currentState.menu = res.menu;
                this.setState(currentState);
            }
        }
        
    }

    componentDidMount(){
        /*
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + "/user/list",
            withCredentials: true
        })
        .then(res => console.log(res));
        */
        
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + "/menu",
            withCredentials: true
        })
        .then(res => this.setMenu(res.data));
    }

    render(){
        let menu = null;
        if(this.state.menu.length > 0){
            menu = this.state.menu.map(m => {
                return( <li><Link to={m.link}>{m.name}</Link></li> );
            });
        }
        return(
            <div>
                <ul>{menu}</ul>
                <button type="button" className="btn" onClick={(e) => this.logout(e)}>Logout</button>
            </div>
        );
        
    }
}

export default Home;