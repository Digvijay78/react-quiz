import { useReducer } from "react";

function reducer(CurrState, action) {
  console.log(CurrState, action);

  switch (action.type) {
    case "dec":
      return { ...CurrState, count: CurrState.count - CurrState.step };

    case "inc":
      return { ...CurrState, count: CurrState.count + CurrState.step };

    case "setCount":
      return { ...CurrState, count: action.payload };

    case "setStep":
      return { ...CurrState, step: action.payload };

    case "reset":
      return { count: 0, step: 1 };

    default:
      throw new Error("unknow Error ");
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("march 31 2024");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
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
}
export default DateCounter;
