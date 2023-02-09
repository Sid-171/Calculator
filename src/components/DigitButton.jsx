import {action} from "./App"; 

export default function DigitButton({dispatch, digit}){
    return (
    <button onClick={() => dispatch({type : action.add_digit, payload : {digit}})}>
    {digit}
    </button>
    );
}