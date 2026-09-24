import { createContext, useContext, useEffect, useReducer } from "react";

import { SECS_PER_QUESTION } from "./../config/config";
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
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "tick": //   secondRemaining: state.secondRemaining - 1, //   ...state, // return {

    //   status: state.secondRemaining === 0 ? "finished" : state.status,
    // };
    {
      // handle highScore after the time is gone
      const isFinished = state.secondRemaining === 1; // 1 -> 0 finishes
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: isFinished ? "finished" : state.status,
        highScore: isFinished
          ? Math.max(state.points, state.highScore)
          : state.highScore,
      };
    }
    default:
      throw new Error("Action Is Unknown");
  }
};
const QuizContext = createContext();
const QuizProvider = ({ children }) => {
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
  const KEY = import.meta.env.VITE_API_KEY_Quiz_App;
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchQuestion() {
        try {
          const result = await fetch(`https://api.jsonbin.io/v3/b/${KEY}`, {
            signal: controller.signal,
          });
          const data = await result.json();
          // we can think it as an event
          dispatch({ type: "dataReceived", payload: data.record.questions });
        } catch (error) {
          console.error(error);
          dispatch({ type: "dataFailed" });
        }
      }
      fetchQuestion();
      return function () {
        controller.abort();
      };
    },
    [KEY],
  );
  const numQuestions = questions.length;
  const sumPointsOfQuestions = questions.reduce(
    (acc, cur) => acc + cur.points,
    0,
  );
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        currentQuestionIndex,
        answer,
        points,
        highScore,
        secondRemaining,
        numQuestions,
        sumPointsOfQuestions,
        dispatch,
      }}>
      {children}
    </QuizContext.Provider>
  );
};

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext Is Used Outside Of The QuizProvider");
  return context;
}

export { useQuizContext, QuizProvider };
