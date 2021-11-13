import CustomError from '../CustomError';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';

class DetailsTarif extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            tarif: {
                _id: '',
                nom: '',
                idTypeChambre: '',
                prixParJour: '',
                services: [], 
                conditionsAnnulation: ''
            }
        };
    }

    setTarif(data){
        console.log(data);
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.errors = data.errors;
        if(data.tarif != null){
            currentState.tarif = data.tarif;
        }
        this.setState(currentState);
    }

    componentDidMount(){
        console.log(this.props.match.params._id);
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + 
                "/tarif/details/" + this.props.match.params._id,
            withCredentials: true
        })
        .then(res => this.setTarif(res.data))
        .catch(err => console.log(err));
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

    modifier(e){
        e.preventDefault();
        console.log('Insertion en cours');
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/tarif/update",
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
                <h1>Détails tarif</h1>
                <CustomError errors={this.state.errors}/>
                <form>
                    <p>Type chambre: {this.props.match.params.nomTypeChambre}</p>
                    <div>
                        <label>Nom: </label>
                        <input 
                            type="text" 
                            value={this.state.tarif.nom}
                            onChange={(e) => this.handleInputChange(e, "nom")}/>
                    </div>
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
                        <button onClick={(e) => this.modifier(e)}>Modifier</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default DetailsTarif;