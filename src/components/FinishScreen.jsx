import { useQuizContext } from "../contexts/QuizContext";

const FinishScreen = () =>
  // { points, maxPossiblePoints, highScore, onDispatch }

  {
    const {
      sumPointsOfQuestions: maxPossiblePoints,
      highScore,
      dispatch: onDispatch,
      points,
    } = useQuizContext();

    const percentage = (points / maxPossiblePoints) * 100;
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "😁";
    if (percentage >= 0 && percentage < 50) emoji = "🤔";
    if (percentage === 0) emoji = "🤦";
    return (
      <>
        <p className="result">
          <span>{emoji}</span> You Scored <strong>{points}</strong> Out Of{" "}
          {maxPossiblePoints} ( {Math.ceil(percentage)} %)
        </p>
        <p className="highscore">(HighScore: {highScore} points)</p>
        <button
          className="btn btn-ui"
          onClick={() => onDispatch({ type: "restart" })}>
          Restart Quiz
        </button>
      </>
    );
  };
export default FinishScreen;
