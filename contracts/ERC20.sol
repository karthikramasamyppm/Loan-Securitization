pragma solidity ^0.4.13;

contract ERC20 {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract Token
{
    string standard="Token 1.0";
    string public name;
    string public symbol;
    uint256 public totalsupply;
    uint256 public decimals;
    mapping(address=>uint) public balanceOf;
    mapping(address=>mapping(address=>uint256))public allowed;
    function Token()public
    {
        totalsupply=10000;
        balanceOf[msg.sender]=totalsupply;
        symbol="LS";
        name="token_loan";
        decimals=0;
    }
    function transferFrom(address from, address to, uint256 tokens)public returns(bool) 
    {
        require(to != address(0));
        require(tokens <= balanceOf[from]);
        //require(tokens <= allowed[from][msg.sender]);
    
        balanceOf[from]=balanceOf[from]-tokens;
        balanceOf[to] =balanceOf[to]+tokens;
        allowed[from][msg.sender] = allowed[from][msg.sender]-(tokens);
        //Transfer(from,to,tokens);
        return true;
    }
    
    function allowance(address tokenowner, address _to) public view returns (uint256) 
    {
        return allowed[tokenowner][_to];
    }
    function increaseApproval(address _to, uint value) public returns(bool)
    {
        allowed[msg.sender][_to]=allowed[msg.sender][_to]+(value);
        return true;
    }
    function decreaseApproval(address _to, uint value) public returns(bool)
    {
        allowed[msg.sender][_to]=allowed[msg.sender][_to]-(value);
        return true;
    }
    function approve(address spender, uint256 tokens) public returns (bool)
    {
        allowed[msg.sender][spender]=tokens;
        return true;
    }
    function transfer(address to, uint256 tokens) public returns (bool)
    {   
        
        balanceOf[to]=balanceOf[to]+tokens;
        balanceOf[msg.sender]=balanceOf[msg.sender]-tokens;
        //require(value<=balanceOf[msg.sender]);
       
        //Transfer(msg.sender,to,value);
        return true;
    }
    
   
    function totalSupplytoken(address _token) public view returns(uint){
        return ERC20(_token).totalSupply();
    }
    
    function balanceOftoken(address _token) public view returns(uint){
        return ERC20(_token).balanceOf(msg.sender);
    }
    
    
}