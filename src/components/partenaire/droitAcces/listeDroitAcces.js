import Rechercher from '../../common/Recherche.js x';

const btnInsert = {urlRedirect: "/back/accessRight/insert", label: "Ajout droit d'accés"};
const urlSearch = "/droitAcces/list";
const method = "get";
const tableName = "droitAcces";
const fieldsToSearch = [
    {name: "_id", type: "String"},
    {name: "nom", type: "String"}
];
const fieldsToPrint = [
    {field: "_id", label: "Id"},
    {field: "nom", label: "Nom"}
];
const nbContent = 5;
const urlEdit = "/back";