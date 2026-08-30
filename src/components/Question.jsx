import Options from "./Options";
const Question = ({ question, onDispatch, answer }) => {
  // console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options questions={question} onDispatch={onDispatch} answer={answer} />
    </div>
  );
};
export default Question;
