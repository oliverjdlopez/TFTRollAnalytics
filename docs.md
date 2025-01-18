# DOCS OUT OF DATE CURRENTLY
# Terminology

- bag
  - The collection of units within a game state that are still available to appear in shops
- target
  - A unit that the user wants to buy
- cost
  - How much gold a unit costs
- pool
  - The collection of units of a particular cost across the entire game (e.g. the "3-cost pool"). 
- slot
  - One of 5 in any given shop, each independently assigned a unit cost with probability according to player level


# App.js
- App contains some base jsx for text and cfg inputs, and then 5 subcomponents:
  1. NameInputs
  2. BagInputs
  3. Buttons
  4. TheChart
  5. TheStats
- Main state stored in config 


# RolldownSim.js

- Class for rolldown call
    - each object instantiated on hitting Simulate button

- Constructor 
  - accepts config dict as argument 
  - Check if inputs are valid (not implemented)
  - Sets attributes from config for: 
    1. _level_: Level of rolldown
    2. _nUnits_ : How many different units the user wants to roll for
    3. _gold_:  How much gold the user can roll
    4. _nSims:_: Number of rolldowns to sim
    5. _unitNames_: Array with the names of the target units 
    6. _oobCost_: array where i-th entry is how many units of the same cost as unitNames[i] are out of the pool, not including copies of unitNames[i] 
    7. _oobUnit_: array where i-th entry is how many copies of unitNames[i] are out of the pool
  - uses utils and methods to initialize:
    1. _unitCosts_: array where i-th entry is cost of cfg.unitNames[i]
    2. _odds_: array of percents (as ints) of rolling a particular cost in shop
    3. _nTargetsLeft_: Array where i-th entry is how many copies of unitNames[i] are remaining in the pool
    4. _shopBuffer_: Array of arrays precalculated where shopBuffer[i][j] is the cost of the j-th card in the i-th shop
  - Finally, simulates rolldown nSims times. Stores the results in _this.sims_, and resulting probabilities in _this.probs_
    1. _sims_: array of length nSims. The i-th entry is a dictionary where the key is a targetName and the value is the number representing 
    how many times the corresponding unit was see on the i-th rolldown


# Helper files

### TheChart.tsx
 - Make full docs later, but tldr: basic chart 

### TheStats.tsx
- Undeveloped right now, tldr: numbers and text that user can filter / implement logic on 
### utils.js
- Exports tft/set/patch specific information like level odds, unit costs, etc.
  1. odds for rolling card of given cost at each level
  2. maps names to costs
  3. bag sizes, number of units within a cost
- provides functions for accessing above as well  without having to worry about 0indexing or anything else
  1. _levelOdds_: level: int -> array with shop odds for level 
  2. _bagSize_: cost: int -> number of copies of a given unit of corresponding cost are in the game
  3. _nUniqueCost_: cost: int -> number of unique units of corresponding cost
  4. _ poolSize_: cost: int -> how many copies of all units of corresponding cost are in the game
  5. _nameToCost_: name: str -> cost of unit with corresponding name

### handlers.js
- handle state updates and anything else on App side of things

