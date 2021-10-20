import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class Fact extends React.Component{
    render(){

        let reservation = this.props.reservation.map(reserve => {
            return (
                <p> {reserve.idTarif}</p>
                );
            }
        )
        return(
            <div class="row" style={{textAlign:'center'}}>
                <h1>Your Stay</h1>
                <div class="row mb-4">
                    <div class="col">
                        <strong> Check in :  </strong>
                       {reservation}
                        </div>
                    
                    <div class="col" id="locA">
                        <strong>Check out :</strong>
                           
                    </div>
                </div>
                <p>TOTAL :</p>    
            </div>
        );
    }
}

export default Fact