import axios from "axios";
import React from 'react';

class InsertReservation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reservations: [
                {
                    idTarif: [1, 2, 3],
                    dateDebut: '2021-12-20',
                    dateFin: '2021-12-30'
                },
                {
                    idTarif: [5, 7],
                    dateDebut: '2022-01-01',
                    dateFin: '2022-01-10'
                },
                {
                    idTarif: [9, 10, 11],
                    dateDebut: '2022-02-05',
                    dateFin: '2021-12-10'
                }
            ]
        };
    }

    componentDidMount(){
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACK_URL + 
                "/reservation/insert",
            withCredentials: true,
            data: this.state
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <p>Des reservations sont en cours de création.</p>
            </div>
        );
    }
}

export default InsertReservation;