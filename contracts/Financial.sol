pragma solidity ^0.4.0;

contract Register
{
    struct bank_Details
    {
        string name;
        uint256 bal;
        uint256 time;
        uint256 loan_interst;
       // mapping(address=>bool) spvList;
    }
    
    mapping(address=>bank_Details) public bank_d1;
    address[] public reg_user;
    uint256 public sefi=0;
    uint256 public sespv=0;
    uint256 public seinv=0;
    
  function register(string name,uint _loan_interst,uint _time)public payable returns(string)
    {
        if(bank_d1[msg.sender].time == 0)
        {
            sefi=1;
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
        uint256 id;
        uint256 token;
        string token_symbol;
        address bank_address;
        address borr_address;
        uint256 amount;
        uint256 count;
        uint last_setl_time;
        uint time;
        uint months;
        uint bal_ln;
        uint installment;
       uint256 spvid;
              
    }
    
    mapping (address=>mapping(uint256=>loan_get))public ln_get;
    mapping (address=>mapping(uint256=>loan_get))public spvln_get;
     mapping (address=>mapping(uint256=>loan_get))public filn_get;
    mapping(address=>uint256)public ln_get_id;
     mapping(address=>uint256)public filn_get_id;
      mapping(address=>uint256)public spvln_get_id;
      mapping(address=>uint256)public spvpackid;
       mapping(address=>uint256)public investerpackid; 
    mapping(uint256=>address) loanDetais;
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
     //address[] public spv_borrow_address;
     uint256 public spvloanid=0;
     //uint256[] public spv_loanid;
     //uint256[] public spv_token;
     struct spv_detail
        {
            
            uint256 initial_spv_ether;
            uint256 spv_loan;
            uint256 spv_send_ether;
            uint256 available_pack;
            uint256 send_pack;
           
        }
    struct package
        {
        uint256 package_id;
        uint256 totalvalue;
        }
        uint256 public packageid=0;
        uint256 public invespackid=0;
        
         mapping (address=>mapping(uint256=>package))public spvpackage;
         mapping (address=>mapping(uint256=>package))public investerpackage;
     struct Investor
        {
            uint256 Investor_ether;
            uint256 Investor_package;
            //mapping(address=>bool)investorsList;
        }
       // mapping(address=>bool) investorsList;
    
    
     mapping(address=>spv_detail)public spv_details;
     uint256 spv_loan_count;
     mapping(address=>Investor)public investor_details;
     address public choosefiadd;
     address public choosespvadd;
   // address[] cust;
    //mapping(address=>uint256) tknValue;
    uint256[] public Token_count;
    mapping(uint256=>mapping(uint256=>uint256))public packs;
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
         filn_get_id[bank_address] = loan_id;
        
        ln_get[msg.sender][ln_get_id[msg.sender]].bank_address = bank_address;
        ln_get[msg.sender][ln_get_id[msg.sender]].amount = amt;
        ln_get[msg.sender][ln_get_id[msg.sender]].months=12;
        ln_get[msg.sender][ln_get_id[msg.sender]].time=now;
        ln_get[msg.sender][ln_get_id[msg.sender]].last_setl_time=now;
        ln_get[msg.sender][ln_get_id[msg.sender]].installment=(amt)/(12);
        ln_get[msg.sender][ln_get_id[msg.sender]].bal_ln = amt;
        ln_get[msg.sender][ln_get_id[msg.sender]].id = ln_get_id[msg.sender];
        loanDetais[ln_get_id[msg.sender]]=msg.sender;
       
        ln_get[msg.sender][ln_get_id[msg.sender]].token = tokenvalue;
        ln_get[msg.sender][ln_get_id[msg.sender]].token_symbol = tokensymbol;
     
        ln_get[msg.sender][ln_get_id[msg.sender]].borr_address=msg.sender;
        
        
        filn_get[bank_address][filn_get_id[bank_address]].bank_address = bank_address;
        filn_get[bank_address][filn_get_id[bank_address]].amount = amt;
        filn_get[bank_address][filn_get_id[bank_address]].months=12;
        filn_get[bank_address][filn_get_id[bank_address]].time=now;
        filn_get[bank_address][filn_get_id[bank_address]].last_setl_time=now;
        filn_get[bank_address][filn_get_id[bank_address]].installment=(amt)/(12);
        filn_get[bank_address][filn_get_id[bank_address]].bal_ln = amt;
        filn_get[bank_address][filn_get_id[bank_address]].id = ln_get_id[msg.sender];
        loanDetais[ln_get_id[msg.sender]]=msg.sender;
       
        filn_get[bank_address][filn_get_id[bank_address]].token = tokenvalue;
        filn_get[bank_address][filn_get_id[bank_address]].token_symbol = tokensymbol;
      
        filn_get[bank_address][filn_get_id[bank_address]].borr_address=msg.sender;
        
        
         total_token_value += tokenvalue;
         total_token.push(ln_get[msg.sender][ln_get_id[msg.sender]].token);
         msg.sender.transfer(amt * 1 wei);
        // cust.push(msg.sender);
        //tknValue[msg.sender]=tokenvalue;
    }
    
    uint256 public bank_take_interest;
    uint256 public spv_take_interest;
    uint256 public spvamount;
    function settlement(uint ln_id,address fiaddress) public payable
    {
        uint temp_count=ln_get[msg.sender][ln_id].count;
        uint temp_month=ln_get[msg.sender][ln_id].months;
        uint temp_bal_ln=ln_get[msg.sender][ln_id].bal_ln;
        uint temp_ins=ln_get[msg.sender][ln_id].installment;
        uint temp_last=ln_get[msg.sender][ln_id].last_setl_time + 1 minutes;//30 days;
        address temp_bank_address=ln_get[msg.sender][ln_id].bank_address;
        require(temp_count<temp_month);
       uint intr=bank_d1[temp_bank_address].loan_interst;
        uint amt=( temp_bal_ln * (intr/100) ) ;
       uint256 amont=temp_ins+amt;
        ln_get[msg.sender][ln_id].last_setl_time = temp_last +1 minutes;//30 days;
        filn_get[fiaddress][ln_id].last_setl_time = temp_last +1 minutes;//30 days;
        ln_get[msg.sender][ln_id].bal_ln-=temp_ins;
        filn_get[fiaddress][ln_id].bal_ln-=temp_ins;
        ln_get[msg.sender][ln_id].count++;
        filn_get[fiaddress][ln_id].count++;
       if(sefi==1&&sespv==1&&seinv==0)
        {
        bank_take_interest=(amont *10)/100;
        bank_d1[reg_user[0]].bal +=bank_take_interest;
        spvamount=amont-bank_take_interest;
       
        spv_details[spv_add].initial_spv_ether +=spvamount;
        }
       
        if(sefi==1&&sespv==1&&seinv==1)
        {
            bank_take_interest=(amont *10)/100;
        bank_d1[reg_user[0]].bal +=bank_take_interest;
        
        spv_take_interest=((amont-bank_take_interest)*10)/100;
        spv_details[spv_add].initial_spv_ether +=spv_take_interest;
        uint256 balance_investor_amount=amont- (bank_take_interest+spv_take_interest);
        investor_details[investor_add].Investor_ether += balance_investor_amount;
        }
        
       if(sefi==1&&sespv==0&&seinv==0)
        {
           
              bank_d1[temp_bank_address].bal +=amont;
        }
         }
    function SPV_ether()public payable returns(string)
        {
            spv_add = msg.sender;
        if( spv_details[spv_add].initial_spv_ether == 0)
        {
                  sespv=1;
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
    function spvRegistered(address _spvad) public constant returns (bool) {
      return spv_details[_spvad].initial_spv_ether > 0;
    }
    function spvBalance(address _spv) public constant returns (uint256)
    {
        return spv_details[_spv].initial_spv_ether;
    }

function choosefinanceinstute(address choosefi)public
{
    choosefiadd=choosefi;
}
     function purchase_loan(uint256[] loanId)public returns(bool)    //purchase_loan(uint256 loan_id[])
        {
             require(spv_reg[0]==msg.sender);
           
        
            for(uint256 a=0;a<loanId.length;a++)
            {
             
                spvloanid++;
                spvln_get_id[msg.sender] = spvloanid;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].spvid=spvln_get_id[msg.sender];
        spvln_get[msg.sender][spvln_get_id[msg.sender]].bank_address = filn_get[choosefiadd][loanId[a]].bank_address;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].amount = filn_get[choosefiadd][loanId[a]].amount;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].months=filn_get[choosefiadd][loanId[a]].months;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].time=filn_get[choosefiadd][loanId[a]].time;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].last_setl_time=filn_get[choosefiadd][loanId[a]].last_setl_time;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].installment=filn_get[choosefiadd][loanId[a]].installment;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].bal_ln = filn_get[choosefiadd][loanId[a]].bal_ln;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].id =filn_get[choosefiadd][loanId[a]].id;
        loanDetais[ln_get_id[msg.sender]]=msg.sender;
       
        spvln_get[msg.sender][spvln_get_id[msg.sender]].token =filn_get[choosefiadd][loanId[a]].token;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].token_symbol =filn_get[choosefiadd][loanId[a]].token_symbol;
        spvln_get[msg.sender][spvln_get_id[msg.sender]].borr_address=filn_get[choosefiadd][loanId[a]].borr_address;
           
            spv_details[msg.sender].initial_spv_ether-=filn_get[choosefiadd][loanId[a]].amount;
         
            bank_d1[choosefiadd].bal+=filn_get[choosefiadd][loanId[a]].amount;
          
            }
            spv_details[spv_add].spv_loan=spvloanid;
            return true;
    
        }
    function Investor_ether()public payable
        {
            seinv=1;
         investor_add = msg.sender;
         investor_details[investor_add].Investor_ether=msg.value;
       
        }
        function investerRegistered(address _investadd) public constant returns (bool) {
      return investor_details[_investadd].Investor_ether > 0;
    }
    function investerBalance(address _invest) public constant returns (uint256)
    {
        return investor_details[_invest].Investor_ether;
    }
        function choosespv(address choose_spv)public 
          {
             choosespvadd=choose_spv;
              }

        function createPacking(uint256[] _loanId)public //returns(uint256[])
        {
            uint256 totalTokenCost=0;
            for(uint256 a=0;a<_loanId.length;a++)
            {
                totalTokenCost+=spvln_get[msg.sender][_loanId[a]].amount;
            }
            
            packageid++;
           spvpackid[msg.sender]=packageid;
            spv_details[spv_add].available_pack=packageid;
           spvpackage[msg.sender][spvpackid[msg.sender]].package_id=spvpackid[msg.sender];
           spvpackage[msg.sender][spvpackid[msg.sender]].totalvalue=totalTokenCost;
          
            
           
        }
        function purchase_pack(uint256[] _packindex)public
        {
                       uint256 totalpackagevalue=0;
            for(uint256 a=0;a<_packindex.length;a++)
            {
                totalpackagevalue+=spvpackage[choosespvadd][_packindex[a]].totalvalue;
            }
            invespackid++;
            investerpackid[msg.sender]=invespackid;
            investerpackage[msg.sender][investerpackid[msg.sender]].package_id=investerpackid[msg.sender];
            investerpackage[msg.sender][investerpackid[msg.sender]].totalvalue=totalpackagevalue;
            spv_details[choosespvadd].initial_spv_ether+=investerpackage[msg.sender][investerpackid[msg.sender]].totalvalue;
            investor_details[msg.sender].Investor_ether-=investerpackage[msg.sender][investerpackid[msg.sender]].totalvalue;
             investor_details[msg.sender].Investor_package=invespackid;
            
        }
}