import Rechercher from '../../common/List/Recherche.js';

const btnInsert = {urlRedirect: "/back/promotion/insert", label: "Ajouter promotion"};
const urlSearch = "/promotion/search";
const tableName = "promotion";
const fieldsToSearch = [
    {name: "nom", type: "String"},
    {name: "sejourMin", type: "Float"},
    {name: "planTarifaire", type: "Array"},
    {name: "typeChambre", type: "Array"},
    {name: "dateDebutS", type: "DateTime"},
    {name: "dateFinS", type: "DateTime"}
];
const fieldsToPrint = [
    {field: "_id", label: null}, 
    {field: "nom", label: "Nom"}, 
    {field: "sejourMin", label: "Sejour min", type: "Integer"}, 
    {field: "planTarifaire", label: "Plan tarifaire"}, 
    {field: "typeChambre", label: "Type chambre"}, 
    {field: "dateDebutS", label: "Debut sejour", type: "DateTime"}, 
    {field: "dateFinS", label: "Fin sejour", type: "Date"}
];
const nbContent = 5;
const urlEdit = '/back/promotion/detail/';
const rowsPerPageOptions = [5, 10, 20];
const accessRightToViewInsert = ["superAdmin", "insertPlanTarifaire"];
const accessRightToDelete = ["superAdmin", "deletePlanTarifaire"];
const accessRightToViewDetails = ["superAdmin", "getPlanTarifaire", "updatePlanTarifaire"];
const accessRightToViewList = ["superAdmin", "getListPromotion"];

export default function ListPromotion(){
    return(
        <Rechercher 
            currentPage={3}
            btnInsert={btnInsert}
            urlSearch={urlSearch}
            tableName={tableName}
            fieldsToSearch={fieldsToSearch}
            fieldsToPrint={fieldsToPrint}
            urlEdit={urlEdit}
            nbContent={nbContent}
            rowsPerPageOptions={rowsPerPageOptions}
            accessRightToViewInsert={accessRightToViewInsert}
            accessRightToViewDetails={accessRightToViewDetails}
            accessRightToDelete={accessRightToDelete}
            accessRightToViewList={accessRightToViewList}
            title="Liste des promotions"
        />
    );
}