import Rechercher from '../common/Recherche.js';

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
    {field: "nom", label: "Nom"},
    {field: "chambresAtrb", label: "Chambres attribues", type: "Array"},
    {field: "dateSejour.debut", label: "Debut date sejour", type: "Date"},
    {field: "dateSejour.fin", label: "Fin date sejour", type: "Date"},
    {field: "dateReservation.debut", label: "Debut date reservation", type: "Date"},
    {field: "dateReservation.fin", label: "Fin date reservation", type: "Date"},
    {field: "politiqueAnnulAtrb", label: "Politiques d'annulation attribuees", type: "Array"},
];
const nbContent = 10;
const urlEdit = '/tarif/details/';

export default function ListTarif(){
    return(
        <Rechercher 
            urlSearch={urlSearch}
            tableName={tableName}
            fieldsToSearch={fieldsToSearch}
            fieldsToPrint={fieldsToPrint}
            urlEdit={urlEdit}
            nbContent={nbContent}
        />
    );
}