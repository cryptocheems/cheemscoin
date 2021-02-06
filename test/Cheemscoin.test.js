const Cheemscoin = artifacts.require("Cheemscoin");

function wei(n) {
  return web3.utils.toWei(n, "ether");
}

contract("Cheemscoin", ([owner, randoAddress]) => {
  let cheemsCoin;

  before(async () => {
    // Load Contracts
    cheemsCoin = await Cheemscoin.new();
  });

  describe("Token Deployment", async () => {
    it("has correct name", async () => {
      const name = await cheemsCoin.name();
      assert.equal(name, "Cheemscoin");
    });
    it("has correct symbol", async () => {
      const symbol = await cheemsCoin.symbol();
      assert.equal(symbol, "CHEEMS");
    });
    it("has 69,420,000 in total", async () => {
      const supply = await cheemsCoin.totalSupply();
      assert.equal(supply, wei("69420000"));
    });
    it("has correct owner balance", async () => {
      const balance = await cheemsCoin.balanceOf(owner);
      assert.equal(balance, wei("69420000"));
    });
  });

  describe("Token Usage", async () => {
    it("transfers correctly", async () => {
      const randoBefore = await cheemsCoin.balanceOf(randoAddress);
      const ownerBefore = await cheemsCoin.balanceOf(owner);

      assert.equal(randoBefore, "0");
      assert.equal(ownerBefore, wei("69420000"));

      await cheemsCoin.transfer(randoAddress, wei("6.9"), { from: owner });

      const randoAfter = await cheemsCoin.balanceOf(randoAddress);
      const ownerAfter = await cheemsCoin.balanceOf(owner);

      assert.equal(randoAfter, wei("6.9"));
      assert.equal(ownerAfter, wei("69419993.1"));
    });
  });
});
