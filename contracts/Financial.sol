pragma solidity^0.4.0;
import "./borrower.sol";
contract finance is borrower {
    
    uint256 FI_interest;
    uint256 FI_duration;
    uint256 initial_ether;
    uint256 loan_count;
    address financial_institution;
    function finance () public{
        financial_institution =msg.sender;
    }
    struct loandetails
    {
        address borrower;
        uint256 loanamount;
        uint256 token;
        uint256 duration;
        
    }
    mapping(address=> loandetails)public detail;
  //  mapping(uint256 => uint256)public balanceOf;
    
    function register(uint256 interest,uint256 duration)public payable
    {
        initial_ether = msg.value / 1 ether ;
        FI_interest=interest;
        FI_duration=duration;
    }
    function existing()public view returns(address,uint256,uint256,uint256)
    {
         return(financial_institution,initial_ether,FI_interest,FI_duration);
    }
    
    
    function borrowMoney(address borrower,uint256 tokenvalue)public 
    {
        transferfrom(borrower,financial_institution,tokenvalue);
        detail[borrower].borrower = borrower;
        detail[borrower].token = tokenvalue;
        detail[borrower].loanamount = (((tokenvalue * 1 ether)/100 * 80) ) / 1 ether;
        detail[borrower].duration = 12;
        loan_count +=1;
        //borrower.transfer(detail[borrower].loanamount);
        //initial_ether -= detail[borrower].loanamount;
       
    }
   
    function transferther(address borrower) public payable 
    {
        borrower.transfer(msg.value);
        initial_ether -= msg.value;
    }
    
    function viewloanamount(address borrower)public view returns(uint256)
    {
        return(detail[borrower].loanamount);
        
    }
    
   
    }
