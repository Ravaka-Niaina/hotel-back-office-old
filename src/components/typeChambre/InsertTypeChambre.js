import CustomError from '../CustomError';
import axios from "axios";
import React from "react";
class InsertTypeCHambre extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            nom: '',
            equipements: '',
            nbAdulte: '',
            nbEnfant: '',
            photo: ''
        }
    }

    tryRedirect(res){
        console.log("status = " + res.status);
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

    insert(e){
        e.preventDefault();
        /*
        let formData = new FormData();
        formData.set('nom', this.state.nom);
        formData.set('equipements', this.state.equipements);
        formData.set('nbAdulte', this.state.nbAdulte);
        formData.set('nbEnfant', this.state.nbEnfant);
        formData.set('photo', this.state.photo);
        console.log(formData);
        */
       console.log(this.state);
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + "/typeChambre/insert",
            withCredentials: true,
            data: this.state
        })
        .then(res => {console.log(res); this.tryRedirect(res.data)})
        .catch(err => console.log(err));
    }

    handleInputChange(event, inputName){
        const currentState = JSON.parse(JSON.stringify(this.state));
        currentState[inputName] = event.target.value;
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
                <h1>Creer type chambre</h1>
                <CustomError errors={this.state.errors} />
                <form>
                    <div>
                        <label>Nom: </label>
                        <input type="text" value={this.state.nom}
                            onChange={(e) => this.handleInputChange(e, "nom")}/>
                    </div>
                    <div>
                        <label>Equipements: </label>
                        <textarea value={this.state.equipements}
                            onChange={(e) => this.handleInputChange(e, "equipements")}></textarea>
                    </div>
                    <div>
                        <div>
                            <label>Capacité: </label>
                        </div>
                        <label>Adulte: </label>
                        <input type="number" value={this.state.nbAdulte}
                            onChange={(e) => this.handleInputChange(e, "nbAdulte")}/>
                        <label>Enfant: </label>
                        <input type="number" value={this.state.nbEnfant}
                            onChange={(e) => this.handleInputChange(e, "nbEnfant")}/>
                    </div>
                    <div>
                        <label>Photo: </label>
                        <input type="file" value={this.state.photo}
                            onChange={(e) => this.handleInputChange(e, "photo")}/>
                    </div>
                    <div>
                        <button onClick={(e) => this.insert(e)}>
                            Céer
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default InsertTypeCHambre;