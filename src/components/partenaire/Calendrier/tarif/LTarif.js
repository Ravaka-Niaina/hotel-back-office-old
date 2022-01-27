import Rechercher from '../../../common/List/Recherche.js';

const btnInsert = {urlRedirect: "/back/tarif/insert", label: "Ajouter plan tarifaire"}
const urlSearch = "/planTarifaire";
const tableName = "tarif";
const fieldsToSearch = [
    {name: "nom", type: "String"},
    {name: "chambresAtrb", type: "Array"},
    {name: "dateSejour.debut", type: "Date"},
    {name: "dateSejour.fin", type: "Date"},
    {name: "dateReservation.debut", type: "DateTime"},
    {name: "dateReservation.fin", type: "DateTime"},
    {name: "politiqueAnnulAtrb", type: "Array"}
];
const fieldsToPrint = [
    {field: "_id", label: null},
    {field: "nom", label: "Nom"},
    {field: "chambresAtrb", label: "Chambres attribues", type: "Array"},
    {field: "dateSejour.debut", label: "Debut date sejour", type: "Date"},
    {field: "dateSejour.fin", label: "Fin date sejour", type: "Date"},
    {field: "dateReservation.debut", label: "Debut date reservation", type: "Date"},
    {field: "dateReservation.fin", label: "Fin date reservation", type: "Date"},
    {field: "politiqueAnnulAtrb", label: "Politiques d'annulation attribuees", type: "Array"},
];
const nbContent = 5;
const urlEdit = '/back/tarif/details/';
const rowsPerPageOptions = [5, 10, 20];
const accessRightToViewInsert = ["superAdmin", "insertPlanTarifaire"];
const accessRightToDelete = ["superAdmin", "deletePlanTarifaire"];
const accessRightToViewDetails = ["superAdmin", "getPlanTarifaire", "updatePlanTarifaire"];

export default function ListTarif(){
    return(
        <Rechercher
            currentPage={1}
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
        />
    );
}
