import { useQuizContext } from "../contexts/QuizContext";
import Options from "./Options";
const Question = () =>
  // { question, onDispatch, answer }

  {
    // console.log(question);
    const { currentQuestionIndex, questions } = useQuizContext();
    const question = questions.at(currentQuestionIndex);
    return (
      <div>
        <h4>{question.question}</h4>
        <Options
          question={question}
          // onDispatch={onDispatch} answer={answer}
        />
      </div>
    );
  };
export default Question;
