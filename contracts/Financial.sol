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
        bool sold;
    }
    
    mapping (address=>mapping(uint256=>loan_get))public ln_get;
    mapping(address=>uint256)public ln_get_id;
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
     address[] public spv_borrow_address;
     
     uint256[] public spv_loanid;
     mapping(uint256=>uint256) public spv_token;
     struct spv_detail
        {
            
            uint256 initial_spv_ether;
            
            uint256 spv_loan;
            uint256 spv_send_ether;
            uint256 available_pack;
            uint256 send_pack;
           
        }
    
     struct Investor
        {
            uint256 Investor_ether;
            uint256 package_count;
            uint256[] package_id;
            uint256[] package_token;
           // mapping(uint256=>);
            mapping(address=>bool) investorsList;
        }
    mapping (address=>mapping(uint256=>loan_pro))public ln_pro;
    mapping(address=>uint256)public ln_pro_count;
    
     mapping(address=>spv_detail)public spv_details;
     uint256 spv_loan_count;
     mapping(address=>Investor)public investor_details;

    address[] public cust;
    mapping(address=>bool) borr;
    mapping(address=>uint256) tknValue;
    uint256[] public Token_count;
    
    uint256[] pa;
    mapping(uint256=>mapping(uint256=>uint256[]))public packing;
    uint256 packIndex=1;
    uint256[] public pack;
    mapping(uint256=>uint256) public packCost;
    mapping(uint256=>address) public packOwner;
    mapping(uint256=>bool) public spv_send_pack;
        
    function req_loan(address bank_address,uint256 tokenvalue,string tokensymbol) public payable   // add token_symbol
    {   
        
         
        uint256 amt = ((tokenvalue * 1000000000000000000 wei)*80 / 100);

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
        loanDetais[ln_get_id[msg.sender]]=msg.sender;
       
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
        

        msg.sender.transfer(amt);
        
        if(!borr[msg.sender])
        {
            cust.push(msg.sender);
            borr[msg.sender]=true;
        }
        tknValue[msg.sender]=tokenvalue;
    }
    function borrowertotal()public view returns(uint256)
    {
        return cust.length;
    }
    
    function settlement(uint ln_id) public payable
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

        
        if(bank_d1[reg_user[0]].spvList[spv_add])
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
         spv_details[spv_add].available_pack=0;
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
    function spvRegistered() public constant returns (bool) {
      return spv_details[msg.sender].initial_spv_ether > 0;
    }
    function spvBalance(address _spv) public constant returns (uint256)
    {
        return spv_details[_spv].initial_spv_ether;
    }
    
     function purchase_loan(uint256[] loanId)public returns(bool)    //purchase_loan(uint256 loan_id[])
        {
             require(spv_reg[0]==msg.sender);
            uint256 _loanId=0;
            address _borrower=0;
            //if(loanId.length!=borrower.length)
              //  return false;
        
            for(uint256 a=0;a<loanId.length;a++)
            {
                _loanId=loanId[a];
                _borrower=loanDetais[_loanId];
            uint256 TKN_Amount=ln_get[_borrower][_loanId].token;
            spv_loanid.push(_loanId);
            spv_details[spv_add].initial_spv_ether-=TKN_Amount;
            spv_details[spv_add].spv_send_ether+=TKN_Amount;
            bank_d1[reg_user[0]].bal+=TKN_Amount;
            reg_user[0].transfer(TKN_Amount);
            spv_details[spv_add].spv_loan++;
            ln_get[msg.sender][ln_get_id[msg.sender]].sold=true;
            spv_borrow_address.push(_borrower);
            spv_token[_loanId]=(ln_get[_borrower][_loanId].token);
            }
            return true;
    
        }
    function Investor_ether()public payable
        {
         investor_add = msg.sender;
         investor_details[investor_add].Investor_ether=msg.value;
         investor_details[investor_add].investorsList[investor_add]=true;
        }
      /*  function pack()public  
        {
            require(spv_add==msg.sender);
            uint256 c=spv_loanid.length;
            uint256 packing=0;
            if((c%2)==0)
            {
                c=c/2;
            }
            else
            {
                c=(c-1)/2;
            }
            for(uint256 a=0;a<c;a++)
            {
                packs[a][0]=spv_token[packing];
                packing++;
                packs[a][1]=spv_token[packing];
                packing++;
            }
            
            
    
        }
        */
        
        // function send_package(uint256 index)public
        // {
        //     investor_details[investor_add].Investor_package += 1;
        //     investor_details[investor_add].Investor_ether -=pack[index];
        //     spv_details[spv_add].initial_spv_ether += pack[index];
        //     spv_details[spv_add].spv_loan -= pack[index];
        //     spv_details[spv_add].available_pack -= 1;
        //     spv_details[spv_add].send_pack += 1;
        // }
        function get_spv_details()public view returns(address,uint256[],address[],uint256[])
        {
            uint256[] _tokens;
            for(uint256 a=0;a<spv_loanid.length;a++)
            {
                _tokens.push(spv_token[a]);
            }
            require(spv_reg[0]==msg.sender);
            return (spv_add,spv_loanid,spv_borrow_address,_tokens);
        }
        function createPacking(uint256[] _loanId)public //returns(uint256[])
        {
            uint256 totalTokenCost=0;
            for(uint256 a=0;a<_loanId.length;a++)
            {
                totalTokenCost+=spv_token[_loanId[a]];
            }
            packing[packIndex][totalTokenCost]=_loanId;
            packCost[packIndex]=totalTokenCost;
            spv_details[spv_add].available_pack+=1;
            packOwner[packIndex]=spv_add;
            spv_send_pack[packIndex]=true;
            packIndex++;
            
            //return(packing[packIndex][totalTokenCost]);
        }
        function get_pack(uint256 _pack_index)public view returns(uint256[],uint256)
        {
            return (packing[_pack_index][packCost[_pack_index]],packCost[_pack_index]);
        }
        function purchase_pack(uint256 _packindex)public
        {
            investor_details[investor_add].Investor_ether-=packCost[_packindex];
            spv_details[spv_add].initial_spv_ether+=packCost[_packindex];
            investor_details[investor_add].package_count+=1;
            investor_details[investor_add].package_token.push(packCost[_packindex]);
            spv_details[spv_add].send_pack+=1;
            packOwner[_packindex]=investor_add;
            spv_send_pack[packIndex]=false;
        }
        // function spvloanDetails()public returns(address[],uint256[])
        // 
            
        //     for(uint256 b=0;b<cust.length;b++)
        //     {
        //         Token_count.push(tknValue[cust[b]]);
        //     }
        //     return (cust,Token_count);
        // }
        
}
