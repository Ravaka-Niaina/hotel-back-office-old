import Rechercher from '../common/List/Recherche.js';

const btnInsert = {urlRedirect: "/typeChambre/insert", label: "Ajouter type chambre"};
const urlSearch = "/typeChambre/TC";
const method = "post";
const tableName = "typeChambre";
const fieldsToSearch = [
    {name: "nom", type: "String"},
    {name: "nbAdulte", type: "Integer"},
    {name: "nbEnfant", type: "Integer"},
    {name: "chambreTotal", type: "Integer"},
    {name: "superficie", type: "Float"}
];
const fieldsToPrint = [
    {field: "_id", label: null},
    {field: "nom", label: "Nom"},
    {field: "nbAdulte", label: "Nomre adultes", type: "Integer"},
    {field: "nbEnfant", label: "Nombre enfants", type: "Integer"},
    {field: "chambreTotal", label: "Chambres total", type: "Integer"},
    {field: "superficie", label: "Superficie", type: "Float"}
];
const nbContent = 5;
const urlEdit = "/typeChambre/details/";
const rowsPerPageOptions = [5, 10, 20];

export default function ListTypeChambre(){
    return(
        <Rechercher 
            btnInsert={btnInsert}
            urlSearch={urlSearch}
            tableName={tableName}
            fieldsToSearch={fieldsToSearch}
            fieldsToPrint={fieldsToPrint}
            urlEdit={urlEdit}
            nbContent={nbContent}
            rowsPerPageOptions={rowsPerPageOptions}
        />
    );
}
