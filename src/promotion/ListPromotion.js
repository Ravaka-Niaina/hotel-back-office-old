import Rechercher from '../common/Recherche.js';

const urlSearch = "/promotion/search";
const tableName = "promotion";
const fieldsToSearch = [
    {name: "nom", type: "String"},
    {name: "sejourMin", type: "Float"},
    {name: "planTarifaire", type: "Array"},
    {name: "typeChambre", type: "Array"}
];
const fieldsToPrint = ["_id", "nom", "sejourMin", "planTarifaire", "typeChambre"];
const nbContent = 10;
export default function ListPromotion(){
    return(
        <Rechercher 
            urlSearch={urlSearch}
            tableName={tableName}
            fieldsToSearch={fieldsToSearch}
            fieldsToPrint={fieldsToPrint}
            nbContent={nbContent}
        />
    );
}