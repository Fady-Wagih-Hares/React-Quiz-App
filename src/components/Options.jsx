const Options = ({ questions, onDispatch, answer }) => {
  // console.log(questions);
  // const { options: option } = options;
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questions.options.map((option, answerIndex) => (
        <button
          value={answer}
          className={`btn btn-option ${answerIndex === answer ? "answer" : ""}
          
          ${
            hasAnswered
              ? answerIndex === questions?.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() =>
            onDispatch({ type: "newAnswer", payload: answerIndex })
          }>
          {option}
        </button>
      ))}
    </div>
  );
};
export default Options;
