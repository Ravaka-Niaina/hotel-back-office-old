import Rechercher from '../common/List/Recherche.js';

const btnInsert = {urlRedirect: "/promotion/insert", label: "Ajouter promotion"};
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
const urlEdit = '/promotion/detail/';
const rowsPerPageOptions = [5, 10, 20];

export default function ListPromotion(){
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