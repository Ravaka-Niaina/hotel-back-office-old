import Rechercher from './LPolitiqueRecherche.js';

const btnInsert = {urlRedirect: "/back/politique", label: "Insert Politique"}
const urlSearch = "/politique/list";
const tableName = "politiqueAnnulation";
const fieldsToSearch = [
    {name: "nom", type: "String"}
];
const fieldsToPrint = [
    {field: "_id", label: null},
    {field: "nom", label: "Nom"},
    {field: "type", label: null},
    {field: "datePrice", label: "condition", type: "Array"},
    {field: "remboursable", label: "remboursable", type: "String"}
];
const nbContent = 5;
const urlEdit = '/back/politique/detail/';
const rowsPerPageOptions = [5, 10, 20];

export default function ListPolitque(){
    return(
        
        <Rechercher 
            currentPage={4}
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
