import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader"
import Error from  "./component/Error";
import  StartScreen  from "./component/StartScreen";
import Question from "./component/Question";

const initialState = {
  questions: [],

  // 'loading', 'error' , 'ready', 'active', 'finished'
  status: "loading",
  index : 0,
  answer : null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return {...state, status: "error"}  
    
      case "active":
       return {...state, status : "active" }

      case "newAns":
        return {...state, answer : action.payload } 
    default:
      throw new Error("error");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {questions, status , index , answer} = state;

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({type: "dataFailed"}));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader /> }
        {status === 'error' && <Error /> }
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} /> }
        {status === 'active' && <Question question ={questions[index]} dispatch = {dispatch} answer = {answer} /> }
      </Main>
    </div>
  );
}

export default App;
