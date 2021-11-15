import React, { ChangeEvent, useState } from "react"
import { useTranslation } from 'react-i18next';
import { Language } from '../enums/Language';
import './front_client.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StarIcon from '@mui/icons-material/Star';
import { Link } from "react-router-dom";
 
const Front_client = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState<Language>(i18n.language as Language);
 
    let changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
        let language = event.target.value;
 
        switch (language) {
            case Language.EN:
                setLang(Language.EN);
                i18n.changeLanguage(Language.EN);
                break;
            case Language.FR:
            default:
                setLang(Language.FR);
                i18n.changeLanguage(Language.FR);
                break;
        }
    }
    const { t } = useTranslation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white" id='nav'>
<img src="/hotel.png" 
className="img-fluid" 
alt="Responsive image"
style={{width:'150px'}}
/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link " href="#" id='nav-item'>
      {t('common.link1')}
      </a>

      <Link to={'/booking'} style={{textDecoration:'none'}}>
      <a className="nav-item nav-link" href="#" id='nav-item'>
      {t('common.link2')}
      </a>
    </Link>

      <a className="nav-item nav-link" href="#" id='nav-item'>
        <LocalPhoneIcon/>261-20-2220202
      </a>
      <a className="nav-item nav-link" href="#" id='nav-item'>
        <MailOutlineIcon/>Hotel@gmail.com
      </a>
      <a className="nav-item nav-link" href="#" id='nav-item'>
      <select value={lang} name="language" onChange={changeLanguage}>
                    <option value={Language.FR}>FR</option>
                    <option value={Language.EN}>EN</option>
      </select>
      </a>
    </div>
  </div>
</nav>
<div>
<img src="/hotelImage.jpg" 
className="img-fluid" 
alt="Responsive image"
style={{width:'100%',height:'500px'}}
/>
</div>

<div className="" id='info'>
<div className="text-center" id=''>
<p id='title1'>{t('common.title1')}</p>
<p id='title2'>{t('common.title2')}</p>
<p id='texte1'>
{t('common.texte1')}
</p>
<p id='texte2'>
{t('common.texte2')}
</p>
</div>

<div className="text-center" id='hotel'>
<p></p>
<p id='title1'>{t('common.title3')}</p>
<p id='title2'>{t('common.title4')}</p>

 </div>
 <div className="hotel1" id='hotels'>
<img src="/hotelImage.jpg" 
className="img-fluid" 
alt="Responsive image"
style={{width:'300px',height:'250px'}}
/>
<p></p>
<div className="" id='desc'>
<div className="" id='centrer'>
<StarIcon id='star'/><StarIcon id='star'/><StarIcon  id='star'/><StarIcon id='star'/><StarIcon id='star'/>
<p id='text3'>HERITAGE AWALI</p>
<p id='text4'>LUXE DÉCONTRACTÉ ET TOUT-INCLUS <br/> A L ILE MAURICE</p>
<p id='text5'>à partir de</p>
<p id='price'>438 €</p>
<p id='text5'>par nuit / 2 adultes</p>
</div >
</div>
</div>
<div className="hotel2" id='hotels'>
<img src="/hotelImage.jpg" 
className="img-fluid" 
alt="Responsive image"
style={{width:'300px',height:'250px'}}
/>
<p></p>
<div className="" id='desc'>
<div className="" id='centrer'>
<StarIcon id='star'/><StarIcon id='star'/><StarIcon  id='star'/><StarIcon id='star'/><StarIcon id='star'/>
<p id='text3'>HERITAGE AWALI</p>
<p id='text4'>LUXE DÉCONTRACTÉ ET TOUT-INCLUS <br/> A L ILE MAURICE</p>
<p id='text5'>à partir de</p>
<p id='price'>438 €</p>
<p id='text5'>par nuit / 2 adultes</p>
</div >
</div>
</div>
<div className="hotel3" id='hotels'>
<img src="/hotelImage.jpg" 
className="img-fluid" 
alt="Responsive image"
style={{width:'300px',height:'250px'}}
/>
<p></p>
<div className="" id='desc'>
<div className="" id='centrer'>
<StarIcon id='star'/><StarIcon id='star'/><StarIcon  id='star'/><StarIcon id='star'/><StarIcon id='star'/>
<p id='text3'>HERITAGE AWALI</p>
<p id='text4'>LUXE DÉCONTRACTÉ ET TOUT-INCLUS <br/> A L ILE MAURICE</p>
<p id='text5'>à partir de</p>
<p id='price'>438 €</p>
<p id='text5'>par nuit / 2 adultes</p>
</div >
</div>
</div>
 </div>

        </div>
    )
}
 
export default Front_client;