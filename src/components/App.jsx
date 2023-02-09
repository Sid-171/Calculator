import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

function reducer(state, {type , payload}) {
    switch(type) {
        case action.add_digit:
            if(state.overwrite){
                return{
                    ...state,
                    firstOutput: payload.digit,
                    overwrite: false,
                }
            }
            if(payload.digit === "0" && state.firstOutput === "0"){ return state}
            if(payload.digit === "." && state.firstOutput.includes(".")) {
               return state
            }
            return {
                ...state,
                firstOutput : `${state.firstOutput || ""}${payload.digit}`,
    }
    case action.select_operation:
        if(state.firstOutput == null && state.lastOutput == null){
            return state
        }
        if(state.firstOutput == null){
            return{
                ...state,
                operation: payload.operation,
            }
        }
        if(state.lastOutput == null){
            return{
                ...state,
                operation: payload.operation,
                lastOutput: state.firstOutput,
                firstOutput: null,
            }
        }   
        return{
            ...state,
            lastOutput: evaluate(state),
            operation: payload.operation,
            firstOutput:null
        }
    case action.remove:
        return {}
   
    case action.delete:
        if(state.overwrite){
            return{
                ...state,
                overwrite: false,
                firstOutput: null,
            }
        }
        if(state.firstOutput == null) return state
        if(state.firstOutput.length === 1){
            return{
                ...state,
                firstOutput:null
            }
           
        }
        return{
            ...state,
            firstOutput:state.firstOutput.slice(0, -1)   
        }
    case action.solve:
        if(state.operation == null || state.firstOutput == null || state.lastOutput == null){
            return state
        }
        return{
            ...state,
            overwrite:true,
            lastOutput: null,
            operation:null,
            firstOutput: evaluate(state),
        }
}
}

function evaluate ({firstOutput, lastOutput, operation}){
   const previous = parseFloat(lastOutput)
   const current = parseFloat(firstOutput)
   if(isNaN(previous) || isNaN(current)) return ""
   let com = ""
   switch (operation){
    case "+":
        com = previous + current
        break
    case "-":
        com = previous - current
        break
    case "*":
        com = previous * current
        break 
    case "÷":
        com = previous / current
        break
    }
    return com.toString()
}


export const action = {
    add_digit : 'add-digit',
    select_operation : 'select-operation',
    delete : 'delete',
    remove: 'clear',
    solve: 'solve'
};



const App = () =>{

    const [{firstOutput, lastOutput, operation}, dispatch] = useReducer(reducer , {});

    
    return(
        <div className="calculator">
           <div className="output">
              <div className="lastOutput">{lastOutput} {operation}</div>
              <div className="firstOutput">{firstOutput}</div>
           </div>
            <button className="splitTwo" onClick={() => dispatch({type: action.remove})}>AC</button>
            <button onClick={() => dispatch({type: action.delete})}>DEL</button>
            <OperationButton operation="÷" dispatch={dispatch}/>
            <DigitButton digit="1" dispatch={dispatch}></DigitButton>
            <DigitButton digit="2" dispatch={dispatch}></DigitButton>
            <DigitButton digit="3" dispatch={dispatch}></DigitButton>
            <OperationButton operation="*" dispatch={dispatch}/>
            <DigitButton digit="4" dispatch={dispatch}></DigitButton>
            <DigitButton digit="5" dispatch={dispatch}></DigitButton>
            <DigitButton digit="6" dispatch={dispatch}></DigitButton>
            <OperationButton operation="+" dispatch={dispatch}/>
            <DigitButton digit="7" dispatch={dispatch}></DigitButton>
            <DigitButton digit="8" dispatch={dispatch}></DigitButton>
            <DigitButton digit="9" dispatch={dispatch}></DigitButton>
            <OperationButton operation="-" dispatch={dispatch}/>
            <OperationButton operation="." dispatch={dispatch}/>
            <DigitButton digit="0" dispatch={dispatch}></DigitButton>
            <button className="splitTwo" onClick={() => dispatch({type: action.solve})}>=</button>  
        </div>     
    );
}

export default App;