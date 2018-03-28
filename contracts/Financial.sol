pragma solidity^0.4.0;
import "./Borrower1.sol";
contract fi is bor{
    uint256 loanamount;
    uint256 tokenvalue;
    uint256 eth;
    uint256 ethervalue;
    struct loandetails
    {
        address to;
        uint256 loanamount;
        uint256 value;
       uint256 duration;
    }
    mapping(address=> loandetails)detail;
    function ethertransfer(address to,uint256 tokenvalue)public view returns(uint256,uint256)
    {
        eth = tokenvalue * 1 ether;
        loanamount = eth/100 * 80;
         ethervalue = loanamount / 1 ether;
        detail[to].to = to;
        detail[to].value = tokenvalue;
        detail[to].loanamount = ethervalue;
         detail[to].duration = 12;
        return(detail[to].duration,detail[to].loanamount);
    }
     
    function sendether(address to) public payable 
    {
        to.transfer(msg.value);
    }
    
    function viewether(address to)public constant returns(uint256,uint256)
    {
        return(detail[to].duration,detail[to].loanamount);
    }
    
    function sellloan(address to,uint256 value)
    {
        balance[msg.sender] -=value;
        balance[to] +=value;
    }
}


   

   