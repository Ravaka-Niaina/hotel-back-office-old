import React from 'react';

import axios from 'axios';

export default class GetTypeChambre extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        tarifs: [],
    }
  }
 
  componentDidMount() {
    axios.get(process.env.REACT_APP_BACK_URL + '/planTarifaire')
      .then(res => {
        const tarifs ={tarifs: res.data.list} ;
        
        this.setState( tarifs );
        console.log(this.state);
      })
  }

  render() {
    return (
      <div>  
        <h1>TARIFS LIST</h1>  
    
        <table className="table table-bordered">  
            <thead>  
              <tr>  
                  <th>Nom</th>    
              </tr>  
            </thead>  
    
            <tbody>  
              {this.state.tarifs.map((tarif) => (  
                <tr>  
                  <td>{tarif.nom}</td>  
                </tr>  
              ))}  
            </tbody>  
    
        </table>  
      </div>
    )
  }
}

