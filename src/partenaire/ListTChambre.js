import Rechercher from '../common/Recherche.js';

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
    {field: "nom", label: "Nom"},
    {field: "nbAdulte", label: "Nomre adultes", type: "Integer"},
    {field: "nbEnfant", label: "Nombre enfants", type: "Integer"},
    {field: "chambreTotal", label: "Chambres total", type: "Integer"},
    {field: "superficie", label: "Superficie", type: "Float"}
];
const nbContent = 10;
const urlEdit = "/typeChambre/details/";

export default function ListTypeChambre(){
    return(
        <Rechercher 
            urlSearch={urlSearch}
            method={method}
            tableName={tableName}
            fieldsToSearch={fieldsToSearch}
            fieldsToPrint={fieldsToPrint}
            urlEdit={urlEdit}
            nbContent={nbContent}
        />
    );
}