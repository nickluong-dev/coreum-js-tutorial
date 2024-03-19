import getUserInput from "./getUserInput.js";

export default async function burnFT(issuerAddress, ft, FT, coreum, Feature) {
  const amount = await getUserInput(
    "Enter the amount of tokens you want to burn: "
  ).then((input) => input.trim());

  const subunit = await getUserInput("Enter the subunit: ").then((input) =>
    input.trim()
  );

  const denom = `${subunit}-${issuerAddress}`;
  const tokenDetails = await ft.token(denom);

  if (tokenDetails.include(Feature.burning)) {
    const burnMsg = FT.Burn({
      sender: issuerAddress,
      coin: {
        denom: denom,
        amount: amount,
      },
    });

    const burnBroadcastResponse = await coreum.sendTx([burnMsg]);
    console.log("burnBroadcastResponse: ", burnBroadcastResponse);
  } else {
    console.log("This token does not have burning enabled.");
  }
}
