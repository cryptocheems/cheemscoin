const TokenLock = artifacts.require("TokenLock");
const Cheemscoin = artifacts.require("Cheemscoin");

require("chai").use(require("chai-as-promised")).should();
const { wei } = require("./utility");

contract("TokenLock", ([owner, rando]) => {
  let cheemsCoin;
  let tokenLock;

  before(async () => {
    // Load Contracts
    cheemsCoin = await Cheemscoin.new();
    tokenLock = await TokenLock.new();

    await cheemsCoin.transfer(rando, wei("1"), { from: owner });
    await cheemsCoin.approve(tokenLock.address, await cheemsCoin.totalSupply(), { from: owner });
  });

  describe("Locking", () => {
    it("fails for randos", async () =>
      await tokenLock.createLock(cheemsCoin.address, wei("1"), 60, { from: rando }).should.be
        .rejected);
    it("adds to locks", async () => {
      const time = Math.round(new Date().getTime() / 1000);
      await tokenLock.createLock(cheemsCoin.address, wei("10"), 60, { from: owner });
      const locks = await tokenLock.getLocks();
      assert.equal(locks.length, 1);
      // correct request time
      assert.equal(locks[0].requestTime, time + 60);
    });
  });
});
