 import './App.css';
import {Fragment, useState} from "react";
import TheChart from "./TheChart.tsx";
import RolldownSim from "./RolldownSim";
import TheStats from "./TheStats.tsx";

import {handleNameUpdate, handleOobTargetUpdate, handleSimulate, handleClear,
    handleAddTarget, handleOobNonTargetUpdate} from "./handlers";
import {allNames, COSTS, nameToCost} from "./utils.js";
import RolldownSimSimpleTests from "./RolldownSimSimpleTests";
import AppSimpleTests from "./AppSimpleTests";
import ChartSimpleTests from "./ChartSimpleTests"
import Dropdown from "react-bootstrap/Dropdown"

// For error handling: 1) input name not in dictionary 2) only re-render/run when button is hit 3) both oob are within range
// 4) indexing for arrays consistent/correct

const maxUnits = 3
const nSims = 100000
const targetNameEnum = {'Null unit': 0}//targetNames.i is user's i-th desired unit. '': 0 represents no data, it is there to keep state controlled
const oobNonTarget = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0} // oobNonTarget.cost is number of nonTargets costs are out of the pool
const oobTarget = {'Null unit': 0} // oobTarget.name is the number of target unit that is out of the pool
const initCfg = {level: 6, gold: 20, nTargets: 3, nSims: nSims, targetNameEnum: targetNameEnum,
    oobNonTarget: oobNonTarget, oobTarget: oobTarget}

//RolldownSimSimpleTests()
//AppSimpleTests()
//ChartSimpleTests()


export default function App() {
    const [cfg, setCfg] = useState(initCfg) //e.g. level, shops, etc, set by button changes
    const [results, setResults] = useState({})
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
                Which units are you rolling for?
            </div>
            <NameInputs cfg={cfg} setCfg={setCfg}
                        className="NameInputs"/>


            <OobTargetInputs cfg={cfg} setCfg={setCfg}/>
            <div className={"inputDescription"}>
                How many units are out of the pool (not inluding the ones you're rolling for)?
            </div>

            <OobNonTargetInputs cfg={cfg} setCfg={setCfg}/>

            <GameStateInputs cfg={cfg} setCfg={setCfg}/>

            <button onClick={() => handleSimulate(cfg, setResults)}> Simulate</button>
            <button onClick={() => handleClear(initCfg, setCfg, setResults)}> Clear</button>
            <TheChart results={results} className="TheChart"/>

            {/*<TheStats probabilities={results.probabilities} className="TheStats"/>*/}
        </div>
    );
}

 function GameStateInputs({cfg, setCfg}) {
     return <div className={"GameStateInputs"}>
     <label htmlFor={"level"} className={"gameStateInput"}> Level</label>
        <input type={"number"} min={0} max={10} value={cfg.level}
               onChange={(e) => setCfg({...cfg, level: Number(e.target.value)})}/>
        <label htmlFor={"Gold"} className={"gameStateInput"}> Gold spent</label>
        <input type={"number"} min={0} value={cfg.gold}
               onChange={(e) => setCfg({...cfg, gold: Number(e.target.value)})}/>
    </div>
}

 function NameInputs({cfg, setCfg}) {
     const nameInputs = []
     for (let i = 1; i <= cfg.nTargets; i++) {
         nameInputs.push(<div key={"NameInput " + i} className={"NameInput"}>
             <input type="text" list="unit-name-list" onChange={(e) => handleNameUpdate(e, i, cfg, setCfg)}/>
             <datalist id="unit-name-list">
                 {allNames.map(name => <option key={name} value={name}></option>)}
             </datalist>
         </div>)
     }
     return <div className={"NameInputs"}>
        {nameInputs}
    </div>
}


function OobTargetInputs({cfg, setCfg}) {

        const targetNames = Object.keys(cfg.targetNameEnum)
        return <div className={"OobTargetInputs"}>
                {targetNames.map(name => ((name !== 'Null unit') &&
                    <div className={"OobTargetInput"}>
                        <label htmlFor={name}> How many {name} are out of the bag?</label>
                        <input id={name} min={0} type={"number"} value={cfg.oobTarget[name]}
                               onChange={(e) => handleOobTargetUpdate(e, name, cfg, setCfg)}/>
                    </div>))}

        </div>
}

function OobNonTargetInputs({cfg, setCfg}) {
    const costStrings = COSTS.map(cost => String(cost))
    return <div className={"OobNonTargetInputs"}>
        {costStrings.map(cost =>
                <div key={cost} className={"OobNonTargetInput"}>
                    <label htmlFor={cost}> {cost} costs?</label>
                    <input key={cost} min={0} type={"number"} value={cfg.oobNonTarget[cost]}
                           onChange={(e) => handleOobNonTargetUpdate(e, cost, cfg, setCfg)}/>
                </div>)}
    </div>

}