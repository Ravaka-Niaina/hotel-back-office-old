import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom';
import  Sidebar  from "../Sidebar/Sidebar";
import  Navbar  from "../Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './typeChambre.css';
class ListTypeChambre extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: '',
            message: '',
            list: []
        };
    }

    setListTypeChambre(data){
        console.log(data);
        let currentState = JSON.parse(JSON.stringify(this.state));
        currentState = data;
        this.setState(currentState);
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: process.env.REACT_APP_BACK_URL + "/typeChambre",
            withCredentials: true
        })
        .then(res => this.setListTypeChambre(res.data))
        .catch(err => console.log(err));
    }

    render(){
        let list = null;
        list = this.state.list.map(typeChambre => {
            return <tr>
                <td>{typeChambre.nom}</td>
                <td><Link to={'/typeChambre/details/' + typeChambre._id}>
                    <button className="btn"
    style={{textDecoration:'none',backgroundColor:'	#7FFFD4'}}>
            Voir détails
            </button></Link></td>
            </tr>
        });
        return(
            <div>
            <Navbar/>
            <Sidebar/>
            <div className='container' style={{marginLeft:'410px',marginTop:'80px',width:'800px'}}>
                        <Link to={'/TypeChambre/insert'}>
                            <button className="btn" 
                         style={{width:'200px',backgroundColor:'#00BFFF',borderStyle:'none',padding:'2px',borderRadius:'3px'}}>
                             Ajouter Type chambre
                             </button>
                        </Link>
                <table className="table mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th>Type chambre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { list }
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}

export default ListTypeChambre;