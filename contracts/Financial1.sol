pragma solidity^0.4.0;

contract financial  {
    
    uint256 FI_interest;
    uint256 FI_duration;
    uint256 initial_financial_ether;
    uint256 loan_count;
    address financial_institution;
    address spv_add;
    uint256 pack;
    uint256[] total_loan;
    uint256[]  spv_loan;
    uint256 return_ether;
    uint256 initial_spv_ether;
    uint256 initial_investor_ether;
    uint256 bank_take_interest;
    uint256 spv_take_interest;
    uint256 balance_amount_investor;
     mapping(address => uint256)balance;
    function financial () public {
        financial_institution =msg.sender;
    }
    struct loandetails
    {
        address borrower;
        uint256 loanamount;
        uint256 token;
        uint256 duration;
        uint256 tot_amount;
        
    }
    mapping(address=> loandetails)public detail;
 
    
    function register(uint256 interest,uint256 duration)public payable
    {
        initial_financial_ether = msg.value;
        FI_interest=interest;
        FI_duration=duration;
    }
    function existing()public view returns(address,uint256,uint256,uint256,uint256)
    {
         return(financial_institution,initial_financial_ether,FI_interest,FI_duration,loan_count);
    }
    
    
    function borrowMoney(uint256 tokenvalue)public payable
    {
       
        detail[msg.sender].borrower = msg.sender;
        detail[msg.sender].token = tokenvalue;
        detail[msg.sender].loanamount = ((tokenvalue * 80 / 100)) ;
        total_loan.push(tokenvalue);
        detail[msg.sender].duration = 12;
        loan_count +=1;
        msg.sender.transfer(detail[msg.sender].loanamount * 1 ether);
        initial_financial_ether -= detail[msg.sender].loanamount;
        CalculateMonthlypayment();
    }
    
  
    
    function CalculateMonthlypayment()public payable
    {
        uint256 monthlypayment = detail[msg.sender].loanamount / FI_duration;
        uint256 interest = ((detail[msg.sender].loanamount*10) /100 )/ FI_duration;
        detail[msg.sender].tot_amount = monthlypayment+interest;
        detail[msg.sender].loanamount -=  detail[msg.sender].tot_amount;
    }
    
    function sendMonthlypayment(address financialinstitution)public payable
    {
        
        financialinstitution.transfer(msg.value);
        initial_financial_ether +=  detail[msg.sender].tot_amount;
        
        if(spv_loan.length != 0)
        {
         bank_take_interest=( detail[msg.sender].tot_amount*10)/100;
        initial_financial_ether+=bank_take_interest;
        
        spv_take_interest=(( detail[msg.sender].tot_amount-bank_take_interest)*10)/100;
        initial_spv_ether +=spv_take_interest;
        }
        
        if(loan_count/3 !=0)
        {
        balance_amount_investor=( detail[msg.sender].tot_amount-bank_take_interest)-spv_take_interest;
        initial_investor_ether += balance_amount_investor;
        }
     
     }
    function ViewLoanamount()public view returns(uint256,uint256)
    {
        return( detail[msg.sender].loanamount,detail[msg.sender].tot_amount);
    }
    
    function sell_loan()public payable
    {
        spv_loan = total_loan;
        return_ether = spv_loan.length * 10 ether;
        initial_financial_ether +=return_ether;
        initial_spv_ether -=return_ether;
    }
   
    function SPV_ether()public payable
    {
         spv_add = msg.sender;
        initial_spv_ether = msg.value;
    }
     
    function spv_details()public view returns(uint256[],uint256,uint256)
    {
        return(spv_loan,return_ether,initial_spv_ether);
    }
    


    function investor_ether()public payable
    {
        initial_investor_ether = msg.value;
    }
    
    function view_Package()public view returns(uint256)
    {
      
         return(loan_count / 3);
         
    }
    
    function send_package(uint256 package)public
    {
        pack = package;
        spv_loan.length -= 3*pack;
        initial_spv_ether += pack*3 * 10 ether;
        initial_investor_ether -=pack*3 * 10 ether;
    }
    
    function Investor_detail()public view returns(uint256)
    {
        return(initial_investor_ether);
    }
    function view_investor_package () public view returns(uint256)
    {
        return(pack);
    }
}

   

   
