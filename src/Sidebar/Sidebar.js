import './Sidebar.css';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import RedeemIcon from '@mui/icons-material/Redeem';
import {Link} from 'react-router-dom';
// import {SidebarData} from './SidebarData';
class Sidebar extends React.Component {
    render (){
      return(
//       <div className="Sidebar">
// {SidebarData.map((val,key)=>{
// return(
//     <ul className='SidebarList'>
//     <li  
//     className="row"
//      key={key}
//      id={window.location.pathname == val.link ? 'active' : ""}
//      onClick={()=>{window.location.pathname = val.link}}>
// {""}
// <div id="icon">{val.icon}</div>{""}
// <div id="title">{val.title}</div>
//     </li>
//     </ul>
// )
// })}
//       </div>

  <div className="Sidebar">
    <ul className='SidebarList'>
      <Link to='/' style={{textDecoration:'none'}}>
        <li className="row">
{/* <div id="icon"></div> */}
            <div id="icon">{<HomeIcon/>}</div>
            <div id="title">Home</div>
        </li>
      </Link>

      <Link to='/TypeChambre/' style={{textDecoration:'none'}}>
        <li className="row">
{/* <div id="icon"></div> */}
            <div id="icon">{<BedroomParentIcon/>}</div>
              <div id="title" to='/typeChambre'>Chambre Type</div>
        </li>
      </Link>

    <Link to='/client' style={{textDecoration:'none'}}>
        <li className="row">
{/* <div id="icon"></div> */}
            <div id="icon"></div>
            <div id="title" to='/typeChambre'>Client</div>
        </li>
    </Link>

    <Link to='/paiement' style={{textDecoration:'none'}}>
        <li className="row">
{/* <div id="icon"></div> */}
            <div id="icon"></div>
            <div id="title" to='/typeChambre'>paiement</div>
        </li>
    </Link>
    <Link to='/test' style={{textDecoration:'none'}}>
        <li className="row">
{/* <div id="icon"></div> */}
            <div id="icon"></div>
            <div id="title" to='/typeChambre'>test</div>
        </li>
    </Link>
    </ul>
</div>
      );
    }
  }

  export default Sidebar;