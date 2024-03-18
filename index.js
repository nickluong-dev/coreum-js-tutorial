const { Client, Bank, FT, NFT, ClassFeature, Feature } = require("coreum-js");

// Replace the issuerMnemonic with your own. You can generate it at https://docs.coreum.dev/tools-ecosystem/faucet.html
// Caution: do not hardcode your production mnemonic here, otherwise your funds might be stolen.
// const issuerMnemonic =
//   "owner border palm add blouse clip laptop document city size simple planet earth onion diamond such chapter tribe early net library giraffe crater fold";

// If you are using a mnemonic from this tutorial you should provide another subunit and symbol,
// since tokens within one account should be unique.
// const subunit = "ujct";
// const symbol = "JCT";

const network = "testnet";

// We need another address to send tokens to. You can replace it with your own:
// const receiver = "testcore1ccma9arngkuk205h73c958y6mz04s50plx4mms";

async function getUserInput(prompt) {
  const readline = require("readline").createInterface({
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

async function main() {
  try {
    let running = true;

    // INIT SECTION

    // Init the client and target the testnet network:

    let issuerMnemonic = await getUserInput("Enter your mnemonic: ");

    if (issuerMnemonic === "") {
      issuerMnemonic =
        "owner border palm add blouse clip laptop document city size simple planet earth onion diamond such chapter tribe early net library giraffe crater fold";
    }

    // Access the private key of the mnemonic.

    // Let's store the mnemonic bank address to the variable(the Client instance saves the address of the connected account for easy access)
    const issuer = coreum.address;

    console.log("Connected to Coreum network. Address: ", issuer);

    while (running) {
      // Let's define the modules we are going to use:
      const {
        ft,
        nft,
        staking,
        distribution,
        mint,
        auth,
        bank,
        ibc,
        gov,
        feegrant,
        nftbeta,
        tx,
        wasm,
      } = coreum.queryClients;

      let subunit;
      let ftDenom;

      // Defining the functions we are going to use:

      async function checkAllBalances() {
        console.log(`balance: `, balance);
      }

      async function issueFt() {
        const symbol = await getUserInput(
          "Enter the symbol of your token: "
        ).then((input) => input.trim());

        subunit = await getUserInput("Enter the subunit of your token: ").then(
          (input) => input.trim()
        );

        const minting = await getUserInput("Press y to enable minting: ").then(
          (input) => input.trim()
        );

        const burning = await getUserInput("Press y to enable burning: ").then(
          (input) => input.trim()
        );

        const freezing = await getUserInput(
          "Press y to enable freezing: "
        ).then((input) => input.trim());

        const whitelisting = await getUserInput(
          "Press y to enable whitelisting: "
        ).then((input) => input.trim());

        const ibc = await getUserInput("Press y to enable ibc: ").then(
          (input) => input.trim()
        );

        const features = [];

        // Let's broadcast our issueFtMsg message and check the response:
        console.log("issueFtResponse: ", issueFtResponse);
      }

      async function mintFT() {
        const amount = await getUserInput(
          "Enter the amount of tokens you want to mint: "
        ).then((input) => input.trim());

        const subunit = await getUserInput("Enter the subunit: ").then(
          (input) => input.trim()
        );

        console.log("mintBroadcastResponse: ", mintBroadcastResponse);
      }

      async function burnFT() {
        const amount = await getUserInput(
          "Enter the amount of tokens you want to burn: "
        ).then((input) => input.trim());

        console.log("burnBroadcastResponse: ", burnBroadcastResponse);
      }

      async function getTokenDetails(tokenSubunit) {
        const subunit = await getUserInput(
          "Enter the subunit of your token: "
        ).then((input) => input.trim());

        console.log(`tokenDetails: `, tokenDetails);
      }

      async function getTokenSupply(tokenSubunit, tokenIssuer) {}

      async function sendFT() {
        const receiver = await getUserInput(
          "Enter the receiver address: "
        ).then((input) => input.trim());

        const subunit = await getUserInput(
          "Enter the subunit of the token you want to send: "
        ).then((input) => input.trim());

        if (checkWhitelisting.balance.amount === "0") {
          console.log("The receiver address is not whitelisted");
          return;
        } else {
          console.log(
            "The amount of tokens whitelisted on this account is: ",
            checkWhitelisting.balance.amount
          );
        }

        const amount = await getUserInput(
          "Enter the amount of tokens you want to send: "
        ).then((input) => input.trim());

        console.log("sendBroadcastResponse: ", sendBroadcastResponse);
      }

      async function getAccountTokens() {
        console.log("ACCOUNT TOKENS", accountTokens);
      }

      async function issueNFTClass() {
        const description = await getUserInput(
          "Enter the description of your NFT Class: "
        );
        const className = await getUserInput(
          "Enter the name of the NFT Class: "
        );
        const classSymbol = await getUserInput("Enter the class symbol: ");

        console.log("classCreateRes", classCreateRes);
      }

      async function mintNFT() {
        // mint the NFT
        const classId = await getUserInput("Enter the class symbol ID: ");

        const nftId = await getUserInput("Enter the NFT ID: ");

        console.log("NFT MINTED", mintNFTRes);
      }

      async function getAllAccountNFT() {
        const classId = await getUserInput("Enter the class ID: ");
        console.log("ADDRESS NFTS", addressNFTs);
      }

      async function setWhitelistLimit() {
        const address = await getUserInput(
          "Enter the address you want to whitelist: "
        ).then((input) => input.trim());

        const subunit = await getUserInput(
          "Enter the subunit of the token you want to whitelist: "
        ).then((input) => input.trim());

        console.log(
          "The token balance, and maximum amount you can whitelist is: ",
          tokenBalance.amount
        );

        const amount = await getUserInput(
          "Enter the amount of tokens you want to whitelist: "
        ).then((input) => input.trim());

        console.log(
          "The new whitelisted balance is: ",
          whitelistedBalance.balance.amount
        );
      }

      //Get user input to run program

      const displayText = `
      Enter the number of the function you want to run, or enter 'E' to exit:
      0. Exit
      1. Check all balances from current account
      2. Issue FT
      3. Mint FT
      3.5. Burn FT
      4. Get token details
      5. Send FT
      6. Get account tokens
      7. Issue NFT Class
      8. Mint NFT
      9. Get all account NFTs
      10. Set whitelist limit
      `;

      const userInput = await getUserInput(displayText).then((input) =>
        input.trim().toLowerCase()
      );

      switch (userInput) {
        case "0":
          running = false;
          break;
        case "1":
          await checkAllBalances();
          break;
        case "2":
          await issueFt();
          break;
        case "3":
          await mintFT();
          break;
        case "3.5":
          await burnFT();
          break;
        case "4":
          await getTokenDetails();
          break;
        case "5":
          await sendFT();
          break;
        case "6":
          await getAccountTokens();
          break;
        case "7":
          await issueNFTClass();
          break;
        case "8":
          await mintNFT();
          break;
        case "9":
          await getAllAccountNFT();
          break;
        case "10":
          await setWhitelistLimit();
          break;
        default:
          console.log("Invalid input");
          break;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

main();
