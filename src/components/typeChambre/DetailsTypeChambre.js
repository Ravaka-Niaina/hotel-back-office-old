import CustomError from '../CustomError';
import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom';

class DetailsTypeCHambre extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            typeChambre: {
                _id: '',
                nom: '',
                equipements: '',
                nbAdulte: '',
                nbEnfant: '',
                photo: ''
            }
            
        }
    }

    setDetailsTypeChambre(data){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState = data;
        this.setState(currentState);
    }

    tryRedirect(res){
        console.log(res);
        if(res.status === 200){
          this.props.history.push('/typeChambre');
        }else if(res.status === 401){//Unauthorized
            this.props.history.push('/');
        }else{
          let currentState = JSON.parse(JSON.stringify(this.state));
          currentState.errors = res.errors;
          this.setState(currentState);
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + 
                "/typeChambre/details/" + this.props.match.params._id,
            withCredentials: true
        })
        .then(res => this.setDetailsTypeChambre(res.data))
        .catch(err => console.log(err));
    }

    update(e){
        e.preventDefault();
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/typeChambre/update",
            withCredentials: true,
            data: this.state.typeChambre
        })
        .then(res => this.tryRedirect(res.data))
        .catch(err => console.log(err));
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState.typeChambre[inputName] = event.target.value;
        this.setState(currentState);
    }
    handlePhotoChange(event){
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState.photo = event.target.files[0];
        this.setState(currentState);
    }

    render(){
        return(
            <div>
                <h1>Détails type chambre</h1>
                <CustomError errors={this.state.errors} />
                <form>
                    <div>
                        <label>Nom: </label>
                        <input type="text" value={this.state.typeChambre.nom}
                            onChange={(e) => this.handleInputChange(e, "nom")}/>
                    </div>
                    <div>
                        <label>Equipements: </label>
                        <textarea value={this.state.typeChambre.equipements}
                            onChange={(e) => this.handleInputChange(e, "equipements")}></textarea>
                    </div>
                    <div>
                        <div>
                            <label>Capacité: </label>
                        </div>
                        <label>Adulte: </label>
                        <input type="number" value={this.state.typeChambre.nbAdulte}
                            onChange={(e) => this.handleInputChange(e, "nbAdulte")}/>
                        <label>Enfant: </label>
                        <input type="number" value={this.state.typeChambre.nbEnfant}
                            onChange={(e) => this.handleInputChange(e, "nbEnfant")}/>
                    </div>
                    <div>
                        <label>Photo: </label>
                        <input type="file"
                            onChange={(e) => this.handleInputChange(e, "photo")}/>
                    </div>
                    <div>
                        <Link to='/typeChambre'>
                            <button>Retour</button>
                        </Link>
                        <button onClick={(e) => this.update(e)}>
                            Modifier
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default DetailsTypeCHambre;