const { wei } = require("../test/utility");

const LockedCheemscoinLpFarm = artifacts.require("LockedCheemscoinLpFarm");
const Cheemscoin = artifacts.require("Cheemscoin");
const LpTokenMock = artifacts.require("LpTokenMock");

module.exports = async (deployer, network) => {
  let lpToken;
  if (network === "development") {
    await deployer.deploy(LpTokenMock, { overwrite: false });
    lpToken = await LpTokenMock.deployed().address;
  } else {
    lpToken = "0xce5382ff31b7a6F24797A46c307351FDE135C0Fd";
  }

  const cheemscoin = Cheemscoin.deployed();

  await deployer.deploy(LockedCheemscoinLpFarm, cheemscoin.address, lpToken, {
    overwrite: false,
  });

  // Add initial amount of Cheemscoin
  const lpFarm = await LockedCheemscoinLpFarm.deployed();
  await cheemscoin.transfer(lpFarm.address, wei(172605));
};
