const { wei } = require("./utility");

const LockedCheemscoinLpFarm = artifacts.require("LockedCheemscoinLpFarm");
const Cheemscoin = artifacts.require("Cheemscoin");
const LpTokenMock = artifacts.require("LpTokenMock");

contract("LockedCheemscoinLpFarm", ([owner, rando]) => {
  let cheemsCoin;
  let lp;
  let farm;

  before(async () => {
    // Load Contracts
    cheemsCoin = await Cheemscoin.new();
    lp = await LpTokenMock.new();
    farm = await LockedCheemscoinLpFarm.new(cheemsCoin.address, lp.address);

    // Add initial amount of Cheemscoin
    await cheemsCoin.approve(farm.address, wei(172605));
    await farm.donate(wei(172605));
  });

  describe("Soft locking");
});
