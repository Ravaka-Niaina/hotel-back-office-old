import Rechercher from '../../common/List/Recherche.js';
import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';
import Login from '../../common/Authentification/Login.js';

const btnInsert = {urlRedirect: "/back/accessRight/insert", label: "Ajout droit d'accés"};
const urlSearch = "/droitAcces/list";
const method = "get";
const tableName = "droitAcces";
const fieldsToSearch = [
    {name: "_id", type: "String"},
    {name: "nom", type: "String"}
];
const fieldsToPrint = [
    {field: "_id", label: "Id", forcePrint: true},
    {field: "nom", label: "Nom"}
];
const nbContent = 5;
const urlEdit = "/back";
const rowsPerPageOptions = [5, 10, 20];
const accessRightToViewInsert = ["superAdmin", "insertDroitAcces"];
const accessRightToDelete = ["superAdmin", "deleteDroitAcces"];
const accessRightToViewDetails = ["superAdmin", "getDroitAcces", "updateDroitAcces"];

const ListeDroitAcces = () => {
    const hasAR = session.getInstance().hasOneOfTheseAccessRights(["insertDroitAcces", "superAdmin"]);
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
            accessRightToViewInsert={accessRightToViewInsert}
            accessRightToDelete={accessRightToDelete}
            accessRightToViewDetails={accessRightToViewDetails}
        />
    );
}
export default ListeDroitAcces;