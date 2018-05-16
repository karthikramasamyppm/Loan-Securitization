pragma solidity ^0.4.13;
import "./LoanToken.sol";
contract Financial
{
    struct bank_Details
    {
        bytes32 name;
        uint256 bal;
        uint256 time;
        uint256 loan_interst;
        uint256 fi_id;
        uint256 filn_id;
    }
    struct loanaddress
    {
        address spv;
        address invs;
        uint256[] packloan; 
    }
    struct loan_get
    { 
        uint256 id;
        uint256 token;
        bytes32 token_symbol;
        address bank_address;
        address borr_address;
        uint256 amount;
        uint256 count;
        uint months;
        uint256 spvid;
        address token_address;       
    }
     struct spv_detail
    {
            uint256 initial_spv_ether;
            uint256 spv_loan;
            uint256 available_pack;
            uint256 spv_id;
            uint256 spvlnid;
            uint256 packln_id;
            uint256 packid;
    }
   /* struct package
    {
        uint256 id;
        uint256  token;
        uint256  amount;
        uint256  count;
    }*/
     mapping(address=>bank_Details) public bank_d1;
     mapping(uint256=>loanaddress) public loanadd;
     mapping (address=>mapping(uint256=>loan_get))public ln_get;
    // mapping (address=>mapping(uint256=>package))public  ln_get;
     mapping(address=>spv_detail)public spv_details;
   //  mapping(uint256 => mapping(uint256 =>uint256))public packageivd;
     address[] public spv_reg;
     address[] public invs_reg;
     address[]  reg_user;
     uint256 loan_id = 101;
     uint256 spvloanid=1001;
     uint256 packageid=10001;
     uint256 invespackid=100001;
     uint256 bank_take_interest;
     uint256 spv_take_interest;
     uint256 spvamount;
     function register(bytes32 name,uint _loan_interst,uint _time)public payable
    {
            bank_d1[msg.sender].name = name;
            bank_d1[msg.sender].loan_interst = _loan_interst;
            bank_d1[msg.sender].bal = msg.value;
            bank_d1[msg.sender].time = _time;
            bank_d1[msg.sender].fi_id =loan_id ;
            bank_d1[msg.sender].filn_id =loan_id ;
            reg_user.push(msg.sender);
            loan_id+=100;
    }
    function show_registers() public view returns(address[],address[],address[])
    {
        return (reg_user,spv_reg,invs_reg);
    }
    function req_loan(address _token,address bank_address,uint256 tokenvalue,bytes32 tokensymbol) public //payable   // add token_symbol
    {   
        LoanToken(_token).transferFrom(msg.sender,bank_address,tokenvalue);
        bank_d1[bank_address].bal -= ((tokenvalue * 1 ether)*80 / 100);
        ln_get[bank_address][ bank_d1[bank_address].fi_id].bank_address = bank_address;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].amount =  ((tokenvalue * 1 ether)*80 / 100);
        ln_get[bank_address][ bank_d1[bank_address].fi_id].months=12;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].id =  bank_d1[bank_address].fi_id;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].token = tokenvalue;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].token_symbol = tokensymbol;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].token_address = _token;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].borr_address=msg.sender;
        msg.sender.transfer( ((tokenvalue * 1 ether)*80 / 100) * 1 wei);
        bank_d1[bank_address].fi_id+=1;
    }
    function settlement(uint256 ln_id,address fiaddress) public payable
    {
        uint temp_ins= ((ln_get[fiaddress][ln_id].token * 1 ether)*80 / 100)/(12);
        uint temp_bal_ln= ln_get[fiaddress][ln_id].count*temp_ins;
        uint intr=bank_d1[fiaddress].loan_interst;
        uint amt=( temp_bal_ln * (intr/100) );
        uint256 amont=temp_ins+amt;
        ln_get[fiaddress][ln_id].count+=1;
       if(ln_get[fiaddress][ln_id].id>0&&ln_get[loanadd[ln_id].spv][ln_id].id>0&& ln_get[loanadd[ln_id].invs][ln_id]. count>0)         
        {
        bank_take_interest=(amont *10)/100;
        bank_d1[fiaddress].bal +=bank_take_interest;
        spv_take_interest=((amont-bank_take_interest)*10)/100;
        spv_details[loanadd[ln_id].spv].initial_spv_ether +=spv_take_interest;
        uint256 balance_investor_amount=amont- (bank_take_interest+spv_take_interest);
        spv_details[loanadd[ln_id].invs].initial_spv_ether += balance_investor_amount;
        } 
       else if(ln_get[fiaddress][ln_id].id>0&&ln_get[loanadd[ln_id].spv][ln_id].id>0) 
         {
        bank_take_interest=(amont *10)/100;
        bank_d1[fiaddress].bal +=bank_take_interest;
        spvamount=amont-bank_take_interest; 
        spv_details[loanadd[ln_id].spv].initial_spv_ether +=spvamount;
        }
       else         
        {
              bank_d1[fiaddress].bal +=amont;
        }
    }
    function SPV_ether()public payable
    {
         spv_details[msg.sender].initial_spv_ether=msg.value;
         spv_details[msg.sender].spv_id=spvloanid;
         spv_details[msg.sender].spvlnid=spvloanid;
         spv_details[msg.sender].packln_id=packageid;
         spv_details[msg.sender].packid=packageid;
         packageid+=10000;
         spvloanid+=1000;
         spv_reg.push(msg.sender);
    }
    function purchase_loan(uint256 loanId,address FI)public payable   
    {
               loanadd[loanId].spv=msg.sender;
               ln_get[FI][loanId].spvid=spv_details[msg.sender].spvlnid;
               ln_get[msg.sender][spv_details[msg.sender].spvlnid].bank_address = ln_get[FI][loanId].bank_address;
               ln_get[msg.sender][spv_details[msg.sender].spvlnid].amount = ln_get[FI][loanId].amount;
               ln_get[msg.sender][spv_details[msg.sender].spvlnid].id =ln_get[FI][loanId].id;
               ln_get[msg.sender][loanId].id =ln_get[FI][loanId].id;
               ln_get[msg.sender][spv_details[msg.sender].spvlnid].token_address =ln_get[FI][loanId].token_address;
               spv_details[msg.sender].initial_spv_ether-=ln_get[FI][loanId].amount;
               bank_d1[FI].bal+=ln_get[FI][loanId].amount;
               LoanToken(ln_get[FI][loanId].token_address).transferFrom(FI,msg.sender,ln_get[FI][loanId].token);  
               spv_details[msg.sender].spvlnid=spv_details[msg.sender].spvlnid+1;
               spv_details[msg.sender].spv_loan=(spv_details[msg.sender].spvlnid)-spv_details[msg.sender].spv_id;
    }
      function spv_registers() public view returns(address[])
    {
        return spv_reg;
    }
    function Investor_ether()public payable
        {
         invs_reg.push(msg.sender);
         spv_details[msg.sender].initial_spv_ether=msg.value;
         spv_details[msg.sender].packln_id=invespackid;
         spv_details[msg.sender].packid=invespackid;
         invespackid+=100000;
        }
    function createPacking(uint256[] _loanId)public  //returns(uint256[])
    {
            uint256 totalTokenCost=0;
            for(uint256 a=0;a<_loanId.length;a++)
            {
                totalTokenCost+=ln_get[msg.sender][_loanId[a]].amount;
                loanadd[spv_details[msg.sender].packid].packloan.push(_loanId[a]);
                //packageivd[spv_details[msg.sender].packid][a]=_loanId[a];
            }
            ln_get[msg.sender][spv_details[msg.sender].packid].id=spv_details[msg.sender].packid;
            ln_get[msg.sender][spv_details[msg.sender].packid]. token=totalTokenCost;
            ln_get[msg.sender][spv_details[msg.sender].packid]. amount=_loanId.length;
           spv_details[msg.sender].packid=spv_details[msg.sender].packid+1;
           spv_details[msg.sender].available_pack=spv_details[msg.sender].packid-spv_details[msg.sender].packln_id;
    }
    function purchase_pack(uint256 _packindex,address choosespvadd)public 
    {
                for(uint256 b=0;b< ln_get[choosespvadd][_packindex]. amount;b++)
                {
                     loanadd[ln_get[choosespvadd][loanadd[_packindex].packloan[b]].id].invs=msg.sender;
                     ln_get[msg.sender][ln_get[choosespvadd][loanadd[_packindex].packloan[b]].id]. count=ln_get[choosespvadd][loanadd[_packindex].packloan[b]].id;
                    LoanToken(ln_get[choosespvadd][loanadd[_packindex].packloan[b]].token_address).transferFrom(choosespvadd,msg.sender, ln_get[choosespvadd][loanadd[_packindex].packloan[b]].token);
                }
             ln_get[msg.sender][spv_details[msg.sender].packid].id=spv_details[msg.sender].packid;
             ln_get[msg.sender][spv_details[msg.sender].packid]. token+= ln_get[choosespvadd][_packindex]. token;
            spv_details[choosespvadd].initial_spv_ether+= ln_get[msg.sender][spv_details[msg.sender].packid]. token;
            spv_details[msg.sender].initial_spv_ether-= ln_get[msg.sender][spv_details[msg.sender].packid]. token;
            spv_details[msg.sender].packid=spv_details[msg.sender].packid+1;
            spv_details[msg.sender].available_pack=spv_details[msg.sender].packid-spv_details[msg.sender].packln_id;
    }
}