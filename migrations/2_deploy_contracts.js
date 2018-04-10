var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Financial = artifacts.require("./Financial.sol");
var Token = artifacts.require("./ERC20.sol");
module.exports = function(deployer) 
{
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Financial);
  deployer.deploy(Token);
};
