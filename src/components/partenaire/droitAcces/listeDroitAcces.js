import Rechercher from '../../common/List/Recherche.js';
import {session} from '../../common/utilitySession.js';
import NotEnoughAccessRight from '../../common/NotEnoughAccessRight';
import Login from '../../common/Authentification/Login.js';

const btnInsert = {urlRedirect: "/back/accessRight/insert", label: "Ajout droit d'accés"};
const urlSearch = "/droitAcces/list";
const method = "post";
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
const urlEdit = "/back/accessRight/update/";
const rowsPerPageOptions = [5, 10, 20];
const accessRightToViewInsert = ["superAdmin"];
const accessRightToDelete = ["superAdmin", "deleteDroitAcces"];
const accessRightToViewDetails = ["superAdmin", "getDroitAcces", "updateDroitAcces"];
const accessRightToViewList = ["superAdmin", "getListDroitAcces"];

const ListeDroitAcces = () => {
    const hasAR = session.getInstance().hasOneOfTheseAccessRights(["insertDroitAcces", "updateDroitAcces", "deleteDroitAcces", "getListDroitAcces", "superAdmin"]);
    if(!session.getInstance().isConnected()){
        return(<Login urlRedirect={window.location.href} />);
    }else if(!hasAR){
        return(<NotEnoughAccessRight />);
    }

    return(
        <Rechercher 
            currentPage={9}
            method={method}
            btnInsert={btnInsert}
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
export default ListeDroitAcces;