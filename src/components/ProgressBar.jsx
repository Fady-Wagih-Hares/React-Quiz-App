const ProgressBar = ({
  currentQuestion,
  numQuestions,
  currentPoints,
  sumPointsOfQuestions,
  answer,
}) => {
  return (
    <header className="progress">
      {/* here is just an index not index + 1 */}
      <progress
        value={
          currentQuestion +
          // nice trick
          Number(answer !== null)
        }
        max={numQuestions}
      />

      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{currentPoints}</strong> / {sumPointsOfQuestions} points
      </p>
    </header>
  );
};
export default ProgressBar;
