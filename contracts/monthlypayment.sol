pragma solidity ^0.4.0;
import"./Financial.sol";
contract monthly_payment is financial
{
    uint256 tot_amount;
    function ViewMonthlypayment(address borrower)public payable
    {
        uint256 monthlypayment = detail[borrower].loanamount / FI_duration;
        uint256 interest = ((detail[borrower].loanamount*10) /100 )/ FI_duration;
        tot_amount = monthlypayment+interest;
         detail[borrower].loanamount -= tot_amount;
        
        
    }
    function sendMonthlypayment(address financial)public payable
    {
       //require(tot_amount == msg.value);
        financial.transfer(msg.value);
        initial_ether += tot_amount;
     
     }
   function ViewLoanamount(address borrower)public view returns(uint256)
   {
       return( detail[borrower].loanamount);
   }
    
}
