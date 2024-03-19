import getUserInput from "./getUserInput.js";

export default async function setWhitelistLimit(
  issuerAddress,
  receiverAddress,
  bank,
  FT,
  ft,
  coreum
) {
  const subunit = await getUserInput(
    "Enter the subunit of the token you want to whitelist: "
  ).then((input) => input.trim());

  const denom = `${subunit}-${issuerAddress}`;
  const tokenBalance = await bank.supplyOf(denom);

  console.log(
    "The token balance, and maximum amount you can whitelist is: ",
    tokenBalance.amount
  );

  const amount = await getUserInput(
    "Enter the amount of tokens you want to whitelist: "
  ).then((input) => input.trim());

  const whitelistMsg = FT.SetWhitelistedLimit({
    sender: issuerAddress,
    account: receiverAddress,
    coin: {
      denom: denom,
      amount: amount,
    },
  });

  const whitelistRes = await coreum.sendTx([whitelistMsg]);
  console.log("whitelistRes", whitelistRes);

  const whitelistedBalance = await ft.whitelistedBalance(
    receiverAddress,
    denom
  );

  console.log(
    "The new whitelisted balance is: ",
    whitelistedBalance.balance.amount
  );
}
