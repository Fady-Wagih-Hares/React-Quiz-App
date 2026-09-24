import { useQuizContext } from "../contexts/QuizContext";

const StartScreen = () =>
  // { numQuestions, onDispatch }
  {
    const { dispatch: onDispatch, numQuestions } = useQuizContext();
    const handleDispatching = () => {
      onDispatch({ type: "start" });
    };
    return (
      <div className="start">
        <h2>Welcome To The React Quiz!</h2>
        <h3>{numQuestions} Questions To Test Your React Mastery!</h3>
        <button className="btn btn-ui" onClick={handleDispatching}>
          Let 's Start
        </button>
      </div>
    );
  };
export default StartScreen;
