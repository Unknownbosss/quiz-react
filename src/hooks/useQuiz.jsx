import { shuffle } from "../utils/utilities";

export const useQuiz = (data, index) => {
  const questions = data;

  // check if its a new game
  if (index === 0) {
    if (questions.length > 2) {
      shuffle(questions);
    }
  }
  const question = questions[index];

  const answer = question?.realName;

  //get all questions that is not the current the question
  const option = questions.filter(({ realName }) => realName !== answer);

  //generate an array of the wrong answers and shuffle
  const opt = shuffle(option.map((opt) => opt.realName));

  const options = shuffle([...opt.slice(0, 3), answer]);

  return {
    question,
    answer,
    answerIndex: options.indexOf(answer),
    options,
  };
};
