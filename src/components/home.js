import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: 200,
            message: '',
            users: []
        };
    }

    setUsers(res){
        console.log(res);
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState = res;
        this.setState(currentState);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_BACK_URL + "/user/list")
            .then(res => res.json())
            .then(res => this.setUsers(res))
            .catch(err => {
                let currentState = JSON.parse(JSON.stringify(this.state));
                currentState.status = 300;
                currentState.message = 'Un problème est survenu lors de la connexion au serveur';
                this.setState(currentState);
            });
            
    }

    render(){
        let users = null;
        let title = "Liste utilisateurs";
        if(this.state.users.length > 0){
            users = this.state.users.map(user => {
                return <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                </tr>
            });
        }
        if(this.state.users.length === 0){
            return(
                <div>
                    <h1>{ title }</h1>
                    <p><strong>{ this.state.message }</strong></p>
                </div>
            );
        }else{
            return(
                <div>
                    <h1>{ title }</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Mot de passe</th>
                            </tr>
                        </thead>
                        <tbody>
                            { users }
                        </tbody>
                    </table>
                </div>
            );
        }
        
    }
}

export default Home;