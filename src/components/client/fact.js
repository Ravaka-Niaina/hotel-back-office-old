import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class Fact extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let reservation = [];
        reservation = this.props.context.state.reservation.map(reserve => {
            return (
                <p> {reserve.nom} : {reserve.nombre}</p>
                );
            }
        )
        return(
            <div classname="row" style={{textAlign:'center'}}>
                <h1>Your Stay</h1>
                <div className="row mb-4">
                    <div className="col">
                        <strong> Check in :  </strong>
                        </div>
                    
                    <div className="col" id="locA">
                        <strong>Check out :</strong>
                           
                    </div>
                </div>
                {reservation}
                <p>TOTAL :</p>    
            </div>
        );
    }
}

export default Fact