import {Bar} from 'react-chartjs-2'
import "../utilsSet14.js"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

ChartJS.defaults.backgroundColor = "#333333"

export const options = {
    responsive: true,
    layout: {
        padding:{
            top:100,
            bottom: 100,
            left: 100,
            right: 100,
        }
    },
    scales:{
        y:{
            title:{
                display: true,
                text: "Probability"
            },
        },
        x:{
            title:{
                display: true,
                text: "# of copies seen"
            },
        },
    },
    plugins: {

        legend: {
            position: 'top' as const,
            display: true
        },
        title: {
            display: true,
            text: "",
        },
    },
};

const labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


const colors = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 0, 0.5)']

const nullData = { //empty chart data
    labels: labels,
    datasets:[],
}


export default function UnitChart({cfg, results}) {

    if (Object.keys(results).length === 0){ // return blank chart if no results (i.e. sim not run yet)
        return <Bar options={options} data={nullData} className={"TheChart"}/>
    }

    else {
        const probabilities = cfg.useCumProbs ? results.cumProbs : results.probs;
        const unitData = (Object.keys(probabilities)).map((k, i)=> // create a dataset for each unit name
            ({
                label: k,
                data: probabilities[k],
                backgroundColor: colors[i]
            }))
        const chartData = { // if no data, return empty dataset
            labels: labels, // labels are nums from 0 to 9
            datasets: unitData // each entry in chart data is unit name and corresponding probabilities
        }

        return <Bar options={options} data={chartData} className={"TheChart"}/>

    }

}