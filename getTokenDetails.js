import getUserInput from "./getUserInput.js";

export default async function getTokenDetails(issuerAddress, ft) {
  const subunit = await getUserInput("Enter the subunit of your token: ").then(
    (input) => input.trim()
  );

  const denom = `${subunit}-${issuerAddress}`;
  const details = await ft.token(denom);

  console.log(`tokenDetails: `, details);
}
