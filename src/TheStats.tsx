import "./utils.js"
//FILE PURPOSE: Very simple component to display the probabilities numerically at the bottom of the page

function statLine(numSeen, probability){
    return <div> The probability of seeing {numSeen} of the desired unit is {probability}%</div>
}
export default function TheStats({probabilities}) {
return <div className = "TheStats">
    {statLine(0,probabilities[0])}
    {statLine(1,probabilities[1])}
    {statLine(2,probabilities[2])}
    {statLine(3,probabilities[3])}
    {statLine(4,probabilities[4])}
    {statLine(5,probabilities[5])}
    {statLine(6,probabilities[6])}
    {statLine(7,probabilities[7])}
    {statLine(8,probabilities[8])}
    {statLine(9,probabilities[9])}
</div>;

}