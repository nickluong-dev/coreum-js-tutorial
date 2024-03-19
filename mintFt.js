import getUserInput from "./getUserInput.js";

export default async function mintFT(issuerAddress, FT, coreum) {
  const amount = await getUserInput(
    "Enter the amount of tokens you want to mint: "
  ).then((input) => input.trim());

  const subunit = await getUserInput("Enter the subunit: ").then((input) =>
    input.trim()
  );

  const ftDenom = `${subunit}-${issuerAddress}`;
  const mintFtMsg = FT.Mint({
    sender: issuerAddress,
    coin: {
      denom: ftDenom,
      amount: amount,
    },
  });

  const mintBroadcastResponse = await coreum.sendTx([mintFtMsg]);
  console.log("mintBroadcastResponse: ", mintBroadcastResponse);
}
