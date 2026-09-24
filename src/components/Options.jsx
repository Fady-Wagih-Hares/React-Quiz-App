import { useQuizContext } from "../contexts/QuizContext";

const Options = ({ question }) =>
  // { questions, onDispatch, answer }

  {
    // console.log(questions);
    // const { options: option } = options;
    const { dispatch: onDispatch, answer } = useQuizContext();

    const hasAnswered = answer !== null;
    // console.log(questions);
    // if (questions.options === undefined) return;
    return (
      <div className="options">
        {question.options.map((option, answerIndex) => (
          <button
            value={answer}
            className={`btn btn-option ${answerIndex === answer ? "answer" : ""}
          
          ${
            hasAnswered
              ? answerIndex === question?.correctOption
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
