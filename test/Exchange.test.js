const Exchange = artifacts.require("Exchange");
const Cheemscoin = artifacts.require("Cheemscoin");

require("chai").use(require("chai-as-promised")).should();
const { wei, fromWei } = require("./utility");

contract("Exchange", ([owner, , , , randoAddress]) => {
  let cheemsCoin;
  let exchange;

  before(async () => {
    // Load Contracts
    cheemsCoin = await Cheemscoin.new();
    exchange = await Exchange.new(cheemsCoin.address);
  });

  describe("Deployement", async () => {
    it("has correct price", async () => {
      const price = await exchange.price();
      assert.equal(price, wei("0.01"));
    });
    it("has correct dev address", async () => {
      const dev = await exchange.dev();
      assert.equal(dev, owner);
      assert.notEqual(dev, randoAddress);
    });
  });

  describe("Buying", async () => {
    it("fails when no balance", async () => {
      await exchange.buy({ from: randoAddress, value: wei("1") }).should.be.rejected;
    });
    it("fails when not enough balance", async () => {
      // Give contract 1 cheemscoin
      await cheemsCoin.transfer(exchange.address, wei("1"), { from: owner });

      await exchange.buy({ from: randoAddress, value: wei("1") }).should.be.rejected;
      const randoCheemsBal = await cheemsCoin.balanceOf(randoAddress);
      assert.equal(randoCheemsBal, 0);
    });

    it("fails when user doesn't have enough funds", async () => {
      await exchange.buy({ from: randoAddress, value: wei("100") }).should.be.rejected;
      const randoCheemsBal = await cheemsCoin.balanceOf(randoAddress);
      assert.equal(randoCheemsBal, 0);
    });

    it("exchanges correctly", async () => {
      await cheemsCoin.transfer(exchange.address, wei("999"), { from: owner });

      await exchange.buy({ from: randoAddress, value: wei("0.5") });

      let randoCheemsBal = await cheemsCoin.balanceOf(randoAddress);
      assert.equal(randoCheemsBal, wei("50"));

      await exchange.buy({ from: randoAddress, value: wei("9.5") });

      randoCheemsBal = await cheemsCoin.balanceOf(randoAddress);
      assert.equal(randoCheemsBal, wei("1000"));
    });

    it("can buy fractions of CHEEMS", async () => {
      await cheemsCoin.transfer(exchange.address, wei("1"), { from: owner });

      await exchange.buy({ from: randoAddress, value: wei("0.001") });
    });
  });

  describe("Setting Price", async () => {
    it("works for dev", async () => {
      await exchange.setPrice(wei("0.02"), { from: owner });
      const price = await exchange.price();

      assert.equal(price, wei("0.02"));
    });
    it("doesn't work for everyone else", async () => {
      await exchange.setPrice(5, { from: randoAddress }).should.be.rejected;
    });
    it("exchanges with the new price", async () => {
      await cheemsCoin.transfer(exchange.address, wei("1000"), { from: owner });

      await exchange.buy({ from: randoAddress, value: wei("10") });

      const randoCheemsBal = await cheemsCoin.balanceOf(randoAddress);
      assert.equal(fromWei(randoCheemsBal), "1500.1");
    });
  });

  describe("Withdrawing", async () => {
    it("doesn't work for everyone else", async () => {
      await exchange.withdraw({ from: randoAddress }).should.be.rejected;
    });
    it("withdraws exchange balance to dev", async () => {
      const beforeOwnerBal = await cheemsCoin.balanceOf(owner);
      const beforeExchangeBal = await cheemsCoin.balanceOf(exchange.address);

      const shouldAfterOwnerBal =
        Number(fromWei(beforeOwnerBal)) + Number(fromWei(beforeExchangeBal));

      await exchange.withdraw({ from: owner });

      const afterExchangeBal = await cheemsCoin.balanceOf(exchange.address);
      assert.equal(afterExchangeBal, "0");

      const afterOwnerBal = await cheemsCoin.balanceOf(owner);
      assert.equal(fromWei(afterOwnerBal), shouldAfterOwnerBal);
    });
  });
});
