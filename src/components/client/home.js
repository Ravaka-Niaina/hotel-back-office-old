import React  from "react";
import {Link} from 'react-router-dom'
class Home extends React.Component{
    render(){
        return(
            
        <nav class="navbar navbar-light fixed-top " style={{background:'#2f4050'}}> 
                <div class="container-fluid">
                    <Link to="/home">
                        <h2 class="navbar-brand display-6" 
                            style={{marginLeft: '45%' , color :'white'}} >Home
                        </h2>
                    </Link>
                    <Link to="/list">
                        <h2  class="navbar-brand display-6" style={{ color :'white'}}>List</h2>
                    </Link>
                    <Link to="/list">
                        <h2  class="navbar-brand display-6" style={{ color :'white'}}>signin</h2>
                    </Link>
                </div>

           </nav> 


        );
    }
}

export default Home