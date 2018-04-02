pragma solidity ^0.4.0;

contract Register
{
    struct bank_Details
    {
        string name;
        uint256 bal;
        uint256 time;
        uint256 loan_interst;
    }
    
    mapping(address=>bank_Details) public bank;
    address[] public reg_bank;
    
  
    function show_registers() public view returns(address[])
    {
        return reg_bank;
    }
    function show_bank_detail(uint index)public view returns(string bank_name,address temp_add)
    {
        temp_add=reg_bank[index];
        bank_name=bank[temp_add].name;
        
    }
}

contract FinancialInstitution is Register
{
    modifier check_register()
    {
        require(bank[msg.sender].time !=0);
        _;
    }
   
    function transfer(address to) check_register public payable
    {  
        require(bank[msg.sender].bal>msg.value);
        bank[to].bal+=msg.value;
        bank[msg.sender].bal-=msg.value;
        //to.transfer(msg.value);
    }
    
    function GetBalance() check_register public constant returns (uint256)
    {
        return bank[msg.sender].bal;
    }

    function fetchBalance(address _bank) public constant returns (uint256)
    {
        return bank[_bank].bal;
    }

    
}

contract Financial is FinancialInstitution
{
    uint eth=1 ether;
    uint256[] total_token;
    struct borrower
    {
        address bank_address;
        uint256 amount;
        uint256 count;
        uint last_setl_time;
        uint time;
        uint months;
        uint borrower_balance;
        uint monthly_payment;
        uint256 id;
        uint256 token;
    }
    
     function Financial(string name,uint _loan_interst,uint256 _duration) public payable{
        bank[msg.sender].name=name;
        bank[msg.sender].loan_interst=_loan_interst;
        bank[msg.sender].bal=msg.value;
        bank[msg.sender].time=_duration;
        reg_bank.push(msg.sender);
    }
    
    mapping (address=>mapping(uint256=>borrower))public get_loan;
    mapping(address=>uint256)public get_loans_count;
    
  
    function borrow_money(address bank_address,uint256 tokenvalue) public payable
    {   
        uint256 amt = (tokenvalue * 80 / 100);

        require(bank[bank_address].time!=0);
        require(bank_address!=msg.sender);
        
        require (bank[bank_address].bal > amt *eth);
            
       
        bank[bank_address].bal -= amt*eth;
        
        
        
        get_loan[msg.sender][get_loans_count[msg.sender]].bank_address = bank_address;
        get_loan[msg.sender][get_loans_count[msg.sender]].amount = amt*eth;
        get_loan[msg.sender][get_loans_count[msg.sender]].months=12;
        get_loan[msg.sender][get_loans_count[msg.sender]].time=now;
        get_loan[msg.sender][get_loans_count[msg.sender]].last_setl_time=now;
        get_loan[msg.sender][get_loans_count[msg.sender]].monthly_payment=(amt*eth)/(12);
        get_loan[msg.sender][get_loans_count[msg.sender]].borrower_balance = amt*eth;
        get_loan[msg.sender][get_loans_count[msg.sender]].id = get_loans_count[msg.sender];
        get_loan[msg.sender][get_loans_count[msg.sender]].token = tokenvalue ;
        
        total_token.push(tokenvalue);
        
       
        get_loans_count[msg.sender]++;

        msg.sender.transfer(amt * 1 ether);
    }
    
    function monthlypayment(uint ln_id) public
    {
        uint temp_count=get_loan[msg.sender][ln_id].count;
        uint temp_month=get_loan[msg.sender][ln_id].months;
        uint temp_bal_ln=get_loan[msg.sender][ln_id].borrower_balance;
        uint temp_ins=get_loan[msg.sender][get_loans_count[msg.sender]].monthly_payment;
        uint temp_last=get_loan[msg.sender][get_loans_count[msg.sender]].last_setl_time + 1 minutes;//30 days;
        address temp_bank_address=get_loan[msg.sender][ln_id].bank_address;
        
        require(temp_count<temp_month);
        require((temp_last + 1 minutes)<=now);
        
        uint intr=bank[temp_bank_address].loan_interst;
        uint amont=temp_ins + ( temp_bal_ln * (intr/100) ) ;
        
        require(amont<=bank[msg.sender].bal);
        
        //bank_d1[msg.sender].bal -= amont+temp_ins;
        bank[temp_bank_address].bal += amont+temp_ins;
        
        get_loan[msg.sender][get_loans_count[msg.sender]].last_setl_time = temp_last +1 minutes;//30 days;
        get_loan[msg.sender][ln_id].borrower_balance-=temp_ins;
        bank[temp_bank_address].bal += amont;
        get_loan[msg.sender][ln_id].count++;

        temp_bank_address.transfer(amont * 1 ether);
       
    }
}  
   contract spv is Financial
   {
       address public spv_add;
       address public investor_add;
       struct spv_detail
        {
            
            uint256 initial_spv_ether;
            uint256[] spv_loan;
            uint256 spv_send_ether;
            uint256 available_pack;
            uint256 send_pack;
        }
        
        struct Investor
        {
            uint256 Investor_ether;
            uint256 Investor_package;
        }
        mapping(address=>spv_detail)public spv_details;
        mapping(address=>Investor)public investor_details;
        
         function SPV_ether()public payable
        {
         spv_add = msg.sender;
         spv_details[spv_add].initial_spv_ether=msg.value;
         
        }
         function sell_loan()public payable
        {
        spv_details[spv_add].spv_loan = total_token;
        spv_details[spv_add].spv_send_ether = spv_details[spv_add].spv_loan.length * 10 ether;
        bank[reg_bank[0]].bal += spv_details[spv_add].spv_send_ether;
        spv_details[spv_add].initial_spv_ether -= spv_details[spv_add].spv_send_ether;
        }
    
        function avail_pack()public
        {
            spv_details[spv_add].available_pack = spv_details[spv_add].spv_loan.length  / 3;
        }
        
        function send_package(uint256 pack)public
        {
            spv_details[spv_add].send_pack = pack;
            spv_details[spv_add].available_pack -= pack;
            spv_details[spv_add].spv_loan.length -= pack * 3;
            investor_details[investor_add].Investor_ether -= (pack * 3) * 10 ether;
            spv_details[spv_add].initial_spv_ether += (pack * 3) * 10 ether;
            
        }
        
        function Investor_ether()public payable
        {
         investor_add = msg.sender;
         investor_details[investor_add].Investor_ether=msg.value;
         
        }
   }
