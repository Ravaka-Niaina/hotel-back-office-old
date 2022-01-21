import Rechercher from '../../common/List/Recherche.js';
import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';
import Login from '../../common/Authentification/Login.js';

const btnInsert = {urlRedirect: "/back/register", label: "Ajouter partenaire"};
const urlSearch = "/user/list";
const method = "post";
const tableName = "partenaire";
const fieldsToSearch = [
    {name: "nom", type: "String"},
    {name: "prenom", type: "String"},
    {name: "email", type: "String"},
    {name: "dateInscription", type: "DateTime"},
    {name: "companie", type: "String"},
    {name: "droitAcces", type: "Array"}
];
const fieldsToPrint = [
    {field: "_id", label: null},
    {field: "nom", label: "Nom", type: "String"},
    {field: "prenom", label: "Prénoms", type: "String"},
    {field: "email", label: "Email", type: "String"},
    {field: "dateInscription", label: "Date d'inscription", type: "DateTime"},
    {field: "companie", label: "Companie", type: "String"},
    {field: "droitAcces", label: "Droit d'accès", type: "Array"}
];
const nbContent = 5;
const urlEdit = "/back/user/details/";
const rowsPerPageOptions = [5, 10, 20];
const accessRightToDelete = ["superAdmin", "deletePartenaire"];
const accessRightToViewDetails = ["superAdmin", "getUser"];

const ListeUser = () => {
    const hasAR = session.getInstance().hasOneOfTheseAccessRights(["getPartenaire", "superAdmin"]);
    if(!session.getInstance().isConnected()){
        return(<Login urlRedirect={window.location.href} />);
    }else if(!hasAR){
        return(<NotEnoughAccessRight />);
    }
    return(
        <Rechercher 
            currentPage={8}
            method={method}
            btnInsert={btnInsert}
            urlSearch={urlSearch}
            tableName={tableName}
            fieldsToSearch={fieldsToSearch}
            fieldsToPrint={fieldsToPrint}
            urlEdit={urlEdit}
            nbContent={nbContent}
            rowsPerPageOptions={rowsPerPageOptions}
            accessRightToDelete={accessRightToDelete}
            accessRightToViewDetails={accessRightToViewDetails}
        />
    );
}

export default ListeUser;