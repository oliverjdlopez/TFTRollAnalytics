import {Bar} from 'react-chartjs-2'
import "./utils.js"
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

function makeNullChart() {
    const nullData = {
        labels,
        datasets: [
            {
                data: labels.map((x) => 0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <Bar options={options} data={nullData} className={"TheChart"}/>;
}





function makeChartData(probabilities){
        const ds = (Object.keys(probabilities)).map((k, i)=>
            ({
                label: k,
                data: probabilities[k],
                backgroundColor: colors[i]
            }))
        return {labels: labels,

            datasets: ds}
    }

function makeChart(results){

    return <Bar options={options} data={makeChartData(results["probs"])} className={"TheChart"}/>;

}

export default function TheChart({results}) {
    if (Object.keys(results).length === 0){
        return makeNullChart()
    }
    else {
        return makeChart(results);
    }
    }