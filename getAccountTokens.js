export default async function getAccountTokens(issuerAddress, ft) {
  const accountTokens = await ft.tokens(issuerAddress);
  console.log("ACCOUNT TOKENS", accountTokens);
}
