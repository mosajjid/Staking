// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function main() {
  

  
  
  

  
  const masterChefcontract = await hre.ethers.getContractFactory("MasterChef");
  
  
  const  _cake="0xA87Fa55949d6E7597E6ebF4bC2a5e2f36cAD6E3E";  //Reward Token
  const   _devaddr="0x2D86290D009f2ad72062d7C25aF1602c3bE18189" ;
  const _cakePerBlock=10000000000;
  const _startBlock=26886660;
      
  
  const masterChef = await masterChefcontract.deploy(_cake,_devaddr,_cakePerBlock,_startBlock);
  
  const masterChefAddress=masterChef.address;

  await masterChef.deployed();

  console.log(
    `masterChefAddress deployed to ${masterChef.address}`
  );
  
  
  //Verification Start
 

  console.log("We verify now, Please wait!");
  await delay(35000);

  console.log("Verifying masterChefAddress");
 


  try {
    await hre.run("verify:verify", {
      address: masterChefAddress,
      constructorArguments: [_cake,_devaddr,_cakePerBlock,_startBlock],
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
