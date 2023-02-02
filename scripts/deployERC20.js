// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function main() {
  

  
  
  

  
  const ERC20contract = await hre.ethers.getContractFactory("ERC20Token");
  
  const erc20 = await ERC20contract.deploy("Token A","TKNA");
  
  const erc20Address=erc20.address;

  await erc20.deployed();

  console.log(
    `ERC20 deployed to ${erc20.address}`
  );
  
  
  //Verification Start
 

  console.log("We verify now, Please wait!");
  await delay(35000);

  console.log("Verifying erc20");
 


  try {
    await hre.run("verify:verify", {
      address: erc20Address,
      constructorArguments: ["Token A","TKNA"],
    });
  } catch (e) {
    console.log(e);
  }
  
  //Verification Ends
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
