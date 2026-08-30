import { useReducer } from "react";

const DateCounter = () => {
  // useReducer hook=> mangeing states but in complex way
  // const [count, setCount] = useState(0);

  const initialState = { count: 0, step: 1 };
  const reducer = (state, action) => {
    console.log(state, action);
    // return state + action;
    // very common to use switch into reducer function
    switch (action.type) {
      case "dec":
        return { ...state, count: state.count - state.step };
      case "inc":
        return { ...state, count: state.count + state.step };
      case "setCount":
        return { ...state, count: action.payload };
      case "setStep":
        return { ...state, step: action.payload };
      case "reset":
        return initialState;
      default:
        throw new Error("Unknown Action");
    }
    // if (action.type === "inc") return state + action.payload;

    // if (action.type === "dec") return state - action.payload;

    // if (action.type === "setCount") return action.payload;
    // return { count: 0, step: 1 };
  };
  // useReducer(reducer pure function => it takes previous state as argument  it so-called action and then return the next state , initial state) | we use it when we have some complex state to manage not just one single value the state has to be an object
  // dispatch => like the normal state that is a function that update the state but it work in a different way

  // const [count, dispatch] = useReducer(reducer, 0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // dispatching an action
    // passing object it called an action (type - payload) => is a standard in useReducer hook and the same thing in redux
    dispatch({ type: "dec", payload: 1 });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc", payload: 1 });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
export default DateCounter;
