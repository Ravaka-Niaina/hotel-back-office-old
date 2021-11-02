// import CustomError from '../CustomError';
import CustomError from '../CustomError';
import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom';
import  Sidebar  from "../Sidebar/Sidebar";
import  Navbar  from "../Navbar/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';

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
                <td>{tarif.nom}</td>
                <td>{tarif.prixParJour}</td>
                <td>{tarif.services}</td>
                <td>{tarif.conditionsAnnulation}</td>
                <td><Link to={"/tarif/details/" + tarif._id + "/" + this.state.typeChambre._id} 
                className="btn"
    style={{textDecoration:'none',backgroundColor:'	#00ff80'}}>
            Modifier</Link>
            </td>
            </tr>
        });
        return(
            <div> 
                <Navbar/>
                <Sidebar/>
            <div className="container" style={{marginLeft:'340px',marginTop:'80px'}}>
                <div className="jumbotron1" 
                style={{backgroundColor:'white',boxShadow: '0 0 20px 0 rgba(0,0,0,0.2),0 5px 5px 0 rgba(0,0,0,0.25)'}}>
                    <h1 className="text-center" id='title1'>Détails type chambre</h1>
                    <hr></hr>
                    <CustomError errors={this.state.errors} />
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
                            <button className="btn mt-4" 
                            style={{backgroundColor:'#FF7F50'}} onClick={(e) => this.update(e)}>
                                Modifier
                            </button>
                            <Link to={'/tarif/insert/' + this.props.match.params._id 
                                + '/' + this.state.typeChambre.nom}>
                                <button className="btn mt-4 mx-2" 
                            style={{width:'200px',textDecoration:'none',backgroundColor:'#7FFFD4'}}>Ajouter tarifs</button>
                            </Link>
                            <Link to='/typeChambre'>
                                <button className="btn mt-4" 
                            style={{backgroundColor:'#293846',color:'white'}}>Retour</button>
                            </Link>
                        </div>
                    </form>
                    <h2 className="mt-4">Liste tarifs</h2>
                <table className="table mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nom</th>
                            <th>Prix par jour</th>
                            <th>Services</th>
                            <th>Conditions d'annulation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        );
    }
}

export default DetailsTypeCHambre;