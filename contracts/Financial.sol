pragma solidity^0.4.0;
import "./Borrower1.sol";
contract financial is borrower{
    uint256 loanamount;
    uint256 tokenvalue;
    uint256 eth;
    uint256 ethervalue;
    uint256 etheramount;
    struct loandetails
    {
        address to;
        uint256 loanamount;
        uint256 value;
       uint256 duration;
    }
    mapping(address=> loandetails)public detail;
    function get(address fi)public constant returns(address,uint256)
    {
        
        return(fi,msg.value);
    }
    function ethertransfer(address borrower,uint256 tokenvalue)public view returns(uint256,uint256)
    {
        eth = tokenvalue * 1 ether;
        loanamount = eth/100 * 80;
         ethervalue = loanamount / 1 ether;
         
        detail[borrower].to = borrower;
        detail[borrower].value = tokenvalue;
        detail[borrower].loanamount = ethervalue;
         detail[borrower].duration = 12;
        return(detail[borrower].duration,detail[borrower].loanamount);
    }
     
    function sendether(address to) public payable 
    {
        to.transfer(msg.value);
        
    }
    
    function viewether(address from)public constant returns(uint256)
    {
        return(etheramount);
    }
    
   
}


   

   
