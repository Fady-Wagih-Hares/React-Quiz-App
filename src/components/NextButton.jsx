const NextButton = ({
  onDispatch,
  answer,
  currentQuestionIndex,
  numQuestions,
}) => {
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
