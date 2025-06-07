import './App.css';
import { Fragment, useState } from "react";
import RolldownSim from "./RolldownSim";
import TheStats from "./TheStats.tsx";

import {
    handleNameUpdate, handleOobTargetUpdate, handleSimulate, handleClear,
    handleAddTarget, handleOobNonTargetUpdate, handleProbTypeUpdate, handleNSimsUpdate
} from "./conditionalApp/conditionalHandlers.js";
import { allNames, bagSize, COSTS, nameToCost, poolSize } from "./utilsSet14.js";
import RolldownSimSimpleTests from "./RolldownSimSimpleTests";
import AppSimpleTests from "./AppSimpleTests";
import Dropdown from "react-bootstrap/Dropdown"
import ConditionalApp from './conditionalApp/ConditionalApp.js';
import UnitApp from './unitApp/UnitApp.js';
// For error handling: 1) input name not in dictionary 2) only re-render/run when button is hit 3) both oob are within range
// 4) indexing for arrays consistent/correct

const maxUnits = 3
const nSims = 100000
const targetNames = ['Null unit']//targetNames.i is user's i-th desired unit.
const oobNonTarget = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 } // oobNonTarget.cost is number of nonTargets costs are out of the pool
const oobTarget = { 'Null unit': 0 } // oobTarget.name is the number of target unit that is out of the pool
const useCumProbs = false;


const initCfg = {
    level: 6, gold: 20, nTargets: 3, nSims: nSims, targetNames: targetNames,
    useCumProbs: useCumProbs, oobNonTarget: oobNonTarget, oobTarget: oobTarget
}

//RolldownSimSimpleTests()
//AppSimpleTests()
//ChartSimpleTests()


export default function App() {
    const [mode, setMode] = useState("unit") // "unit" or "condition"




    // ...existing code...
    // ...existing code...
    return (
        <div className="App">
            <header> TFT roll simulator</header>
            {/* Mode selector */}
            <div style={{ margin: "16px 0" }}>
                <label>
                    Select functionality:&nbsp;
                    <select value={mode} onChange={e => setMode(e.target.value)}>
                        <option value="unit">Units seen</option>
                        <option value="conditional">Conditions satisfied</option>
                    </select>
                </label>
            </div>
            {/* Conditional rendering */}
            {mode === "unit" ? (
                <UnitApp/>
            ) : (
                <ConditionalApp/>
            )}
        </div>
    );
    // ...existing code...


}