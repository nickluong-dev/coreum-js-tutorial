import getUserInput from "./getUserInput.js";

// issue a fungible token
export default async function issueFt(issuerAddress, FT, coreum) {
  const symbol = await getUserInput("Enter the symbol of your token: ").then(
    (input) => input.trim()
  );

  const subunit = await getUserInput("Enter the subunit of your token: ").then(
    (input) => input.trim()
  );

  const displayText = `
  Enter all features you would like to enable as a string (eg. 134) or nothing to skip:
  0. Minting
  1. Burning
  2. Freezing
  3. Whitelisting
  4. IBC
  5. Block Smart Contracts
  `;

  const enabledFeatures = await getUserInput(displayText).then((input) =>
    input.trim().toLowerCase()
  );

  let features = enabledFeatures.split("").map(Number);

  const issueFtMsg = FT.Issue({
    issuer: issuerAddress,
    symbol: symbol,
    subunit: subunit,
    precision: "6",
    initialAmount: "100000000",
    description: "My first FT token",
    features: features,
  });

  // send transaction with msg and broadcast it
  const issueFtResponse = await coreum.sendTx([issueFtMsg]);
  console.log("issueFtResponse: ", issueFtResponse);
}
