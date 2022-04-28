import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Chart from "react-apexcharts";

import styles from "./rapportReservation.module.css";

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

function RapportReservation({}){
    const [options, setOptions] = useState({
        chart: {
          id: "basic-bar"
        },
        labels: ["01 Jan 2021", "01 Fev 2022", "01 Mar 2022", "01 Apr 2022", "01 May 2022", "01 Jun 2022"],
        legend: {position: 'top'},
        xaxis: {
          type: "date"
        },
        yaxis: [
            {   // pour nuitee 
                title: {text: "Nuitées"}
            },{ // pour nuitee annee derniere
                labels: {show: false}
            },{ // pour prix moyen
                min: 0,
                max: 4,
                labels: {show: false}
            },{
                min: 0,
                max: 4,
                labels: {show: false}
            }, { // pour prix moyenne
                opposite: true,
                title: {text: "Prix moyenne en EUR"},
                min: 0,
                max: 800,
                tickAmount: 3
            }
        ]
    });

    const [series, setSeries] = useState(
        [
            {   // pour nuitees
                name: "Nuitées",
                type: "column",
                data: [2, 1, 4, 1, 3, 2]
            },{ // pour nuitees annee derniere
                name: "Nuitées (L'année dernière)",
                type: "column",
                data: [0, 3, 2, 1, 4, 3]
            },{
                name: "Prix moyen",
                type: "line",
                data: [3, 2, 2, 0, 2, 2]
            }, {
                name: "Prix moyen (L'année dernière)",
                type: "line",
                data: [0, 1, 1, 0, 2, 3]
            }
        ]
    );

    const [vue, setVue] = useState(optVues[0]);
    const [reservEffectuees, setReservEffectuees] = useState(optReservEffectuees[0].value);
    const [reservCompar, setReservCompar] = useState(optReservEffectuees[0].value);
    const [afficherConseil, setAfficherConseil] = useState(true);

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

                                <div>
                                    <FormControl fullWidth>
                                        <span><strong>Réservations effectuées: </strong></span>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={optReservEffectuees[0].value}
                                            value={reservEffectuees}
                                            label="Réservations effectuées"
                                            onChange={(e) => {setReservEffectuees(e.target.value)}}
                                        >
                                            {optReservEffectuees.map(opt => {
                                                return(
                                                    <MenuItem value={opt.value}>{opt.label}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div>
                                    <FormControl fullWidth>
                                        <span><strong>Comparaison avec: </strong></span>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={optReservEffectuees[0].value}
                                            value={reservCompar}
                                            label="Réservations effectuées"
                                            onChange={(e) => {setReservCompar(e.target.value)}}
                                        >
                                            {optReservEffectuees.map(opt => {
                                                return(
                                                    <MenuItem value={opt.value}>{opt.label}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
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
                                <Chart
                                    options={options}
                                    series={series}
                                    width="800"
                                />
                            </div>
                        </>
                    }
                />
            </Box>
        </div>
    );
}

export default RapportReservation;