 import './App.css';
import {Fragment, useState} from "react";
import TheChart from "./TheChart.tsx";
import RolldownSim from "./RolldownSim";
import TheStats from "./TheStats.tsx";

import {handleNameUpdate, handleOobTargetUpdate, handleSimulate, handleClear,
    handleAddTarget, handleOobNonTargetUpdate, handleProbTypeUpdate, handleNSimsUpdate} from "./handlers";
import {allNames, bagSize, COSTS, nameToCost, poolSize} from "./utilsSet14.js";
import RolldownSimSimpleTests from "./RolldownSimSimpleTests";
import AppSimpleTests from "./AppSimpleTests";
import ChartSimpleTests from "./ChartSimpleTests"
import Dropdown from "react-bootstrap/Dropdown"

// For error handling: 1) input name not in dictionary 2) only re-render/run when button is hit 3) both oob are within range
// 4) indexing for arrays consistent/correct

const maxUnits = 3
const nSims = 100000
const targetNames = ['Null unit']//targetNames.i is user's i-th desired unit.
const oobNonTarget = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0} // oobNonTarget.cost is number of nonTargets costs are out of the pool
const oobTarget = {'Null unit': 0} // oobTarget.name is the number of target unit that is out of the pool
const useCumProbs = false;


const initCfg = {level: 6, gold: 20, nTargets: 3, nSims: nSims, targetNames: targetNames,
    useCumProbs: useCumProbs, oobNonTarget: oobNonTarget, oobTarget: oobTarget}

//RolldownSimSimpleTests()
//AppSimpleTests()
//ChartSimpleTests()


export default function App() {
    const [cfg, setCfg] = useState(initCfg) //e.g. level, shops, etc, set by button changes
    const [sim, setSim] = useState(null) //the simulation object, which contains the results of the simulation
    const [results, setResults] = useState({}) //the results to graph, could be standard, cumulative, with bool conditions, etc.
    const [conditions, setConditions] = useState([[""]]) //boolean conditions for filtering
    // const

    
    
    
    /* TODO: figure out if I want to keep this
    const inputSlider = <div>
        <label htmlFor={"nTargets"}> How many units are you rolling for? </label>
        <input type={"range"} min={0} max={maxUnits} value={cfg.nTargets}
               onChange={(e) => setCfg({...cfg, nTargets: Number(e.target.value)})}/>

    </div> */

    const inputSlider = <div></div> //not using this for now
    return (
        <div className="App">
            <header> TFT roll simulator</header>
            <div> This is a rolling odds calculator for TFT, for when you want to know whether you're a
                mortdogged genius or just a lucky fraud.
            </div>

            {inputSlider}
            <div className={"inputDescription"}>
            Enter your parameters:
            </div>
            <GameStateInputs cfg={cfg} setCfg={setCfg}/>
            <div className={"inputDescription"}>
                Enter the units you're rolling for:
            </div>
            <ConditionInputs cfg={cfg} setCfg={setCfg} conditions={conditions} setConditions={setConditions}/>



            <OobTargetInputs cfg={cfg} setCfg={setCfg} conditions={conditions}/>
            <div className={"inputDescription"}>
                Enter how many OTHER units are out of the bag:
            </div>
            <OobNonTargetInputs cfg={cfg} setCfg={setCfg}/>

          <div className={"inputDescription"}>
                Options:
                <div style={{ justifyContent: "center", display: "flex", flexDirection: "row"}}> 
                    Number of simulations: <select value={cfg.nSims} onChange={(e) => handleNSimsUpdate(e, cfg, setCfg)}> 
                        <option value={10000}>Low</option>
                        <option value={50000}>Medium</option>
                        <option value={100000}>High</option>
                        <option value={500000}>Very high (~0 variance)</option>
                        </select>



                    Use cumulative probabilities: <input type="checkbox" id="useCumProbs" checked={cfg.useCumProbs}
                   onChange={(e) => handleProbTypeUpdate(cfg, sim, setCfg, setResults)}/>
            </div>
            </div>


            
            
            <button onClick={() => handleSimulate(cfg, conditions, setResults, setSim)}> Simulate</button>
            <button onClick={() => handleClear(initCfg, setCfg, setResults)}> Clear</button>
            
            
            
            <TheChart cfg={cfg} results={results}/>

            {/*<TheStats probabilities={results.probabilities} className="TheStats"/>*/}
        </div>
    );
}

 function GameStateInputs({cfg, setCfg}) {
     return <div className={"GameStateInputs"}>

     <label htmlFor={"level"} className={"gameStateInput"}> Level</label>
        <input type={"number"} min={0} max={10} value={cfg.level}
               onChange={(e) => setCfg({...cfg, level: Number(e.target.value)})}/>
        <label htmlFor={"Gold"} className={"gameStateInput"}> Gold</label>
        <input type={"number"} min={0} value={cfg.gold}
               onChange={(e) => setCfg({...cfg, gold: Number(e.target.value)})}/>
    </div>
}





function OobTargetInputs({cfg, setCfg, conditions}) {

    const allInputs = conditions.flat()
    const allValidNames = allInputs.filter(name => allNames.includes(name))
    const targetNames = [...new Set(allValidNames)];
    console.log(targetNames)

    return <div className={"OobTargetInputs"}>
                {targetNames.map(name => ( // make out of bag input for any non-null unit
                    <div className={"OobTargetInput"}>
                        <label htmlFor={name}> How many {name} are out of the bag?</label>
                        <input id={name} min={0} max={bagSize(name)} type={"number"} value={cfg.oobTarget[name]}
                               onChange={(e) => handleOobTargetUpdate(e, name, cfg, setCfg)}/>
                    </div>))}

        </div>
}


// TODO: make costs appear adaptively as units are added so that it's explanatory for user
function OobNonTargetInputs({cfg, setCfg}) {
    const costStrings = COSTS.map(cost => String(cost))
    return <div className={"OobNonTargetInputs"}>
        {costStrings.map(cost =>
                <div key={cost} className={"OobNonTargetInput"}>
                    <label htmlFor={cost}> {cost} costs?</label>
                    <input key={cost} min={0} max={poolSize(cost)} type={"number"} value={cfg.oobNonTarget[cost]}
                           onChange={(e) => handleOobNonTargetUpdate(e, cost, cfg, setCfg)}/>
                </div>)}
    </div>

}



//TODO: refactor handlers
function ConditionInputs({cfg, setCfg, conditions, setConditions}) {
    // Add a new OR group
    const addCondition = () => setConditions([...conditions, [""]]);
    // Add a unit to a group (AND)
    const addUnitInput = (groupIdx) => {
        const newConditions = conditions.map((group, i) =>
            i === groupIdx ? [...group, ""] : group
        );
        setConditions(newConditions);
    };

    const updateUnitInput = (groupIdx, unitIdx, value) => {
            const newConditions = conditions.map((group, i) =>
                i === groupIdx
                    ? group.map((unit, j) => (j === unitIdx ? value : unit))
                    : group
            );
            setConditions(newConditions);
    };

    const removeUnitInput = (groupIdx, unitIdx) => {
        const newConditions = conditions.map((group, i) =>
            i === groupIdx
                ? group.filter((_, j) => j !== unitIdx)
                : group
        );
        setConditions(newConditions);
    };
    // Remove entire condition input
    const removeCondition = (groupIdx) => {
        setConditions(conditions.filter((_, i) => i !== groupIdx));
    };

    return (
        <div>
            <div><b>Outcomes:</b></div>
            {conditions.map((group, groupIdx) => (
                <div key={groupIdx} style={{marginBottom: 8, border: "1px solid #ccc", padding: 4}}>
                    <span>Group {groupIdx + 1} (AND): </span>
                    {group.map((unit, unitIdx) => (
                        <span key={unitIdx}>
                            <input
                                type="text"
                                value={unit}
                                placeholder="Unit name"
                                onChange={e => {updateUnitInput(groupIdx, unitIdx, e.target.value); handleNameUpdate(e, cfg, setCfg)}}
                                
                                style={{marginRight: 4}}
                            />
                            <button onClick={() => removeUnitInput(groupIdx, unitIdx)}>-</button>
                        </span>
                    ))}
                    <button onClick={() => addUnitInput(groupIdx)}>+ Unit (AND)</button>
                    <button onClick={() => removeCondition(groupIdx)} style={{marginLeft: 8}}>Remove Group</button>
                </div>
            ))}
            <button onClick={addCondition}>+ Group (OR)</button>
        </div>
    );
}