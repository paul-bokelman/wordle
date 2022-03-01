import axios from "axios";

const url = "http://localhost:8080";

const getWords = async () => {
  const { data: response } = await axios.get(`${url}/words`);
  console.log(response);
  return response;
};

const getRandomWord = async ({ length }: { length: number }) => {
  const { data: response } = await axios.get(`${url}/word/random`, {
    params: {
      length,
    },
  });
  console.log(response);
  return response;
};

const addWord = async ({ word }: { word: string }) => {
  const { data: response } = await axios.post(`${url}/word/add`, { word });
  console.log(response);
  return response;
};

export const db = {
  getWords,
  getRandomWord,
  addWord,
};
