// import CustomError from '../CustomError';
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
            , tarifs: []
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

    setTarifs(res){
        console.log(res);
        if(res.status === 200){
            let currentState = JSON.parse(JSON.stringify(this.state));
            currentState.tarifs = res.list;
            this.setState(currentState);
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + 
                "/typeChambre/details/" + this.props.match.params._id + '?id',
            withCredentials: true
        })
        .then(res => this.setDetailsTypeChambre(res.data))
        .catch(err => console.log(err));

        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + 
                "/tarif?idTypeChambre=" + this.props.match.params._id,
            withCredentials: true
        })
        .then(res => this.setTarifs(res.data))
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
        let list = null;
        list = this.state.tarifs.map(tarif => {
            return <tr>
                <td>{tarif.prixParJour}</td>
                <td>{tarif.services}</td>
                <td>{tarif.conditionsAnnulation}</td>
            </tr>
        });
        return(
<div className="container" style={{marginLeft:'450px',marginTop:'-770px'}}>
<div className="jumbotron" 
style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)'}}>
<h1 className="text-center" id='title1'>Détails type chambre</h1>
<hr></hr>
{/* <CustomError errors={this.state.errors} /> */}
<form className="needs-validation">
<div>
                        <label className="form-label mt-2">Nom: </label>
                        <input className="form-control" type="text" value={this.state.typeChambre.nom}
                            onChange={(e) => this.handleInputChange(e, "nom")}/>
                    </div>
                    <div>
                        <label className="form-label mt-2">Equipements: </label>
                        <textarea className="form-control" value={this.state.typeChambre.equipements}
                            onChange={(e) => this.handleInputChange(e, "equipements")}></textarea>
                    </div>
                    <div>
                        <div>
                            <label className="form-label mt-4" style={{textDecoration:'underline'}}>Capacité: </label>
                        </div>
                        <label className="form-label mt-2">Adulte: </label>
                        <input className="form-control" type="number" value={this.state.typeChambre.nbAdulte}
                            onChange={(e) => this.handleInputChange(e, "nbAdulte")}/>
                        <label className="form-label mt-2">Enfant: </label>
                        <input className="form-control" type="number" value={this.state.typeChambre.nbEnfant}
                            onChange={(e) => this.handleInputChange(e, "nbEnfant")}/>
                    </div>
                    <div>
                        <label className="form-label mt-2">Photo: </label>
                        <input className="form-control" type="file"
                            onChange={(e) => this.handleInputChange(e, "photo")}/>
                    </div>
                    <div>
                        <Link to='/typeChambre'>
                            <button className="btn mt-4" 
                         style={{backgroundColor:'#293846'}}>Retour</button>
                        </Link>
                        <Link to={'/tarif/insert/' + this.props.match.params._id 
                            + '/' + this.state.typeChambre.nom}>
                            <button className="btn mt-4 mx-2" 
                         style={{width:'200px'}}>Ajouter tarifs</button>
                        </Link>
                        <button className="btn mt-4" 
                         style={{backgroundColor:'#FF7F50'}} onClick={(e) => this.update(e)}>
                            Modifier
                        </button>
                    </div>
                </form>

</div>
</div>
        );
    }
}

export default DetailsTypeCHambre;