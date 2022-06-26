// const raqERC20 = artifacts.require("raqERC20");
const TowerOfGod = artifacts.require("TowerOfGod");
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = function (deployer) {
  // deployer.deploy(raqERC20, 1_000_000, getRandomInt(1_000_000), getRandomInt(1_000_000));
  deployer.deploy(TowerOfGod);
};
