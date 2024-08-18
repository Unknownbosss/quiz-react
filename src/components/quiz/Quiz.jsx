import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import { useQuiz } from "../../hooks/useQuiz";
import useData from "../../hooks/useData";
import logo from "../../assets/logo.jpg";
function Quiz() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState({});
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("highScore")) || 0
  );
  const [result, setResult] = useState(false);

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

  const handleNext = () => {
    if (lock) {
      if (index + 1 === questionLength) {
        setResult(true);
        saveHIghScore();
        return;
      }
      setIndex((prev) => prev + 1);
      setLock(false);
      options_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const handleReset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  if (!question)
    return (
      <div
        className="loading-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="loading"
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            animation: "pulse 2s infinite",
          }}
        />
        <style>
          {`
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  `}
        </style>
      </div>
    );
  return (
    <div className="container">
      <div className="title">
        <h1>Quiz App</h1>
        <h2>HighScore: {highScore}</h2>
      </div>
      <hr />
      {result ? (
        <></>
      ) : (
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
          <button onClick={handleNext}>Next</button>
          <div className="index">
            {index + 1} of {questionLength} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You scored {score} out of {questionLength}
          </h2>
          <button onClick={handleReset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Quiz;
