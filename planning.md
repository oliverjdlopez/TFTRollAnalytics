
# Today:
1. 

## Current Tasks:
2. Enforce constraints on input and backend
3. Edge case testing
3. testing for bugs
5. make testing structure however I want, and fill out all simple Tests to make sure that inputs are being filled correctly
   6. this should probably include interfaces/typing


## Current Goals: 
* Figure out why form inputs are not updating the config
* Figure out why inputs are not rerendering on change
* get chart to work with new rolldown



### Next todos:
## Higher priority:
1. Make sure that name updates don't violate invariants
2. no dupe inputs
3. valid inputs (level min/max, non-neg gold)
4. typing for things ()
3. unique key prop error in oobTargetIputs
3. Redoc after new changes (don't go crazy and waste your time)
4. Change inputs to sliders
5. testing library 

## Lower priority:
* remove "undefined" from unit
* benchspace required
* what's the deal with keys in the jsx?
* Change from buttons to sliders
* think about decision of when/whether to return sims, calc probs, etc
* rolldown functions that I think require updating:
* update docs 
  * resultsDict
  * all changes in Rolldown
  * Not sure if internal terminology with what I doc'd is consistent
* confirm conventions are consistent w/in the code

### For later:
#### Important:
* when to use new keyword?
* Display cdf vs pdf option
* decide on either encapsulating further or unrolling some subclasses in App (should be either/or not weird mix)
* Once hitting 9, cant roll that unit anymore (have to keep this mind when simulating internally)
* Avg gold remaining when hitting x copies of a unit
* Max unit option (e.g. if you only want a 2star copy of a unit, don't keep spending gold after seen enough copies)
* bench functionality? (if you already have x on bench, then use cdf after 9-x)
* Add in augment selector
* Add ability to stop once hitting enough, and see with what probabilities you might have certain amounts of gold left
#### Less important: 
* Add instruction paragraph at the top of page
* Describe how it works
* Organize/move buttons
* NonTarget -> Nontarget (?)
* look at effects/rendering or something
* casting from the string in the dictionary to number in RollSim.js?
* there has to be an easier way to do the "filled" check for the UserInputs
* seeing 10 units edge case (i.e. 2 in shop when 8 on board, which I think is possible but idk)
* what is the deal with the not assignable from string to number parameter in app.js
* look at variance between number of sims so that results are consistent but not slow