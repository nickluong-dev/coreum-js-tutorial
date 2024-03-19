import { createInterface } from "readline";

export default async function getUserInput(prompt) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readline.question(prompt, (input) => {
      readline.close();
      resolve(input);
    });
  });
}
