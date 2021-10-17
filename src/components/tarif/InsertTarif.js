import CustomError from '../CustomError';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';

class InsertTarif extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            tarif: {
                _id: '',
                idTypeChambre: '',
                prixParJour: '',
                services: [], 
                conditionsAnnulation: ''
            }
        };
    }

    componentDidMount(){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.tarif.idTypeChambre = 
            this.props.match.params.idTypeChambre;
        this.setState(currentState);
    }

    tryRedirect(res){
        console.log('resultat recu');
        console.log(res);
        if(res.status === 200){
            this.props.history.push('/typeChambre/details/' 
                + this.props.match.params.idTypeChambre);
        }else if(res.status === 401){//Unauthorized
            this.props.history.push('/');
        }else{
            let currentState = JSON.parse(JSON.stringify(this.state));
            currentState.errors = res.errors;
            this.setState(currentState);
        }
    }

    insert(e){
        e.preventDefault();
        console.log('Insertion en cours');
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/tarif/insert",
            withCredentials: true,
            data: this.state.tarif
        })
        .then(res => this.tryRedirect(res.data))
        .catch(err => console.log(err));
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.tarif[inputName] = event.target.value;
        this.setState(currentState);
    }

    render(){
        return(
            <div>
                <h1>Créer tarif</h1>
                <CustomError errors={this.state.errors}/>
                <form>
                    <p>Type chambre: {this.props.match.params.nomTypeChambre}</p>
                    <div>
                        <label>Prix journier: </label>
                        <input 
                            type="number" 
                            value={this.state.tarif.prixParJour}
                            onChange={(e) => this.handleInputChange(e, "prixParJour")}/>
                    </div>
                    <div>
                        <label>Services: </label>
                        <textarea 
                            value={this.state.tarif.services}
                            onChange={(e) => this.handleInputChange(e, "services")}></textarea>
                    </div>
                    <div>
                        <label>Conditions d'annulation: </label>
                        <textarea 
                            value={this.state.tarif.conditionsAnnulation}
                            onChange={(e) => this.handleInputChange(e, "conditionsAnnulation")}></textarea>
                    </div>
                    <Link to={'/typeChambre/details/' + this.props.match.params.idTypeChambre}>
                        <button>Retour</button>
                    </Link>
                    <div>
                        <button onClick={(e) => this.insert(e)}>Créer</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default InsertTarif;