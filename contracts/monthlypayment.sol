pragma solidity ^0.4.0;
import "./FI.sol";
contract monthly_payment is financial
{
    uint256 tot_amount;
    function calculatepayment(address borrower,uint256 ethervalue)public view returns(uint256)
    {
        uint256 monthlypayment = ethervalue / 12;
        uint256 interest = ((ethervalue*10) /100 )/12;
        tot_amount = monthlypayment+interest;
        return(tot_amount);
        
    }
    function sendpayment(address financial)public payable
    {
       // require(tot_amount == amount);
        financial.transfer(msg.value);
        
    }
    
}
