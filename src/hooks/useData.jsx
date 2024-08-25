import React, { useEffect, useState } from "react";

function useData() {
  const [data, setData] = useState([
    {
      name: "Superman",
      realName: "Clarke Kent",
    },
    {
      name: "Batman",
      realName: "Bruce Wayne",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [questionLength, setQuestionLength] = useState(0);
  // useEffect(() => {
  //   const url = "https://spbooks.github.io/jsninja2/questions.json";
  //   setLoading(true);
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((quiz) => {
  //       setData(quiz.questions);
  // setQuestionLength(quiz.questions.length);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  return { data, loading, questionLength: data.length };
}

export default useData;
