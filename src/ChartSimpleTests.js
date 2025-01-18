import {options} from "./TheChart.tsx";
const colors = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 0, 0.5)']
const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
function makeTestChartData() {
    const test_probs = [.1, .2, .3, .4, .5, .6, .7, .8, .9]
    const test_dict = {"Annie": test_probs, "Ornn": test_probs}
    const ds = (Object.keys(test_dict)).map((k, i) =>
        ({
            label: k,
            data: test_dict[k],
            backgroundColor: colors[i]
        }))
    return {
        labels: labels,
        options: options,
        datasets: ds
    }
}

