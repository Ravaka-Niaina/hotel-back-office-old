import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom';

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
                <td><Link to={'/typeChambre/details/' + typeChambre._id}><button>Voir détails</button></Link></td>
            </tr>
        });
        return(
            <div style={{marginTop :'12%'}}>
                <table>
                    <thead>
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
        );
    }
}

export default ListTypeChambre;