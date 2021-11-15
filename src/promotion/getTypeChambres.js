import React from 'react';

import axios from 'axios';

export default class GetTypeChambre extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        typeChambres: [],
    }
  }
 
  componentDidMount() {
    axios.get('http://localhost:3000/typechambre')
      .then(res => {
        const typeChambres ={typeChambres: res.data.list} ;
        
        this.setState( typeChambres );
        console.log(this.state);
      })
  }

  render() {
    return (
      <div>  
        <h1>TYPE CHAMBRE LIST</h1>  
    
        <table className="table table-bordered">  
            <thead>  
              <tr>  
                  <th>Nom</th>    
              </tr>  
            </thead>  
    
            <tbody>  
              {this.state.typeChambres.map((typeChambre) => (  
                <tr>  
                  <td>{typeChambre.nom}</td>  
                </tr>  
              ))}  
            </tbody>  
    
        </table>  
      </div>
    )
  }
}

