import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Subscribe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        };
        this.setMessageRetour = this.setMessageRetour.bind(this);
    }

    setMessageRetour(res){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.message = res.msg;
        this.setState(currentState);
        console.log(currentState);
    }

    subscribe(e){
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch("http://localhost:3000/user", requestOptions)
            .then(res => res.json())
            .then(res => {this.setMessageRetour(res); console.log(res)});
    }

    handleNameChange(event){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.name = event.target.value;
        this.setState(currentState);
    }

    handleEmailChange(event){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.email = event.target.value;
        this.setState(currentState);
    }

    render(){
        return(
            <div>
                <h1>Inscription</h1>
                <h2>{this.state.message}</h2>
                <form>
                    <div>
                        <label>Nom: </label>
                        <input type="text"
                            value={this.state.name} 
                            onChange={(e) =>this.handleNameChange(e)} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email"
                            value={this.state.email} 
                            onChange={(e) => this.handleEmailChange(e)} />
                    </div>
                    <div>
                        <button 
                            onClick={(e) => this.subscribe(e)}>
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <Subscribe />,
    document.getElementById('root')
);