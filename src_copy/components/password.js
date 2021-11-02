import React from 'react';

class Password extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pwd: '',
            confirmPwd: '',
            status: 0,
            message: ''
        };
    }

    setMessageRetour(res){
        console.log(res);
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.status = res.status;
        currentState.message = res.message;
        this.setState(currentState);
        if(res.status == 200){
            this.props.history.push('/home');
        }
    }

    handlePwdChange(e){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.pwd = e.target.value;
        this.setState(currentState);
    }

    handleConfirmPwdChange(e){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.confirmPwd = e.target.value;
        this.setState(currentState);
    }

    addPwd(e){
        e.preventDefault();
        let {id} = this.props.match.params;
        let pwd = {id: id, pwd: this.state.pwd, confirmPwd: this.state.confirmPwd};
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(pwd)
        };
        fetch(process.env.REACT_APP_BACK_URL + "/user/password",requestOptions)
            .then(res =>res.json())
            .then(res => {this.setMessageRetour(res);});
    }

    render(){
        return(
            <div>
                <h1>Ajout mot de passe</h1>
                <p>{ this.state.message }</p>
                <form>
                    <div>
                        <label>Mot de passe: </label>
                        <input type="text"
                            value={this.state.pwd}
                            onChange={(e) => this.handlePwdChange(e)} />
                    </div>
                    <div>
                        <label>Confirmation mot de passe: </label>
                            <input type="text"
                                value={this.state.confirmPwd}
                                onChange={(e) => this.handleConfirmPwdChange(e)} />
                    </div>
                    <div>
                        <button onClick={(e) => this.addPwd(e)}>
                            Valider
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Password;