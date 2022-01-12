import Rechercher from '../common/Recherche.js';

const urlSearch = "/promotion/search";
const tableName = "promotion";
const fieldsToSearch = [
    {name: "nom", type: "String"},
    {name: "sejourMin", type: "Float"},
    {name: "planTarifaire", type: "Array"},
    {name: "typeChambre", type: "Array"},
    {name: "dateDebutS", type: "Date"},
    {name: "dateFinS", type: "Date"}
];
const fieldsToPrint = [
    {field: "_id", label: null}, 
    {field: "nom", label: "Nom"}, 
    {field: "sejourMin", label: "Sejour min", type: "Integer"}, 
    {field: "planTarifaire", label: "Plan tarifaire"}, 
    {field: "typeChambre", label: "Type chambre"}, 
    {field: "dateDebutS", label: "Debut sejour", type: "Date"}, 
    {field: "dateFinS", label: "Fin sejour", type: "Date"}
];
const nbContent = 3;
const urlEdit = '/promotion/detail/';
const rowsPerPageOptions = [2, 4, 6];

export default function ListPromotion(){
    return(
        <Rechercher 
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