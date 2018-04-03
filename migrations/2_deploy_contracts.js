var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Financial = artifacts.require("./Financial.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Financial,"SBI",10,12,{from:"0x134A936E253f1aBf5959eb90c9DDC730c5E543C6",value:web3.toWei(12,'ether')});
};
