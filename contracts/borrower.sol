pragma solidity ^0.4.0;
import "./ERC20.sol";
contract bor is ERC20{
 
 string public name; 
 string public symbol; 
 uint256 public totalSupply; 
 uint256 value;
 
 address public owner; 
 mapping (address => uint256)  balance; 
 function bor(){
     owner=msg.sender;
     totalSupply = 10;
     balance[msg.sender] = totalSupply;
     name = "aa"; 
     symbol = "A1";
      
     } 
    
     function totalSupply() constant returns (uint256)
    {
        return totalSupply;
    }
    
    

function balanceOf(address _addr)public constant returns(uint256) {
   return balance[_addr];
}
function transferfrom(address from,address to,uint256 value)
{
    balance[from] -= value;
    balance[to] +=value;
   
}






}