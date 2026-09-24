import { useQuizContext } from "../contexts/QuizContext";

const NextButton = () =>
  //   {
  //   onDispatch,
  //   answer,
  //   currentQuestionIndex,
  //   numQuestions,
  // }
  {
    const {
      dispatch: onDispatch,
      answer,
      currentQuestionIndex,
      numQuestions,
    } = useQuizContext();
    if (answer === null) return null;
    if (currentQuestionIndex < numQuestions - 1)
      return (
        <button
          className="btn btn-ui"
          onClick={() => onDispatch({ type: "nextQuestion" })}>
          Next
        </button>
      );
    if (currentQuestionIndex === numQuestions - 1)
      return (
        <button
          className="btn btn-ui"
          onClick={() => onDispatch({ type: "finish" })}>
          Finish
        </button>
      );
  };
export default NextButton;
