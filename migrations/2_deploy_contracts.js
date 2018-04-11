var Financial = artifacts.require("./Financial.sol");
var LoanToken = artifacts.require("./LoanToken.sol");
module.exports = function(deployer) 
{
  deployer.deploy(LoanToken);
  deployer.deploy(Financial);
};