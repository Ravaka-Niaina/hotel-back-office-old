import './front_client.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function front_client() {
    return (
        <>
<nav class="navbar navbar-expand-lg navbar-light bg-white" id='nav'>
<img src="/hotel.png" 
class="img-fluid" 
alt="Responsive image"
style={{width:'150px'}}
/>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link " href="#" id='nav-item'>
        INFO ETABLISSEMENT
      </a>
      <a class="nav-item nav-link" href="#" id='nav-item'>
        RECHERCHER UNE RESERVATION
      </a>
      <a class="nav-item nav-link" href="#" id='nav-item'>
        <LocalPhoneIcon/>261-20-2220202
      </a>
      <a class="nav-item nav-link" href="#" id='nav-item'>
        <MailOutlineIcon/>Hotel@gmail.com
      </a>
    </div>
  </div>
</nav>
<div>
<img src="/hotelImage.jpg" 
class="img-fluid" 
alt="Responsive image"
style={{width:'100%',height:'500px'}}
/>
</div>

<div className="text-center" id='info'>
<p></p>
<p id='title1'>STATIONS DE L'ILE MAURICE</p>
<p id='title2'>À propos de Heritage Resorts</p>
<p id='texte1'>
Chez Heritage Resorts , vivez bien plus que des vacances, 
découvrez la quintessence de l'exclusif Domaine de Bel Ombre. 
La richesse naturelle du paysage, l'histoire du lieu et la richesse de sa culture
permettent à nos hôtes de vivre de multiples expériences tout en profitant du
 raffinement et du confort des établissements haut de gamme.
</p>
<p id='texte2'>
Les hôtes vivent pleinement chaque seconde de leur séjour, 
pour prendre le temps d'apprécier les plaisirs subtils de l' île Maurice , 
pour s'imprégner de chacun de ces instants précieux... afin qu'à leur tour, 
ils puissent enrichir, raconter et diffuser l'histoire du Domaine. de Bel Ombre.
</p>
 </div>
        </>
        );
    }
  
  export default front_client;