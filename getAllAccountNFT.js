import getUserInput from "./getUserInput.js";

export default async function getAllAccountNFT(issuerAddress, nftbeta) {
  const classId = await getUserInput("Enter the class ID: ");
  const NFTClassId = `${classId}-${issuerAddress}`;

  const accountNFTs = await nftbeta.nfts(NFTClassId, issuerAddress);

  console.log("ADDRESS NFTS", accountNFTs);
}
