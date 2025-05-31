import RolldownSim from "./RolldownSim";
import {allNames} from "./utilsSet14.js";

export function handleNameUpdate(e, i, cfg, setCfg){
    const isUnitName = (allNames.includes(e.target.value))
    const isNewName = !(Object.keys(cfg.targetNameEnum).includes(e.target.value))
    const newEnum = {}
    if (isUnitName && isNewName) { //only accept valid names that aren't already inputs
        newEnum[e.target.value] = i
        cfg.oobTarget[e.target.value] = 0;
    }
        for (const [name, num] of Object.entries(cfg.targetNameEnum)) {
            if (num !== i) {// keep all other inputs the same
                newEnum[name] = num
            }
        }
        setCfg({...cfg, targetNameEnum: newEnum})

}

export function handleAddTarget(cfg, setCfg){
    setCfg({...cfg, nTargets: (cfg.nTargets+1) })
}
export function handleSimulate(cfg, setResults, setSim){
    console.log(cfg)
    let sim = new RolldownSim(cfg)
    sim.runAllSims()
    setSim(sim)
    setResults(sim.getResults())
}

export function handleNSimsUpdate(e, cfg, setCfg) {
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
