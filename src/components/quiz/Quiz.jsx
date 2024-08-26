import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import { useQuiz } from "../../hooks/useQuiz";
import useData from "../../hooks/useData";
import Loading from "../Loading";
function Quiz() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [questions, setQuestions] = useState({});
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [newGame, setNewGame] = useState(true);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("highScore")) || 0
  );

  const gameFinished = useRef(false);
  let intervalID;

  useEffect(() => {
    if (isPlaying) {
      intervalID = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      if (timer < 0) {
        handleReset();
      }
    }

    return () => clearInterval(intervalID);
  }, [timer, isPlaying]);

  const { loading, questionLength, data } = useData();

  const { question, answer, answerIndex, options } = questions;
  useEffect(() => {
    const quiz = useQuiz(data, index);
    setQuestions(quiz);
  }, [index, loading]);

  const opt1 = useRef(null);
  const opt2 = useRef(null);
  const opt3 = useRef(null);
  const opt4 = useRef(null);
  const options_array = [opt1, opt2, opt3, opt4];

  const saveHIghScore = () => {
    if (score > highScore || highScore === 0) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  };

  const checkAns = (e) => {
    if (!lock) {
      if (answer === e.target.textContent) {
        e.target.classList.add("correct");
        setScore((prev) => setScore(prev + 1));
      } else {
        e.target.classList.add("wrong");
        options_array[answerIndex].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const resetOption = () => {
    options_array.map((option) => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
      return null;
    });
  };

  const handleNext = () => {
    if (lock) {
      if (index + 1 === questionLength) {
        saveHIghScore();
        gameFinished.current = true;
        handleReset();
        return;
      }
      setIndex((prev) => prev + 1);
      setLock(false);
      resetOption();
    }
  };

  const reset = () => {
    setIsPlaying(!isPlaying);
    setNewGame(false);
    setTimer(30);
    setIndex(0);
    saveHIghScore();
    setLock(false);
    if (!options_array) resetOption();
    gameFinished.current = false;
  };

  const handleReset = (type) => {
    if (type === "new") {
      setScore(0);
      reset();
    } else {
      reset();
    }
  };

  if (!question) return <Loading />;
  return (
    <div className="container">
      <div className="title">
        <h1>Quiz App</h1>
        {isPlaying ? <h2>{timer}</h2> : <h2>HighScore: {highScore}</h2>}
      </div>
      <hr />

      {isPlaying ? (
        <>
          <h2>
            {index + 1}. What is {question?.name}'s real name
          </h2>
          <ul>
            {options?.map((option, i) => (
              <li key={i} onClick={(e) => checkAns(e)} ref={options_array[i]}>
                {option}
              </li>
            ))}
          </ul>
          <div className="button-container">
            <button onClick={() => handleReset("new")}>Give Up</button>
            <button onClick={handleNext}>Next</button>
          </div>
          <div className="index">
            {index + 1} of {questionLength} questions
          </div>
        </>
      ) : (
        <>
          {newGame ? (
            <h2>You have {timer}s</h2>
          ) : (
            <h2>
              You scored {score} out of {questionLength}{" "}
            </h2>
          )}
          {newGame ? (
            <button
              onClick={() => {
                handleReset("old");
              }}
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => {
                handleReset("new");
              }}
            >
              Play Again
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
