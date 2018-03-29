pragma solidity^0.4.0;
import "./Borrower1.sol";
contract financial is borrower{
    
    uint256 FI_interest;
    uint256 FI_duration;
    uint256 initial_ether;
    uint256 loan_count;
    address financial_institution = 0x3eF74E84B495FC03E41adCB516E1D109D4e1F991;
    struct loandetails
    {
        address borrower;
        uint256 loanamount;
        uint256 token;
        uint256 duration;
    }
    mapping(address=> loandetails)public detail;
    function register(uint256 initial_value,uint256 interest,uint256 duration)public
    {
        initial_ether = initial_value * 1 ether;
        FI_interest=interest;
        FI_duration=duration;
    }
    function existing()public view returns(address,uint256,uint256,uint256)
    {
         return(financial_institution,initial_ether,FI_interest,FI_duration);
    }
    
    
    function loancalculation(address borrower,uint256 tokenvalue)public 
    {
        detail[borrower].borrower = borrower;
        detail[borrower].token = tokenvalue;
        detail[borrower].loanamount = (((tokenvalue * 1 ether)/100 * 80) / 1 ether);
        detail[borrower].duration = 12;
        loan_count +=1;
        //return(detail[borrower].duration,detail[borrower].loanamount);
    }
     
    function sendether(address borrower) public payable 
    {
        borrower.transfer(msg.value);
        initial_ether -= detail[borrower].loanamount;
    }
    
    function viewether(address borrower)public view returns(uint256)
    {
        return(detail[borrower].loanamount);
    }
    
   /* function sellloan(address to,uint256 value)
    {
        balance[msg.sender] -=value;
        balance[to] +=value;
    }*/
}


   

   
