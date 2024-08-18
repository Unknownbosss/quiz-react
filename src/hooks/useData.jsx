import React, { useEffect, useState } from "react";

function useData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionLength, setQuestionLength] = useState(0);
  useEffect(() => {
    const url = "https://spbooks.github.io/jsninja2/questions.json";
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((quiz) => {
        setData(quiz.questions);
        setQuestionLength(quiz.questions.length);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, questionLength };
}

export default useData;
