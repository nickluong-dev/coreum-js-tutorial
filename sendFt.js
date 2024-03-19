import getUserInput from "./getUserInput.js";

export default async function sendFt(
  issuerAddress,
  receiverAddress,
  ft,
  Bank,
  coreum,
  Feature
) {
  let receiver = await getUserInput("Enter the receiver address: ").then(
    (input) => input.trim()
  );

  const subunit = await getUserInput(
    "Enter the subunit of the token you want to send: "
  ).then((input) => input.trim());

  const denom = `${subunit}-${issuerAddress}`;

  // check if token has whitelist feature enabled
  const tokenDetails = await ft.token(denom);

  if (tokenDetails.token.features.includes(Feature.whitelisting)) {
    const checkWhitelisting = await ft.whitelistedBalance(issuerAddress, denom);

    if (checkWhitelisting.balance.amount === "0") {
      console.log("The receiver address is not whitelisted");
      return;
    } else {
      console.log(
        "The amount of tokens whitelisted on this account is: ",
        checkWhitelisting.balance.amount
      );
    }
  }

  const amount = await getUserInput(
    "Enter the amount of tokens you want to send: "
  ).then((input) => input.trim());

  const sendMsg = Bank.Send({
    fromAddress: issuerAddress,
    toAddress: receiver.length > 0 ? receiver : receiverAddress,
    amount: [
      {
        denom: denom,
        amount: amount,
      },
    ],
  });
  console.log("sendMsg", sendMsg);

  const sendBroadcastResponse = await coreum.sendTx([sendMsg]);

  console.log("sendBroadcastResponse: ", sendBroadcastResponse);
}
