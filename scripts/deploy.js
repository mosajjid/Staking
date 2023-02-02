// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function main() {
  const lp1 = "0xe66c93eF52F89812fDBA8908104B302Cb8514689";
  const lp0 = "0x25030f839bf2513A3Ea6a23DB43e3Ef76b014dbE";
  const router = "0xd99d1c33f9fc3444f8101754abc46c52416550d1";
  const lp = "0x3B123dd81822FfBc59B5b4C4a477B4199f45222B";
  const wbnb = "0xae13d989dac2f0debff460ac112a837c89baa7cd";
  const Reward = "0xA87Fa55949d6E7597E6ebF4bC2a5e2f36cAD6E3E";
  const chef = "0x1E7152B9E161933F01890433B01db8B4b9302d4d";
  // const strategy = "0x36f1c8015fc540fa206b29e790fb660a61059c26";
  const vault = "0x8c2cb67215c054d3c9431cd85e2b9fe6d9fd0b98";

  const common = [
    vault,
    router,
    "0x2D86290D009f2ad72062d7C25aF1602c3bE18189",
    "0x2D86290D009f2ad72062d7C25aF1602c3bE18189",
    "0x2D86290D009f2ad72062d7C25aF1602c3bE18189",
    "0x0000000000000000000000000000000000000000",
  ];
  const _outputToNativeRoute = [Reward, wbnb];

  const _outputToLp0Route = [Reward, lp1, lp0];

  const _outputToLp1Route = [Reward, lp1];

  const StratContract = await hre.ethers.getContractFactory(
    "StrategyCommonChefLP"
  );
  const VaultContract = await hre.ethers.getContractFactory("Staking");
  const strat = await StratContract.deploy(
    lp,
    1,
    chef,
    common,
    _outputToNativeRoute,
    _outputToLp0Route,
    _outputToLp1Route
  );

  await strat.deployed();

  const stake = await VaultContract.deploy(strat.address, "Test", "TST", 0);

  await stake.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp deployed to ${strat.address} ${stake.address}`
  );

  console.log("We verify now, Please wait!");
  await delay(35000);

  console.log("Verifying strategy");
  try {
    await hre.run("verify:verify", {
      address: strat.address,
      constructorArguments: [
        lp,
        1,
        chef,
        common,
        _outputToNativeRoute,
        _outputToLp0Route,
        _outputToLp1Route,
      ],
    });
  } catch (e) {
    console.log(e);
  }

  console.log("Verifying staking contract");
  try {
    await hre.run("verify:verify", {
      address: stake.address,
      constructorArguments: [strat.address, "Test", "TST", 0],
    });
  } catch (e) {
    console.log(e);
  }
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
