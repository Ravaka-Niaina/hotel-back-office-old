import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import Chart from "react-apexcharts";

import callAPI from '../../../utility.js';
import styles from "./rapportReservation.module.css";
import { getDate } from "../../partenaire/Calendrier/tarif/utility.js";

const boxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
    m: 1,
    width: 800,
    margin: '10px auto',
    padding: '10px 10px'
    },
};

const optVues = ["jour", "semaine", "mois"];
const optReservEffectuees = [
    {value: "derniereAnnee", label: "Ces 365 derniers jours"},
    {value: "dernierMois", label: "Ce dernier mois"},
    {value: "derniereSemaine", label: "Cette dernière semaine"}
];

let annees = [];
let annee = 1999;
const anneeActuelle = new Date().getFullYear();
while(annee < anneeActuelle){
    annees.push(annee);
    annee++;
}

function getRoundedNumber(number){
    try{
        return number.toFixed(2);
    }catch(err){
        return number;
    }
}

function RapportReservation({}){

    const [debutReservEffectuees, setDebutReservEffectuees] = useState(null);
    const [finReservEffectuees, setFinReservEffectuees] = useState(null);
    const [anneeComparaison, setAnneeComparaison] = useState(annees[annees.length - 1]);

    const [labels, setLabels] = useState([]);
    const [maxNbNuitee, setMaxNbNuitee] = useState([]);
    const [prixMoyen, setPrixMoyen] = useState([]);
    const [ maxPrixMoyen, setMaxPrixMoyen ] = useState(0);
    const [colonneNuiteeLastYear, setColonneNuiteeLastYear] = useState([]);
    const [revParChambre, setRevParChambre] = useState([5, 2, 3, 1, 4]);
    const [revParChambreLastYear, setRevParChambreLastYear] = useState([]);

    const [erreur, setErreur] = useState(null);
    const [afficherChart, setAfficherChart] = useState(false);
    const [rapportEnCours, setRapportEnCours] = useState(false);
    const [reservPerDay, setReservPerDay] = useState([]);
    
    const options = {
        chart: { id: "basic-bar" },
        labels: labels,
        legend: { position: 'top' },
        xaxis: { type: "date" },
        yaxis: [
            {   // pour nuitee 
                title: {text: "Nuitées"},
                max: maxNbNuitee,
                labels: {formatter: (value) => getRoundedNumber(value)}
            },{ // pour nuitee annee derniere
                labels: {show: false}
            },{ // pour revenue par chambre
                seriesName: "Prix moyen",
                min: 0,
                labels: {show: false}
            },{
                min: 0,
                max: 4,
                labels: {show: false}
            }, { // pour prix moyenne
                seriesName: "Prix moyen",
                opposite: true,
                title: {text: "Prix moyenne en EUR"},
                min: 0,
                labels: {formatter: (value) => getRoundedNumber(value)}
            }
        ]
    };

    const series = [
        {   // pour nuitees
            name: "Nuitée",
            type: "column",
            data: [],
            labels: { show: false },
            legend: { show: false }
        },{ // pour nuitees annee derniere
            name: "Nuitées (L'année dernière)",
            type: "column",
            data: colonneNuiteeLastYear
        },{
            name: "Revenue par chambre",
            type: "line",
            data: revParChambre,
            stroke: { curve: "straight" }
        }, {
            name: "Prix moyen (L'année dernière)",
            type: "line",
            data: revParChambreLastYear
        }, {
            name: "Prix moyen",
            type: "column",
            data: prixMoyen
        }
    ];

    const [vue, setVue] = useState(optVues[0]);
    const [reservCompar, setReservCompar] = useState(optReservEffectuees[0].value);
    const [afficherConseil, setAfficherConseil] = useState(true);
    
    const obtenirRapport = (e) => {
        e.preventDefault();
        setErreur(null);
        setRapportEnCours(true);
        const data = {
            vue,
            debutPlage: getDate(debutReservEffectuees),
            finPlage: getDate(finReservEffectuees),
            anneeComparaison
        };
        
        callAPI("post", "/reservation/rapport", data, (res) => {
            if(res.status === 200){
                let tmpPrixMoyen = [];
                let tmpMaxNbNuitee = 0;
                let tmpMaxPrixMoyen = 0;
                const mois = ["Jan", "Fev", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
                let tmpLabels = [];
                let tmpRevParChambre = [];
                let tmpMaxRevParChambre = 0;
                for(let i = 0; i < res.stats.length; i++){
                    tmpPrixMoyen.push(res.stats[i].prixMoyen);
                    if(res.stats[i].nbNuitee > tmpMaxNbNuitee){
                        tmpMaxNbNuitee = res.stats[i].nbNuitee;
                    }
                    
                    if(res.stats[i].prixMoyen > tmpMaxPrixMoyen){
                        tmpMaxPrixMoyen = getRoundedNumber(res.stats[i].prixMoyen);
                    }
                    if(res.stats[i].revParChambre > tmpMaxPrixMoyen){
                        tmpMaxPrixMoyen = res.stats[i].revParChambre;
                    }

                    const jour = new Date(res.stats[i]._id);
                    tmpLabels.push(jour.getDate() + " " + mois[jour.getMonth()] + "\n" + jour.getFullYear());
                    tmpRevParChambre.push(getRoundedNumber(res.stats[i].revParChambre));
                }

                setPrixMoyen(tmpPrixMoyen);
                setMaxNbNuitee(tmpMaxNbNuitee);
                setMaxPrixMoyen(tmpMaxPrixMoyen);
                setLabels(tmpLabels);
                setRevParChambre(tmpRevParChambre);
                setReservPerDay(reservPerDay); // itineraires , tarifReserves, listPrix ont tous une taille 1
                setAfficherChart(true);
            }else{
                setErreur(res.message);
                setAfficherChart(false);
            }
            setRapportEnCours(false);
        });
    };

    console.log(reservPerDay);

    return (
        <div className="app">
            <Box
                sx={boxStyle}
            >
                <Paper 
                    elevation={0}
                    children={
                        <>
                            <h2>Rapport prévisionnel de performance</h2>
                            <p>Gardez un oeil sur vos réservations futures et comparez votre performance a celle des années précedentes. Vous pouvez aussi 
                                vous situer par rapport à vos concurrents directs, à votre groupe de concurrents et au marché en général.
                            </p>
                        </>
                    }
                />
            </Box>
            <Box
                sx={boxStyle}
            >
                <Paper 
                    elevation={0}
                    children={
                        <>
                            { erreur === null ? null : <Alert severity="error">{erreur}</Alert> }
                            <div className={styles.paramsChart}>
                                <div>
                                    <FormControl>
                                        <span><strong>Vue:</strong></span>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue={optVues[0]}
                                            value={vue}
                                            name="radio-buttons-group"
                                            onChange={(e) => {setVue(e.target.value)}}
                                        >
                                            {optVues.map(opt => {
                                                return(
                                                    <FormControlLabel 
                                                        value={opt} 
                                                        control={<Radio />} 
                                                        label={opt[0].toUpperCase() + opt.substring(1)}
                                                    />
                                                );
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div className="reservEffectuees">
                                    <span><strong>Réservations effectuées: </strong></span>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Début"
                                                value={debutReservEffectuees}
                                                onChange={(newValue) => {setDebutReservEffectuees(newValue)}}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Fin"
                                                value={finReservEffectuees}
                                                onChange={(newValue) => {setFinReservEffectuees(newValue)}}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className="reservEffectuees">
                                    <span><strong>Comparaison avec: </strong></span>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Année</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={anneeComparaison}
                                            label="Age"
                                            onChange={(e) => setAnneeComparaison(e.target.value)}
                                        >
                                            {annees.map(annee => {
                                                return(
                                                    <MenuItem value={annee}>{annee}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <LoadingButton
                                    onClick={(e) => obtenirRapport(e)}
                                    loading={rapportEnCours}
                                    loadingPosition="start"
                                    startIcon={<QueryStatsIcon />}
                                    variant="contained"
                                >
                                    Obtenir rapport
                                </LoadingButton>
                            </div>
                            <Paper 
                                variant="outlined"
                                children={
                                    <>
                                        {afficherConseil 
                                        ? <div className={styles.closableMessage}>
                                            <button onClick={() => {setAfficherConseil(false)}}>
                                                <span>X</span>
                                            </button>
                                            <span>Closable div</span>
                                            <p>Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He
                                                had always intended to visit him, though to the last always assuring his wife that
                                                he should not go; and till the evening after the visit was paid she had no
                                                knowledge of it. It was then disclosed in the following manner. </p>
                                        </div>
                                        : null }
                                    </>
                                }
                            />
                            <div className={styles.chart}>
                                {
                                    afficherChart 
                                    ? <Chart
                                        options={options}
                                        series={series}
                                        width="800"
                                    />
                                    : null
                                }
                            </div>
                        </>
                    }
                />
            </Box>
        </div>
    );
}

export default RapportReservation;