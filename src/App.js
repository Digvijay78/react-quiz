import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader"
import Error from  "./component/Error";
import  StartScreen  from "./component/StartScreen";
import Question from "./component/Question";
import NextButton from "./component/NextButton";
import Progress from "./component/Progress";
import Finished from "./component/Finished";
import Footer from "./component/Footer";
import Timer from "./component/Timer";


const secs_per_question = 30;

const initialState = {
  questions: [],

  // 'loading', 'error' , 'ready', 'active', 'finished'
  status: "loading",
  index : 0,
  answer : null, 
  points : 0,
  highScore :0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return {...state, status: "error"}  
    
      case "active":
       return {...state, status : "active",
                secondsRemaining: state.questions.length * secs_per_question
      }

      case "newAns":
        const question = state.questions.at(state.index)

        return {...state,
           answer : action.payload,
           points : action.payload === question.correctOption ? state.points + question.points : state.points
           
          } 

       case "nextQuestion":
        return {...state, index: state.index + 1, answer: null }  
        
        case "finished":
          return {...state, status: "finished", highScore: state.points > state.highScore ? state.points : state.highScore }
       
        case "restart":
          return {...initialState,
          status: "ready",
          questions : state.questions,
          secondsRemaining : 10
          
          }  

          case  "tick":
            return {...state, secondsRemaining:  state.secondsRemaining-1,
                  status : state.secondsRemaining === 0 ? "finished" : state.status
            }
          
    default:
      throw new Error("error");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {questions, status , index , answer, points ,highScore, secondsRemaining} = state;

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points , 0 )

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
        {status === 'active' && 
        <>
        <Progress numQuestions={numQuestions} index={index}  maxPoints={maxPoints} points = {points} answer={answer} />
        <Question question ={questions[index]} dispatch = {dispatch} answer = {answer} /> 
        <Footer>
         <Timer dispatch ={dispatch} secondsRemaining={secondsRemaining} />
        <NextButton dispatch = {dispatch} answer = {answer} index ={index} numQuestions={numQuestions} />
        </Footer>
        </>
        }

        {status === 'finished' && <Finished points={points} maxPoints={maxPoints} highScore= {highScore} dispatch ={dispatch} /> }
      </Main>
    </div>
  );
}

export default App;
