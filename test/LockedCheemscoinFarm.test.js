const { wei } = require("./utility");

const LockedCheemscoinLpFarm = artifacts.require("LockedCheemscoinLpFarm");
const Cheemscoin = artifacts.require("Cheemscoin");
const LpTokenMock = artifacts.require("LpTokenMock");

contract("LockedCheemscoinLpFarm", ([owner, rando]) => {
  let cheemscoin;
  let lp;
  let farm;

  before(async () => {
    // Load Contracts
    cheemscoin = await Cheemscoin.new();
    lp = await LpTokenMock.new();
    farm = await LockedCheemscoinLpFarm.new(cheemscoin.address, lp.address);

    // Add initial amount of Cheemscoin
    await cheemscoin.transfer(farm.address, wei(172605));
  });

  // TODO: Actually write tests
  describe("Soft locking");
});
