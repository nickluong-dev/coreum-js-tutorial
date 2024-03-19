import getUserInput from "./getUserInput.js";

export default async function mintNFT(issuerAddress, coreum, NFT) {
  // mint the NFT
  const classId = await getUserInput("Enter the class symbol ID: ");

  const nftId = await getUserInput("Enter the NFT ID: ");

  const mintNFTMsg = NFT.Mint({
    classId: `${classId}-${issuerAddress}`,
    sender: issuerAddress,
    id: nftId,
    uri: "",
    uriHash: "",
  });

  const mintNFTRes = await coreum.sendTx([mintNFTMsg]);

  console.log("NFT MINTED", mintNFTRes);
}
