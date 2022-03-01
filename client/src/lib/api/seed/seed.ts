// @ts-ignore
const axios = require("axios");
const { words } = require("./seedWords");

const url = "http://localhost:8080";

const addWord = async ({ word }: { word: string }) => {
  const { data: response } = await axios.post(`${url}/word/add`, {
    word,
    wordLength: word.length,
  });
  console.log(response);
  return response;
};

const seed = async () => {
  console.log("Seeding database...");
  for (let i = 0; i < words.length; i++) {
    await addWord({ word: words[i] });
  }
  return;
};

seed();
