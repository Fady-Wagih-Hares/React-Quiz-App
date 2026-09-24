import { useEffect } from "react";
import { useQuizContext } from "../contexts/QuizContext";

const Timer = () =>
  // { onDispatch, secondRemaining }

  {
    const { dispatch: onDispatch, secondRemaining } = useQuizContext();
    // the effect run twice in development phase it would not happen in  production
    const mins = Math.floor(secondRemaining / 60);
    const seconds = secondRemaining % 60;
    useEffect(
      function () {
        // every setInterval will return a unique id
        const id = setInterval(function () {
          //   console.log("tick");
          onDispatch({ type: "tick" });
        }, 1000);
        //   clean function it will be run between all rerenders
        return () => {
          clearInterval(id);
        };
      },

      [onDispatch],
    );

    return (
      <div className="timer">
        {mins <= 10 && 0}
        {mins} : {seconds <= 10 && 0}
        {seconds}
      </div>
    );
  };
export default Timer;
