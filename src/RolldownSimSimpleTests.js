import RolldownSim from "./RolldownSim";
import {COSTS} from "./utilsSet13";


export default function RolldownSimSimpleTests () {
     const cfg = makeTestCfg1()
     const r1 = new RolldownSim(cfg)

     testTypes(r1);
     testValues(r1);
     const start = performance.now()
     r1.runAllSims()
     const end = performance.now()
     console.log("time to run " + cfg["nSims"] + " sims was" + (end-start) + " ms")
     console.log(r1)
}

function makeTestCfg1() {
     const nSims = 1000000 // big number for low variance testing
     const targetNamesEnum = {"Darius": 1, "Annie": 2}//targetNames.i is user's i-th desired unit
     const oobNonTargets = {"1": 20, "4": 5} // oobNonTargets.cost is number of nonTarget costs are out of the pool
     const oobTargets = {"Darius": 5, "Annie": 1} // oobTargets.name is the number of target unit that is out of the pool

     return {level: 6, gold: 40, nUnits: 2, nSims: nSims, targetNamesEnum: targetNamesEnum, oobNonTargets: oobNonTargets, oobTargets: oobTargets,
          sims: {}, probs: []}

}


function checkArrayType(arr, desiredType){
     for (let element of arr){
          console.assert(typeof element === desiredType, "array has desired type " + desiredType + "but element has type of "+ typeof element)
     }
}
function testProbs1() {
     const test_probs = [.1, .2, .3, .4, .5, .6, .7, .8, .9]
     return {"Annie": test_probs, "Ornn": test_probs}
}

function testTypes(r){

     console.log(r)
     //vars from cfg
     console.assert(typeof r.level == "number", "testTypes failure")
     console.assert(typeof r.nTargets == "number", "testTypes failure")
     console.assert(typeof r.nSims == "number", "testTypes failure")
     console.assert(typeof r.gold == "number", "testTypes failure")
     console.assert(Array.isArray(r.odds), "testTypes failure")
     checkArrayType(r.odds, 'number')
     console.assert(Array.isArray(r.targetNames))
     checkArrayType(r.targetNames, 'string')
     //vars created by object
     /*
     for (let s of r.shopBuffer){
          console.assert(Array.isArray(s), "testTypes failure")
          checkArrayType(s, 'number')
     }
      */
     for (let [k,v] of Object.entries(r.bags)){
               console.assert(typeof k == "string", "testTypes failure")
               console.assert(COSTS.includes(Number(k)), "testTypes failure")
               console.assert(Array.isArray(v), "testTypes failure")
               checkArrayType(v, 'string')
               for (let s of v){
                    console.assert((s === "nonTarget" || r.targetNames.includes(s)), "testTypes failure")
               }

          }

}


// When start working with invariants or invalid inputs, can expand this
function testValues(r){
     let shopOddsSum = 0
     for (let o of r.odds){
          shopOddsSum = shopOddsSum + o
     }
     console.assert(shopOddsSum === 100, "testValues failure")
     for (let bag of Object.values(r.bags)) {
          for (let s of bag) {
               console.assert((s === "nonTarget" || r.targetNames.includes(s)), "testValues failure")
          }
     }

}

function testSims(r){

}