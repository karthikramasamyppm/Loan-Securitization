pragma solidity ^0.4.0;
import"./FI.sol";
contract monthly_payment is financial
{
    uint256 tot_amount;
    function calculatepayment(address borrower,uint256 ethervalue)public view returns(uint256)
    {
        uint256 monthlypayment = ethervalue / FI_duration;
        uint256 interest = ((ethervalue*10) /100 )/ FI_duration;
        tot_amount = monthlypayment+interest;
        return(tot_amount);
        
    }
    function sendpayment(address financial)public payable
    {
       //require(tot_amount == msg.value);
        financial.transfer(msg.value);
        initial_ether += tot_amount;
       
        
    }
    function balanceloan(address borrower)public view returns(uint256,uint256)
    {
     detail[borrower].loanamount -= tot_amount;
        return(detail[borrower].loanamount,tot_amount);
    }
    
}
