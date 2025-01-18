// shop odds
const COSTS = [1, 2, 3, 4, 5];


const l1 = [100, 0, 0, 0, 0]
const l2 = [100, 0, 0, 0, 0]
const l3 = [75, 25, 0, 0, 0]
const l4 = [55, 30, 15, 0, 0]
const l5 = [45, 33, 20, 2, 0]
const l6 = [30, 40, 25, 5, 0]
const l7 =[19, 30, 40, 10, 1]
const l8 = [18, 27, 32, 20, 3]
const l9 = [15, 20, 25, 30, 10]
const l10 = [5, 10, 20, 40, 25]
const odds = [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10]


const oneCostNames = ["Ahri", "Caitlyn", "Cho'Gath", "Darius", "Garen", "Jax", "Kha'Zix", "Kobuko", "Kog'Maw", "Malphite", "Rek'Sai", "Sivir", "Yasuo"]
const twoCostNames = ["Aatrox", "Gnar", "Janna", "Kindred", "Lux", "Neeko", "Qiyana", "Riven", "Senna", "Shen", "Teemo", "Yorick", "Zyra"]
const threeCostNames = ["Alune", "Amumu", "Aphelios", "Bard", "Diana", "Illaoi", "Soraka", "Tahm Kench", "Thresh", "Tristana", "Volibear", "Yone", "Zoe"]
const fourCostNames = ["Annie", "Ashe", "Galio", "Kai'sa", "Kayn", "Lee Sin", "Lillia", "Morgana", "Nautilus", "Ornn", "Sylas", "Syndra"]
const fiveCostNames = ["Azir", "Hwei", "Irelia", "Lissandra", "Rakan", "Sett", "Udyr", "Wukong", "Xayah"]
const allNames = [...oneCostNames, ...twoCostNames, ...threeCostNames, ...fourCostNames, ...fiveCostNames]



const oneCosts = Object.fromEntries(oneCostNames.map(x=>[x, 1]))
const twoCosts =  Object.fromEntries(twoCostNames.map(x=>[x, 2]))
const threeCosts = Object.fromEntries(threeCostNames.map(x=>[x, 3]))
const fourCosts = Object.fromEntries(fourCostNames.map(x=>[x, 4]))
const fiveCosts = Object.fromEntries(fiveCostNames.map(x=>[x, 5]))

const costMappings ={...oneCosts, ...twoCosts, ...threeCosts, ...fourCosts, ...fiveCosts}

const bag = [30, 25, 18, 10, 9] //number of duplicates of the same unit given a cost
const nUnique = [13, 13, 13, 12, 8] //number of unique units within a given cost


//all below functions are abstractions for intuitive data fetching
function levelOdds(level){
    return odds[level-1];
}

function bagSize(cost){
    return bag[cost-1];
}

function nUniqueCost(cost){
    return nUnique[cost-1];
}

function poolSize(cost){
    return nUnique[cost-1] * bag[cost-1]
}

function nameToCost(name){
    return costMappings[name]
}


export {allNames, levelOdds, poolSize, bagSize, nUniqueCost, nameToCost, COSTS,
    oneCostNames, twoCostNames, threeCostNames, fourCostNames, fiveCostNames}