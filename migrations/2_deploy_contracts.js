//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
/*var Financial = artifacts.require("./Financial.sol");

module.exports = function(deployer) {
  /*deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin4);
  deployer.deploy(Financial);
};*/


/*var ConvertLib = artifacts.require("./ConvertLib.sol");

var MetaCoin = artifacts.require("./MetaCoin.sol");

var Register = artifacts.require("./Register.sol");
var Bank = artifacts.require("./Bank.sol");
// var Loan = artifacts.require("./Loan.sol");
// var Ownable = artifacts.require("./Ownable.sol");
var Loan_Details = artifacts.require("./Loan_Details.sol");

module.exports = function(deployer) {
deployer.deploy(ConvertLib); 
deployer.link(ConvertLib, MetaCoin);
deployer.deploy(MetaCoin);
// deployer.deploy(Loan);
deployer.deploy(Register);
deployer.deploy(Bank);
deployer.link(Register, Bank,Loan_Details);
// deployer.deploy(Ownable);
deployer.deploy(Loan_Details);
};
*/

var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Financial = artifacts.require("./Financial.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Financial,"SBI",10,12,{from:"0xa2dc1c85332bc80c1de13ad005329ee3162571e3",value:web3.toWei(12,'ether')});

};
