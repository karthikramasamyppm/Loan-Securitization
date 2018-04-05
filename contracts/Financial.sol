pragma solidity ^0.4.0;

contract Register
{
    struct bank_Details
    {
        string name;
        uint256 bal;
        uint256 time;
        uint256 loan_interst;
        mapping(address=>bool) spvList;
    }
    
    mapping(address=>bank_Details) public bank_d1;
    address[] public reg_user;
    
  function register(string name,uint _loan_interst,uint _time)public payable returns(string)
    {
        if(bank_d1[msg.sender].time == 0)
        {
            bank_d1[msg.sender].name = name;
            bank_d1[msg.sender].loan_interst = _loan_interst;
            bank_d1[msg.sender].bal = msg.value;
            bank_d1[msg.sender].time = _time;
            reg_user.push(msg.sender);
            return "Successfully Registered";
        }
        else
        {
            return "Account Alreay Exist";
        }
    }
    function show_registers() public view returns(address[])
    {
        return reg_user;
    }
    function isRegistered(address _bank) public constant returns (bool) {
      return bank_d1[_bank].time > 0;
    }
    function show_bank_detail(uint index,uint intr_type)public view returns(string bank_name,address tem_add,uint intr)
    {
        tem_add=reg_user[index];
        bank_name=bank_d1[tem_add].name;
        if(intr_type==0)
        {
            intr=bank_d1[tem_add].loan_interst;
        }
    }
}

contract FinancialInst is Register
{
    modifier ch_register()
    {
        require(bank_d1[msg.sender].time !=0);
        _;
    }
   
   
    function withdraw() ch_register public payable
    {
        require(bank_d1[msg.sender].bal>msg.value);
        bank_d1[msg.sender].bal-=msg.value;
        
        address me=msg.sender;
        me.transfer(msg.value);
    }
   
    function transfer(address to) ch_register public payable
    {  
        require(bank_d1[msg.sender].bal>msg.value);
        bank_d1[to].bal+=msg.value;
        bank_d1[msg.sender].bal-=msg.value;
    
    }
    
    function GetBalance() ch_register public constant returns (uint256)
    {
        return bank_d1[msg.sender].bal;
    }

    function fetchBalance(address _banker) public constant returns (uint256)
    {
        return bank_d1[_banker].bal;
    }

    function isRegistered(address _bank) public constant returns (bool) {
      return bank_d1[_bank].time > 0;
    }
}

contract Financial is FinancialInst
{
   
    uint256 total_token_value;
    uint256[] total_token;
    uint256 public loan_id = 0;
    struct loan_get
    { 
        
        address bank_address;
        address borr_address;
        uint256 amount;
        uint256 count;
        uint last_setl_time;
        uint time;
        uint months;
        uint bal_ln;
        uint installment;
        uint256 id;
        uint256 token;
        string token_symbol;
        bool sold;
        
    }
    
     
    mapping (address=>mapping(uint256=>loan_get))public ln_get;
    mapping(address=>uint256)public ln_get_id;
     address[] public spv_reg;

    struct loan_pro
    {
        address bank_address;
        uint256 amount;
        uint time;
        uint months;
    }
    
     address public spv_add;
     address public investor_add;
     
     uint256[] public spv_loanid;
     uint256[] public spv_token;
     struct spv_detail
        {
            
            uint256 initial_spv_ether;
            
            uint256 spv_loan;
            uint256 spv_send_ether;
            uint256 available_pack;
            uint256 send_pack;
            
            // address[] cust;
            // mapping(address=>uint256)tknValue;
        }
    
     struct Investor
        {
            uint256 Investor_ether;
            uint256 Investor_package;
            mapping(address=>bool) investorsList;
        }
    mapping (address=>mapping(uint256=>loan_pro))public ln_pro;
    mapping(address=>uint256)public ln_pro_count;
    
     mapping(address=>spv_detail)public spv_details;
     uint256 spv_loan_count;
     mapping(address=>Investor)public investor_details;

    address[] cust;
    mapping(address=>uint256) tknValue;
    uint256[] public Token_count;
    uint256[] public pack;
        
    function req_loan(address bank_address,uint256 tokenvalue,string tokensymbol) public payable   // add token_symbol
    {   
         
         
        uint256 amt = ((tokenvalue * 1 ether)*80 / 100);

        require(bank_d1[bank_address].time!=0);
        require(bank_address!=msg.sender);
        
        require (bank_d1[bank_address].bal > amt );
    
        bank_d1[bank_address].bal -= amt;
        
         loan_id++;
         ln_get_id[msg.sender] = loan_id;
        
        
        ln_get[msg.sender][ln_get_id[msg.sender]].bank_address = bank_address;
        ln_get[msg.sender][ln_get_id[msg.sender]].amount = amt;
        ln_get[msg.sender][ln_get_id[msg.sender]].months=12;
        ln_get[msg.sender][ln_get_id[msg.sender]].time=now;
        ln_get[msg.sender][ln_get_id[msg.sender]].last_setl_time=now;
        ln_get[msg.sender][ln_get_id[msg.sender]].installment=(amt)/(12);
        ln_get[msg.sender][ln_get_id[msg.sender]].bal_ln = amt;
        ln_get[msg.sender][ln_get_id[msg.sender]].id = ln_get_id[msg.sender];
       
        ln_get[msg.sender][ln_get_id[msg.sender]].token = tokenvalue;
        ln_get[msg.sender][ln_get_id[msg.sender]].token_symbol = tokensymbol;
        ln_get[msg.sender][ln_get_id[msg.sender]].sold=false;
        ln_get[msg.sender][ln_get_id[msg.sender]].borr_address=msg.sender;
        
         total_token_value += tokenvalue;
         total_token.push(ln_get[msg.sender][ln_get_id[msg.sender]].token);
        
        ln_pro[bank_address][ln_pro_count[bank_address]].bank_address = msg.sender;
        ln_pro[bank_address][ln_pro_count[bank_address]].amount = amt;
        ln_pro[bank_address][ln_pro_count[bank_address]].months=12;
        ln_pro[bank_address][ln_pro_count[bank_address]].time=now;
        
        ln_pro_count[bank_address]++;
        

        msg.sender.transfer(amt * 1 wei);
       
        cust.push(msg.sender);
        tknValue[msg.sender]=tokenvalue;
    }
    
    function settlement(uint ln_id) public
    {
        uint temp_count=ln_get[msg.sender][ln_id].count;
        uint temp_month=ln_get[msg.sender][ln_id].months;
        uint temp_bal_ln=ln_get[msg.sender][ln_id].bal_ln;
        uint temp_ins=ln_get[msg.sender][ln_id].installment;
        uint temp_last=ln_get[msg.sender][ln_id].last_setl_time + 1 minutes;//30 days;
        address temp_bank_address=ln_get[msg.sender][ln_id].bank_address;
        
        require(temp_count<temp_month);
       
        
        uint intr=bank_d1[temp_bank_address].loan_interst;
        uint amont=( temp_bal_ln * (intr/100) ) /100;
        
        
        bank_d1[temp_bank_address].bal += amont+temp_ins;
        
        ln_get[msg.sender][ln_id].last_setl_time = temp_last +1 minutes;//30 days;
        ln_get[msg.sender][ln_id].bal_ln-=temp_ins;
        ln_get[msg.sender][ln_id].count++;

       
        
        
        if(bank_d1[reg_user[0]].spvList[spv_add])//(spv_details[spv_add].spv_loan > 0)
        {
        uint256 bank_take_interest=(amont *10)/100;
        bank_d1[reg_user[0]].bal +=bank_take_interest;
        
        uint256 spv_take_interest=((amont-bank_take_interest)*10)/100;
        spv_details[spv_add].initial_spv_ether +=spv_take_interest;
        
      
        if(investor_details[investor_add].investorsList[investor_add])
        {
        uint256 balance_investor_amount=amont- (bank_take_interest+spv_take_interest);
        investor_details[investor_add].Investor_ether += balance_investor_amount;
        }
        }
        
        else
        {
             bank_d1[temp_bank_address].bal += amont;
        }
        
        
    }
    function SPV_ether()public payable returns(string)
        {
            spv_add = msg.sender;
        if( spv_details[spv_add].initial_spv_ether == 0)
        {
         
         spv_details[spv_add].initial_spv_ether=msg.value;
         spv_details[spv_add].spv_send_ether=0;
         spv_reg.push(msg.sender);
         return "Account Registered";
        }
        else
        {
            return "Account Alreay Exist";
        }
        }
      function spv_registers() public view returns(address[])
    {
        return spv_reg;
    }
 function spvBalance(address _spv) public constant returns (uint256)
    {
        return spv_details[_spv].initial_spv_ether;
    }
    function spvRegistered(address _spvad) public constant returns (bool) {
      return spv_details[_spvad].initial_spv_ether > 0;
    }

     function purchase_loan(uint256[] __loanId,address[] __borrower)public payable returns(bool)    //purchase_loan(uint256 loan_id[])
        {
            uint256 _loanId=0;
            address _borrower=0;
            if(__loanId.length!=__borrower.length)
                return false;
        
            for(uint256 a=0;a<__loanId.length;a++)
            {
                _loanId=__loanId[a];
                _borrower=__borrower[a];
            uint256 TKN_Amount=ln_get[_borrower][_loanId].token;
        
            spv_loanid.push(_loanId);
            spv_details[spv_add].initial_spv_ether-=TKN_Amount;
            spv_details[spv_add].spv_send_ether+=TKN_Amount;
            bank_d1[reg_user[0]].bal+=TKN_Amount;
            spv_details[spv_add].spv_loan++;
        
            ln_get[msg.sender][ln_get_id[msg.sender]].sold=true;
            spv_token.push(ln_get[_borrower][_loanId].token);
          
            }
            return true;
            
    
        }
    function Investor_ether()public payable
        {
         investor_add = msg.sender;
         investor_details[investor_add].Investor_ether=msg.value;
         investor_details[investor_add].investorsList[investor_add]=true;
        }
        function avail_pack(uint256 i,uint256 j)public  //01
        {
            uint256 v=Token_count[i]+Token_count[j];
            pack.push(v);//values[i]+values[j]);
            spv_details[spv_add].available_pack += 1;
           
        }
        
        function send_package(uint256 index)public
        {
            investor_details[investor_add].Investor_package += 1;
            investor_details[investor_add].Investor_ether -=pack[index];// * 3) * 10 ;
            spv_details[spv_add].initial_spv_ether += pack[index];// * 3) * 10 ;
            spv_details[spv_add].spv_loan -= pack[index];
            spv_details[spv_add].available_pack -= 1;
            spv_details[spv_add].send_pack += 1;
        }
        function spvloanDetails()public returns(address[],uint256[])
        {
           
            for(uint256 b=0;b<cust.length;b++)
            {
                Token_count.push(tknValue[cust[b]]);
            }
            return (cust,Token_count);
        }
        
}
