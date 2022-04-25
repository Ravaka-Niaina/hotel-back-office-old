import { useState, useRef } from 'react';
import Chart from "react-apexcharts";

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


    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={series}
                        width="800"
                    />
                </div>
            </div>
        </div>
    );
}

export default RapportReservation;