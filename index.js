import { Client, Bank, FT, NFT, ClassFeature, Feature } from "coreum-js";
import checkAllBalances from "./checkAllBalances.js";
import getUserInput from "./getUserInput.js";
import issueFt from "./issueFT.js";
import mintFT from "./mintFt.js";
import burnFT from "./burnFt.js";
import getTokenDetails from "./getTokenDetails.js";
import sendFt from "./sendFt.js";
import getAccountTokens from "./getAccountTokens.js";
import issueNFTClass from "./issueNFTClass.js";
import mintNFT from "./mintNFT.js";
import getAllAccountNFT from "./getAllAccountNFT.js";
import setWhitelistLimit from "./setWhitelistLimit.js";

// Replace the issuerMnemonic with your own. You can generate it at https://docs.coreum.dev/tools-ecosystem/faucet.html
// Caution: do not hardcode your production mnemonic here, otherwise your funds might be stolen.
// If you are using a mnemonic from this tutorial you should provide another subunit and symbol,
// since tokens within one account should be unique.

// We need another address to send tokens to. You can replace it with your own:
const receiverAddress = "testcore1743t5y35t3h0yvxmd0v4mcxjsj3cwxv8jhem2r";

async function main() {
  try {
    // Init the client and target the testnet network:
    let running = true;
    const network = "testnet";
    const coreum = new Client({ network: network });

    let issuerMnemonic = await getUserInput("Enter your mnemonic: ");

    if (issuerMnemonic === "") {
      issuerMnemonic =
        "cradle exile swarm spawn disorder lava arrest goat spy stool ankle expect produce tide sun finger inch what boat canvas able group swing goddess";
    }

    // Connect to the chain using Mnemonic to create signer. Store address of issuer.
    await coreum.connectWithMnemonic(issuerMnemonic);
    const issuerAddress = coreum.address;
    console.log("Connected to Coreum network. Address: ", issuerAddress);

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
          await checkAllBalances(issuerAddress, bank);
          break;
        case "2":
          await issueFt(issuerAddress, FT, coreum);
          break;
        case "3":
          await mintFT(issuerAddress, FT, coreum);
          break;
        case "3.5":
          await burnFT(issuerAddress, FT, coreum, Feature);
          break;
        case "4":
          await getTokenDetails(issuerAddress, ft);
          break;
        case "5":
          await sendFt(
            issuerAddress,
            receiverAddress,
            ft,
            Bank,
            coreum,
            Feature
          );
          break;
        case "6":
          await getAccountTokens(issuerAddress, ft);
          break;
        case "7":
          await issueNFTClass(issuerAddress, coreum, NFT);
          break;
        case "8":
          await mintNFT(issuerAddress, coreum, NFT);
          break;
        case "9":
          await getAllAccountNFT(issuerAddress, nftbeta);
          break;
        case "10":
          await setWhitelistLimit(
            issuerAddress,
            receiverAddress,
            bank,
            FT,
            ft,
            coreum
          );
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
