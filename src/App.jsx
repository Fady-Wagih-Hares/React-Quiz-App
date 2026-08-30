// import DateCounter from "./components/DateCounter";

import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
// import { SECS_PER_QUESTION } from "./config/";
import { SECS_PER_QUESTION } from "./config/config.js";

const initialState = {
  questions: [],
  // 'loading' ,'error' , 'ready' , 'active' , 'finished'
  status: "loading",
  // changing the questions  => Next | Previous
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null,
};
const reducer = function (state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        // the data that will be received from the fake API
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const currentQuestion = state.questions.at(state.currentQuestionIndex);

      return {
        ...state,
        answer: action.payload,
        points:
          // it is better to do that logic in the useReducer
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      // return {
      //   ...state,

      //   status: "ready",
      //   currentQuestionIndex: 0,
      //   answer: null,
      //   points: 0,
      // };
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,

        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Is Unknown");
  }
};
const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // nest destructured
  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      points,
      highScore,
      secondRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // derived state
  const numQuestions = questions.length;
  useEffect(function () {
    const controller = new AbortController();
    async function fetchQuestion() {
      try {
        const result = await fetch("http://localhost:8000/questions", {
          signal: controller.signal,
        });
        const data = await result.json();
        // we can think it as an event
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestion();
    return function () {
      controller.abort();
    };
  }, []);

  // const sumPointsOfQuestions = questions
  //   .map((element) => element.points)
  //   .reduce((acc, cur) => acc + cur, 0);
  const sumPointsOfQuestions = questions.reduce(
    (acc, cur) => acc + cur.points,
    0,
  );
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {/*  Mutually exclusive conditions  */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} onDispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              currentQuestion={currentQuestionIndex}
              currentPoints={points}
              sumPointsOfQuestions={sumPointsOfQuestions}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[currentQuestionIndex]}
              onDispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer onDispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                onDispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                currentQuestionIndex={currentQuestionIndex}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={sumPointsOfQuestions}
            highScore={highScore}
            onDispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};
export default App;
