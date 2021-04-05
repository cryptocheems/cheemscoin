const TokenLock = artifacts.require("TokenLock");
const Cheemscoin = artifacts.require("Cheemscoin");

require("chai").use(require("chai-as-promised")).should();
const { time } = require("@openzeppelin/test-helpers");
const { wei, round, now } = require("./utility");

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
    let time2;
    it("fails for randos", async () =>
      await tokenLock.createLock(cheemsCoin.address, wei("1"), 60, { from: rando }).should.be
        .rejected);
    it("adds to locks", async () => {
      time2 = now() + 600;
      await tokenLock.createLock(cheemsCoin.address, wei("10"), 600, { from: owner });
      const locks = await tokenLock.getLocks();
      assert.equal(locks.length, 1);
      // correct request time
      assert.equal(round(locks[0].requestTime), time2);
    });
    it("extends", async () => {
      await tokenLock.extendLock(0, 1000);
      const locks = await tokenLock.getLocks();
      assert.equal(round(locks[0].requestTime), time2 + 1000);
    });
  });

  describe("Requesting", () => {
    it("fails when early", async () => await tokenLock.requestLock(0, owner).should.be.rejected);
    it("requests correctly", async () => {
      await time.increase(1600);
      await tokenLock.requestLock(0, owner);

      const locks = await tokenLock.getLocks();
      const requests = await tokenLock.getRequests();

      assert.equal(locks[0].amount, 0);
      assert.equal(requests.length, 1);
      assert.equal(round(requests[0].unlockTime), now() + 3 * 24 * 60 * 60 + 1600);
    });
  });

  describe("Unlocking", () => {
    it("fails when early", async () => await tokenLock.unlock(0).should.be.rejected);
    it("unlocks correctly", async () => {
      await time.increase(time.duration.days(3));
      await tokenLock.unlock(0);

      const requests = await tokenLock.getRequests();
      assert.equal(requests[0].amount, 0);

      assert.equal(await cheemsCoin.balanceOf(owner), wei("690419"));
    });
  });
});
