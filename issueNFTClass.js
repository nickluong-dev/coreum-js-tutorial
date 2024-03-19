import { ClassFeature } from "coreum-js";
import getUserInput from "./getUserInput.js";

export default async function issueNFTClass(issuerAddress, coreum, NFT) {
  const description = await getUserInput(
    "Enter the description of your NFT Class: "
  );
  const className = await getUserInput("Enter the name of the NFT Class: ");
  const classSymbol = await getUserInput("Enter the class symbol: ");

  const displayText = `
  Enter all features you would like to enable as a string (eg. 134) or nothing to skip:
  0. Burning
  1. Freezing
  2. Whitelisting
  3. Disable Sending
  `;

  const enabledFeatures = await getUserInput(displayText).then((input) =>
    input.trim().toLowerCase()
  );

  let features = enabledFeatures.split("").map(Number);

  // create nft class object
  const NFTClass = {
    issuer: issuerAddress,
    name: className,
    symbol: classSymbol,
    description: description,
    uri: "",
    uri_hash: "",
    royaltyRate: "0",
    features: features,
  };

  const NFTClassMsg = NFT.IssueClass(NFTClass);

  const classCreateRes = await coreum.sendTx([NFTClassMsg]);

  console.log("classCreateRes", classCreateRes);
}
