pragma solidity ^0.4.13;
import "./LoanToken.sol";
contract Financial
{
    struct bank_Details
    {
        string name;
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
    }
    struct loan_get
    { 
        uint256 id;
        uint256 token;
        string token_symbol;
        address bank_address;
        address borr_address;
        uint256 amount;
        uint256 count;
        //uint last_setl_time;
       // uint time;
        uint months;
        uint bal_ln;
        uint installment;
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
    struct package
    {
        uint256 package_id;
        uint256 totalvalue;
        uint256 totalloan;
        uint256 packln;
       // uint256 spvpack;
        //bool loandetails;
    }
   /* struct Investor
    {
            uint256 Investor_ether;
            uint256 Investor_package;
            uint256 Invsid;
            uint256 invslnid;
    }*/
     mapping(address=>bank_Details) public bank_d1;
     mapping(uint256=>loanaddress) public loanadd;
     mapping (address=>mapping(uint256=>loan_get))public ln_get;
    // mapping(address=>uint256)public ln_get_id;
    // mapping(address=>uint256)public packln_get_id;
     mapping (address=>mapping(uint256=>package))public packagedetail;
     mapping(address=>spv_detail)public spv_details;
     mapping(address=>address[]) public storefi;
     mapping(address=>address[]) public storespvfi;
   //  mapping(address=>Investor)public investor_details;
     mapping(uint256 => mapping(uint256 =>uint256))public packageivd;
     address[] public spv_reg;
     address[] public invs_reg;
     address[]  reg_user;
     uint256 loan_id = 101;
     uint256 spvloanid=1001;
     uint256 packageid=10001;
     uint256 invespackid=100001;
     //uint256 spvamount;
     function register(string name,uint _loan_interst,uint _time)public payable
    {
            bank_d1[msg.sender].name = name;
            bank_d1[msg.sender].loan_interst = _loan_interst;
            bank_d1[msg.sender].bal = msg.value;
            bank_d1[msg.sender].time = _time;
            bank_d1[msg.sender].fi_id =loan_id ;
            bank_d1[msg.sender].filn_id =loan_id ;
            reg_user.push(msg.sender);
            loan_id=loan_id+100;
    }
    function show_registers() public view returns(address[])
    {
        return reg_user;
    }
    function req_loan(address _token,address bank_address,uint256 tokenvalue,string tokensymbol) public //payable   // add token_symbol
    {   
         storefi[msg.sender].push(bank_address);
        //uint256 amt = ((tokenvalue * 1 ether)*80 / 100);
        LoanToken(_token).transferFrom(msg.sender,bank_address,tokenvalue);
        bank_d1[bank_address].bal -= ((tokenvalue * 1 ether)*80 / 100);
        loan_id++;
        //ln_get_id[bank_address] =  bank_d1[bank_address].fi_id;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].bank_address = bank_address;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].amount =  ((tokenvalue * 1 ether)*80 / 100);
        ln_get[bank_address][ bank_d1[bank_address].fi_id].months=12;
      //  ln_get[bank_address][ln_get_id[bank_address]].time=now;
      //  ln_get[bank_address][ln_get_id[bank_address]].last_setl_time=now;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].installment= ((tokenvalue * 1 ether)*80 / 100)/(12);
        ln_get[bank_address][ bank_d1[bank_address].fi_id].bal_ln =  ((tokenvalue * 1 ether)*80 / 100);
        ln_get[bank_address][ bank_d1[bank_address].fi_id].id =  bank_d1[bank_address].fi_id;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].token = tokenvalue;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].token_symbol = tokensymbol;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].token_address = _token;
        ln_get[bank_address][ bank_d1[bank_address].fi_id].borr_address=msg.sender;
        msg.sender.transfer( ((tokenvalue * 1 ether)*80 / 100) * 1 wei);
        bank_d1[bank_address].fi_id= bank_d1[bank_address].fi_id+1;
    }
    function settlement(uint256 ln_id,address fiaddress) public payable
    {
        uint256 bank_take_interest; 
        uint256 spv_take_interest;
        //uint intr=bank_d1[fiaddress].loan_interst;
       // uint amt=( ln_get[msg.sender][ln_id].bal_ln * (bank_d1[fiaddress].loan_interst/100) ) ;
        uint256 amont=ln_get[msg.sender][ln_id].installment+( ln_get[msg.sender][ln_id].bal_ln * (bank_d1[fiaddress].loan_interst/100) );
       // ln_get[msg.sender][ln_id].bal_ln-=ln_get[msg.sender][ln_id].installment;
        ln_get[fiaddress][ln_id].bal_ln-=ln_get[msg.sender][ln_id].installment;
       // ln_get[msg.sender][ln_id].count++;
        ln_get[fiaddress][ln_id].count++;
       if(ln_get[fiaddress][ln_id].id>0&&ln_get[loanadd[ln_id].spv][ln_id].id>0&&packagedetail[loanadd[ln_id].invs][ln_id].packln>0)         
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
        spv_details[loanadd[ln_id].spv].initial_spv_ether +=(amont-bank_take_interest);
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
         packageid=packageid+10000;
         spvloanid=spvloanid+1000;
         spv_reg.push(msg.sender);
       
    }
    function purchase_loan(uint256 loanId,address FI)public payable   
    {
          storespvfi[msg.sender].push(FI);
                loanadd[loanId].spv=msg.sender;
            // ln_get_id[msg.sender] =spv_details[msg.sender].spvlnid;
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
         invespackid=invespackid+100000;
        }
    function createPacking(uint256[] _loanId)public //returns(uint256[])
    {
            uint256 totalTokenCost=0;
           //packln_get_id[msg.sender]= spv_details[msg.sender].packid;
            for(uint256 a=0;a<_loanId.length;a++)
            {
                totalTokenCost+=ln_get[msg.sender][_loanId[a]].amount;
                packageivd[spv_details[msg.sender].packid][a]=_loanId[a];
            }
           packagedetail[msg.sender][spv_details[msg.sender].packid].package_id=spv_details[msg.sender].packid;
           packagedetail[msg.sender][spv_details[msg.sender].packid].totalvalue=totalTokenCost;
           packagedetail[msg.sender][spv_details[msg.sender].packid].totalloan=_loanId.length;
           spv_details[msg.sender].packid=spv_details[msg.sender].packid+1;
           spv_details[msg.sender].available_pack=spv_details[msg.sender].packid-spv_details[msg.sender].packln_id;
    }
    function purchase_pack(uint256 _packindex,address choosespvadd)public 
    {
             
                for(uint256 b=0;b<packagedetail[choosespvadd][_packindex].totalloan;b++)
                {
                     loanadd[ln_get[choosespvadd][packageivd[_packindex][b]].id].invs=msg.sender;
                    packagedetail[msg.sender][ln_get[choosespvadd][packageivd[_packindex][b]].id].packln=ln_get[choosespvadd][packageivd[_packindex][b]].id;
                    LoanToken(ln_get[choosespvadd][packageivd[_packindex][b]].token_address).transferFrom(choosespvadd,msg.sender, ln_get[choosespvadd][packageivd[_packindex][b]].token);
                }
           // packagedetail[msg.sender][_packindex].spvpack=_packindex;
              //packln_get_id[msg.sender]=spv_details[msg.sender].packid;
            packagedetail[msg.sender][spv_details[msg.sender].packid].package_id=spv_details[msg.sender].packid;
            packagedetail[msg.sender][spv_details[msg.sender].packid].totalvalue+=packagedetail[choosespvadd][_packindex].totalvalue;
            spv_details[choosespvadd].initial_spv_ether+=packagedetail[msg.sender][spv_details[msg.sender].packid].totalvalue;
            spv_details[msg.sender].initial_spv_ether-=packagedetail[msg.sender][spv_details[msg.sender].packid].totalvalue;
            spv_details[msg.sender].packid=spv_details[msg.sender].packid+1;
            spv_details[msg.sender].available_pack=spv_details[msg.sender].packid-spv_details[msg.sender].packln_id;
    }
}