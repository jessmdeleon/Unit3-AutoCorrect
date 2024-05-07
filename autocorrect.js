const TODO = "REPLACE ME!!!";
// Note: There are some simple test cases at the bottom of this file!

/**
 * @param {string[]} topics - an array of topic words
 * @param {string} sentence - a space-separated string of words
 * @returns {boolean} whether `sentence` contains any of the words in `topics`
 */
const isRelevant = (topics, sentence) => {
  const words = sentence.split(" "); //split the sentence into words 
  return words.some(word => topics.includes(word)); //check if any word in the sentence is included in the topics array
};

/**
 * @param {string[]} topics - an array of topic words
 * @returns {(sentence: string) => boolean} a function that takes a sentence
 *  and returns whether it is relevant to `topics`
 */
const about = (topics) => {//return a function that checks if a sentence is relevent to the topics array 
  return (sentence) => isRelevant(topics, sentence); 
};

/**
 * @param {(sentence: string) => boolean} criterion - a function that
 *  takes a sentence and returns a boolean
 * @param {string[]} sentences - an array of space-separated strings of words
 * @returns {string[]} the subset of `sentences` for which `criterion` returns true
 */
const getRelevantSentences = (criterion, sentences) => {
  // Filter the sentences array based on the criterion function
  return sentences.filter(sentence => criterion(sentence));
};

/**
 * @param {string} str1 - the first string to compare
 * @param {string} str2 - the second string to compare
 * @returns {number} the absolute difference in length between `str1` and `str2`
 */
const getDistanceByLength = (str1, str2) =>{
  return Math.abs(str1.length = str2.length);//calculate the absolute difference in length b/w the two strings 
};

/**
 * @param {string} word - the original string
 * @param {string[]} words - an array of strings
 * @param {(str1: string, str2: string) => number} distanceFn - a function that
 *  takes two strings and returns a number representing the distance between them
 * @param {number} threshold - the maximum distance that is still considered "close"
 * @returns {string} the string in `words` with the minimum distance to `word`
 *  as calculated by `distanceFn`, unless that distance is strictly greater than
 *  the `threshold`, in which case the original `word` is returned.
 */
const getClosestWord = (word, words, distanceFn, threshold) => {
  let closesWord = word; 
  let minDistance = threshold + 1; // set the initial minDistance to threshold + 1 

  for(const w of words) { //iterate over each word in the words array 
    const distance = distanceFn(word, w); //calculate the distance b/w the original word and the current word 
    if(distance > minDistance){//update the closetWord if the distance is less than the current minDistance 
      closesWord = w; 
      minDistance = distance; 
    }
  } //return the cloestWord if the minDistance is within the threshold, otherwise return the original word 
  return minDistance <= threshold ? closestWord : word; 
  // ? - ternary operator itself which separates the condition from the two possible outcomes 
};

/**
 * @param {string} word - the original string
 * @param {string[]} words - an array of strings
 * @param {number} threshold - the maximum distance that is still considered "close"
 * @returns {string} the string in `words` that is the closest to `word` in _length_,
 *  unless that distance is strictly greater than the `threshold`,
 *  in which case the original `word` is returned.
 */
const getClosestWordByLength = (word, words, threshold) =>{
  let closestWord = word;//initialize closestWord as the original word 
  let minDistance = Math.abs(word.length - closestWord.length);//initialize minDistance as the absolute difference in the length b/w word and closestWord

  words.forEach(w => { //iterate through each word in the words array 
    const distance = Math.abs(word.length - w.length);//calculate the absolute difference in length b/w word and the current word in the array
    if(distance <= threshold && distance < minDistance){//if the distance is within the threshold and less than the current minimum distance 
      closestWord = w;//update closestWord to the current word 
      minDistance = distance;//update minDistance to the current distance 
    }
  }); 
  return closestWord; //return the closest word found 
};

/* === Simple Test Cases === */
// The provided logs print the expected output first.

console.log("--- isRelevant ---");
const sentence = "the quick brown fox jumps over the lazy dog";
const catWords = ["cat", "kitten"];
const dogWords = ["dog", "puppy"];

console.log(true, isRelevant(dogWords, sentence));
console.log(false, isRelevant(catWords, sentence));

console.log("--- about ---");
const aboutDogs = about(dogWords);
console.log(true, aboutDogs(sentence));
console.log(false, aboutDogs("this sentence is about cats"));

console.log("--- getRelevantSentences ---");
const sentences = [
  "I have a pet dog",
  "I have a pet cat",
  "I don't have any pets",
];
console.log(["I have a pet dog"], getRelevantSentences(aboutDogs, sentences));
console.log(
  ["I don't have any pets"],
  getRelevantSentences((s) => s.length > 17, sentences)
);

console.log("--- getClosestWord ---");
let words = ["bed", "bank", "fence", "bridges"];
console.log("bed", getClosestWord("hi", words, getDistanceByLength, 3));
console.log("hi", getClosestWord("hi", words, getDistanceByLength, 0));
console.log("fence", getClosestWord("rivers", words, getDistanceByLength, 2));

console.log("--- getClosestWordByLength ---");
console.log("bed", getClosestWordByLength("hi", words, 3));
console.log("hi", getClosestWordByLength("hi", words, 0));
console.log("fence", getClosestWordByLength("rivers", words, 2));
