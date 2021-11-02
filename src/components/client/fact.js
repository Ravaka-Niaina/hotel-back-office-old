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
            <div class="row" style={{textAlign:'center'}}>
                <h1>Your Stay</h1>
                <div class="row mb-4">
                    <div class="col">
                        <strong> Check in :  </strong>
                       
                    </div>
                    
                    <div class="col" id="locA">
                        <strong>Check out :</strong>
                           
                    </div>
                    {reservation}
                </div>
                <p>TOTAL :</p>  
                
                <input type="submit" className="btn btn-primary" value="APPLY"  />  
            </div>
        );
    }
}

export default Fact