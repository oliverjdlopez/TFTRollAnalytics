import {bagSize, levelOdds, nameToCost, nUniqueCost, COSTS, allNames, poolSize} from "./utils.js";


export default class RolldownSim {
    cfg;
    level;
    nTargets;
    nSims;
    gold;
    oobNonTarget;
    oobTarget;
    odds;
    targetNames;
    targetCosts;
    targetNameEnum;

    constructor(cfg) {
        if (this.validInputs(cfg)) {
            this.initCfg = cfg
            this.setCfgFields(cfg)
            this.odds = levelOdds(this.level)
            this.targetNames = Object.keys(this.targetNameEnum).filter(name => allNames.includes(name))
            this.targetCosts = this.targetNames.map(n => nameToCost(n))


            this.shopDist = this.makeShopDist()
            this.bags = this.makeBags()


            this.initBags = {...this.bags} // for easier resetting later
            this.sims = new Array(this.nSims)
            this.probs = {}
            this.targetNames.forEach(name => this.probs[name] = new Array(10).fill(0))
        } else {
            this.handleInvalidInputs(cfg)
        }


    }
    


    // TODO: adapt to work with new  structure and arrays
    // Tests to make sure that inputs are within game confines. Returns bool
    validInputs(cfg) {
        // check game state inputs
        const validLevel = cfg.level >= 1 && cfg.level <= 10
        const validGold = cfg.gold >= 0
        const validGameState = validGold && validLevel

        // unit inputs
        const validOobUnit = []
        for (let name of Object.keys(cfg.targetNameEnum)){
            validOobUnit.push(cfg.oobUnit >= 0 && cfg.oobUnit <= bagSize(cfg.cost)) // can only be as many units out of the bag as there are units in the bag
        }

        const maxOobCost = bagSize(cfg.cost) * nUniqueCost(cfg.cost) - cfg.oobUnit
        const validOobCost = (cfg.oobCost >= 0) && (cfg.oobCost <= maxOobCost)




        return true
    }

    setCfgFields(cfg){
        this.level = cfg.level
        this.nTargets = cfg.nTargets
        this.nSims = cfg.nSims
        this.gold = cfg.gold
        this.oobNonTarget = cfg.oobNonTarget
        this.oobTarget = cfg.oobTarget
        this.targetNameEnum = cfg.targetNameEnum

    }

//invalid input handler
//For now, just returns empty results so that the chart goes blank
    handleInvalidInputs() {

        return []
    }


    // TODO: do this function after rest of the process is set up
    // reset any chages made on a per-rolldown basis
    reset(cfg) {
        this.setCfgFields(cfg)
        //reset to old
        this.bags = {...this.initBags}

    }



    //populate all bags with strings that are either the name of a target unit or nonTarget
    makeBags() {
        // NOTE: bags is dicionaary of arrays instead of dictionary of dictionaries because arrays make random seleection easier
        const bags = this.makeEmptyCostDict([]) //bags[cost] is the dictionary containing bags for each cost.

        //populate bags with targets
        for (let name of this.targetNames) {
            const cost = nameToCost(name)
            const targetsLeft = bagSize(cost) - this.oobTarget[name]
            const targetsArray = Array(targetsLeft).fill(name)
            bags[cost] = [...bags[cost], ...targetsArray] // add however many copies of target unit are still in bag
        }

        // make into two diff loops so that bags can be fully filled with targets before calling bags[cost].length
        for (let name of this.targetNames){
            const cost = nameToCost(name)
            const nonTargetsLeft = poolSize(cost) - this.oobNonTarget[cost] - bags[cost].length // # units of cost - # of oobNonTarget - # of target units
            const nonTargetsArray = Array(nonTargetsLeft).fill("nonTarget")
            bags[cost] = [...bags[cost], ...nonTargetsArray]
        }

        return bags
    }

    //run and store all sims
    runAllSims() {
        for (let i = 0; i < this.nSims; i++) {
            this.sims[i] = this.runOneSim()
            this.reset(this.initCfg)
        }
        this.calcProbabilities()
    }

    makeShopDist(){
        let shopDist = []
        // make array of length 100 with ints >=1 and <=5
        for (var i = 0; i < 5; i++) {
            const l = new Array(this.odds[i]).fill(i + 1)
            shopDist = [...shopDist, ...l]
        }

        return shopDist
    }
    // roll the costs of the shops in advance
    makeShopBuffer() { //roll the costs of shop cards (not actual units) ahead of time, for faster(?) execution

        let shopDist = []
        // make array of length 100 with ints >=1 and <=5
        for (var i = 0; i < 5; i++) {
            const l = new Array(this.odds[i]).fill(i + 1)
            shopDist = [...shopDist, ...l]
        }

        const buffer = []
        const maxShops = Math.floor(this.gold / 2)
        for (let i = 0; i < maxShops; i++) {
            let shop = new Array(5).fill(0)
            for (let i = 0; i < 5; i++) {
                const choice = Math.floor(Math.random() * 100)
                shop[i] = shopDist[choice]
            }
            buffer.push(shop)
        }
        return buffer
    }

    makeEmptyCostDict(fill= undefined){
        const d = {}
        for (let c of COSTS){
            d[c] = fill
        }
        return d;
    }

    makeEmptyTargetDict(fill= undefined){
        const d = {}
        for (let c of this.targetNames){
            d[c] = fill
        }
        return d;
    }


    /*TODO: important issue is how to handle what happens if your last shop contains any of the desired units but not enough
     money to purchase one/any of them. Current solution is to count everything within the last shop as hit, even if no gold,
     on the theory that if you wanted to, you could sell something on your board
     */

    //run one sim, store the results dict
    runOneSim() {
        let results = this.makeEmptyTargetDict(0)
        while (this.gold >= 2) {
            this.gold = this.gold - 2 // reroll shop

            //roll 5 slots in shop
            for (let i=0; i<5; i++){
                const costChoice = Math.floor(Math.random() * this.shopDist.length)//choose random unit from bag
                const cost = this.shopDist[costChoice]

                if (this.targetCosts.includes(cost)) { // only do something if
                    const unitChoice = Math.floor(Math.random() * this.bags[cost].length)//choose random unit from bag
                    const name = this.bags[cost][unitChoice]
                    if (name !== "nonTarget") { // only do anything if nonTarget unit


                        results[name] = results[name] + 1 //record another hit
                        this.gold = this.gold - cost //buy the unit
                        this.bags[cost].slice(unitChoice)//remove unit from the bags
                    }
                }
            }

        }

        return results

    }


    calcProbabilities() {
        for (let sim of this.sims){ //this.sims[i][name] is teh number of times in the i-th sim that corresponding unit was seen
            for (let name of this.targetNames){
                const nFound = sim[name]
                this.probs[name][nFound]++
            }
        }

        //normalize
        for(let name of this.targetNames){
            this.probs[name] = this.probs[name].map(n => n/this.nSims)
        }

    }

    //might seem unnecessary, but I think will eventually be helpful in the future for passing info along
    getResults(){
        return {"probs": this.probs,
                "sims": this.sims}


    }

}

