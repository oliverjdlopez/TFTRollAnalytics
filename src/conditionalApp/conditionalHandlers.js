import RolldownSim from "../RolldownSim.js";
import {allNames} from "../utilsSet14.js";

export function handleNameUpdate(e, cfg, setCfg){
    const name = e.target.value
    const isUnitName = (allNames.includes(name))
    const isNewName = !(cfg.targetNames.includes(name))
    if (isUnitName && isNewName) { //only accept valid names that aren't already inputs
        cfg.targetNames.push(name)
        setCfg({...cfg, targetNames: cfg.targetNames})
    }

}

export function handleAddTarget(cfg, setCfg){
    setCfg({...cfg, nTargets: (cfg.nTargets+1) })
}
export function handleSimulate(cfg, conditions, setResults, setSim){
    console.log(cfg)
    let sim = new RolldownSim(cfg, conditions)
    sim.runAllSims()
    setSim(sim)
    setResults(sim.getResults())
}

export function handleNSimsUpdate(e, cfg, setCfg) {
    console.log(e.target.value)
        setCfg({...cfg, nSims: Number(e.target.value)}) //invert value on checkbox change
}

export function handleClear(initCfg, setCfg, setResults){
    setCfg(initCfg)
    setResults({})
}

export function handleProbTypeUpdate(cfg, sim, setCfg, setResults) {
    setCfg({...cfg, useCumProbs: !cfg.useCumProbs}) //invert value on checkbox change
}
export function handleOobTargetUpdate(e, name, cfg, setCfg) {
    const newOobTarget = {...cfg.oobTarget, [name]: Number(e.target.value)}
    setCfg({...cfg, oobTarget: newOobTarget})
}

export function handleOobNonTargetUpdate(e, cost, cfg, setCfg){
    const newOobNonTarget = {...cfg.oobNonTarget, [cost]: Number(e.target.value)}
    setCfg({...cfg, oobNonTarget: newOobNonTarget})
}
