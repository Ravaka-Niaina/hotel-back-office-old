import Rechercher from '../../common/List/Recherche.js';
import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';
import Login from '../../common/Authentification/Login.js';

const urlSearch = "/reservation/list";
const method = "post";
const tableName = "reservation";
const fieldsToSearch = [
    {name: "NumeroITineraire", type: "String"},
    {name: "numeroConfirmation", type: "String"}
];
const fieldsToPrint = [
    {field: "reservateur", label: "Réservateur"},
    {field: "dateValidation", label: "Date de validation"},
    {field: "itineraires.dateSejour"}
];
const nbContent = 5;
const urlEdit = "/back/reservation/update/";
const rowsPerPageOptions = [5, 10, 20];
const accessRightToViewInsert = ["superAdmin"];
const accessRightToDelete = ["superAdmin", "deleteReservation"];
const accessRightToViewDetails = ["superAdmin", "getReservation", "updateReservation"];
const accessRightToViewList = ["superAdmin", "getListReservation"];

const ListeReservation = () => {
    const hasAR = session.getInstance().hasOneOfTheseAccessRights(["updateReservation", "deleteReservation", "getListReservation", "superAdmin"]);
    if(!session.getInstance().isConnected()){
        return(<Login urlRedirect={window.location.href} />);
    }else if(!hasAR){
        return(<NotEnoughAccessRight />);
    }

    return(
        <Rechercher 
            currentPage={9}
            method={method}
            urlSearch={urlSearch}
            tableName={tableName}
            fieldsToSearch={fieldsToSearch}
            fieldsToPrint={fieldsToPrint}
            urlEdit={urlEdit}
            nbContent={nbContent}
            rowsPerPageOptions={rowsPerPageOptions}
            accessRightToViewList={accessRightToViewList}
            accessRightToViewInsert={accessRightToViewInsert}
            accessRightToDelete={accessRightToDelete}
            accessRightToViewDetails={accessRightToViewDetails}
        />
    );
}
export default ListeReservation;