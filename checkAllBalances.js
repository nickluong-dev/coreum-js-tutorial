export default async function checkAllBalances(issuerAddress, bank) {
  const balance = await bank.allBalances(issuerAddress);
  console.log(`balance: `, balance);
}
