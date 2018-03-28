pragma solidity ^0.4.18;


contract ERC20  {
  function totalSupply() constant returns (uint256);
    function balanceOf(address _addr)public constant returns(uint256);
    function transferfrom(address from,address to,uint256 value);
   
}