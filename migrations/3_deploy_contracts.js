var borrower = artifacts.require("./borrower.sol");
var ERC20 = artifacts.require("./ERC20.sol");
var Financial = artifacts.require("./Financial.sol");

module.exports = function(deployer) {
  
  deployer.link(ERC20, borrower);
  deployer.link(borrower, borrower);
  deployer.deploy(Financial);
};
