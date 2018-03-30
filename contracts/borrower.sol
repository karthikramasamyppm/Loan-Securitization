pragma solidity ^0.4.0;
import "./ERC20.sol";
contract borrower is ERC20{
 
 string public name; 
 string public symbol; 
 uint256 public totalSupply; 

 address public borrower_address; 
 mapping (address => uint256)  balance; 
 function borrower() public{
     borrower_address=msg.sender;
     totalSupply = 10;
     balance[msg.sender] = totalSupply;
     name = "aa"; 
     symbol = "A1";
      
     } 
    
     function totalSupply() public constant returns (uint256)
    {
        return totalSupply;
    }
    
  
    function transferfrom(address from,address to,uint256 value)internal
    {
        balance[from] -= value;
       balance[to] +=value;
      
    ]


}
