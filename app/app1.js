// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import Financial_artifacts from '../../build/contracts/Financial.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Bank = contract(Financial_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Bank.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
    });

    $("#new_fin").click(function()
    {
      var bal;
      web3.eth.getBalance(web3.eth.accounts[0], function(error, result) 
      {
        bal = web3.fromWei(result.toNumber()); 
        $("#result").html('');
        $("#result").html('<font face="verdana" size="3"><i><b>Metamask Address</b></i></font>\
        <input type="text" placeholder="Metamask Address" id="metamask_adddress" value='+web3.eth.accounts[0]+'>\
        <font face="verdana" size="3"><i><b>Total Amount Eth</b></i></font>\
        <br><input type="text" placeholder="Amount" name="_amount" id="amount" value='+bal+' /><br>\
        <font face="verdana" size="3"><i><b>Enter the deposit amount </b></i></font>\
        <input type="text" placeholder="Enter the ether" name="Enter_amount" id="amount1" />\
        <font face="verdana" size="3"><i><b>Rate Of Interest</b></i></font><input type="text" placeholder="Rate of interest" name="Interest" id="interest">\
        <br><font face="verdana" size="3"><i><b>Loan Duration</b></i></font><input type="text" placeholder="Monthly payment" name="montpay" id="duration">\
        <input id="register" onclick="App.register();" type="button" class="btn btn-success" value="Register" />\
        <button type="submit" class="btn btn-danger">Cancel</button>');
        });
    });

    $("#select_fin").click(function(){

      var bal;
      web3.eth.getBalance(web3.eth.accounts[0], function(error, result) {
        bal = web3.fromWei(result.toNumber()); 
        $("#result").html('');
        $("#result").html('<html lang="en"><br><head><title>Bootstrap Example</title><br><meta charset="utf-8">\
        <br><meta name="viewport" content="width=device-width, initial-scale=1">\
        <br><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\
        <br><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\
        <br><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\
        <br><script src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>\
        <br><script src="./app.js"></script>\
        <br></head><br>\
        <body class="body"onload="func1()">\
        <div class="container">\
        <br><br><br><br><br><br>\
         <center> <h2>List Of Financial Institution</h2></center>\
                  <table id="itemList" class="table table-hover">\
            <thead>\
              <tr>\
                <th>Lender Address</th>\
                <th>Ether Amount</th>\
                <th>Rate Of Interest</th>\
                <th>Installment</th>\
                <th></th>\
               </tr>\
            </thead>\
            <tbody>\
        <tbody>\
        <tr id="myRect1">\
        <td id="myRect1.shape"></td>\
        <td id="myRect1.width"></td>\
        <td id="myRect1.height"></td>\
        <td id="myRect1.area"></td>\
        <td><a href="#" id="loan_req">Loan</a></td>\
        </tr>\
              </tbody>\
          </table>\
        </div>\
       </body>\
        </html>');
        });
    });
    $("#loan_req").click(function()
    {
      $("#result").html('');
      $("#result").html(' <button="borrowMoney()">Borrow</button>\
      <font face="verdana" size="3"><i><b>Borrower Address</b></i></font>\
      <input type="text" id="acc_add" placeholder="Account Address">\
      <input type="text" id="token" placeholder="Enter tokens">\
      <font face="verdana" size="3"><i><b>Token</b></i></font>\
      <button="sendMonthlypayment()">Monthly payment</button>\
      <button="borrowMoney">Borrow</button>\
      <input type="text" >');

    })

   $("#payment").click(function()
   {
     $("#result").html('');
     $("#result").html(' <button="borrowMoney()">Borrow</button>\
     <font face="verdana" size="3"><i><b>Borrower Address</b></i></font>\
     <input type="text" id="acc_add" placeholder="Account Address">\
     <input type="text" id="token" placeholder="Enter tokens">\
     <font face="verdana" size="3"><i><b>Token</b></i></font>\
     <button="sendMonthlypayment()">Monthly payment</button>\
     <button="borrowMoney">Borrow</button>\
     <input type="text" >');
     /*$("#result").html('<label for="lid">Loan Id</label>\
     <input type="text" id="lid" name="LoanId" placeholder="Your loan id.." required><br><br>\<label for="lamount">Amount</label>\
     <input type="text"  id="lamount" name="Amount"  placeholder="Your loan amount"><br><br>\
    <button type="submit" onclick="App.payment()" class="btn btn-success">Pay</button>\<button type="submit" onclick="window.location.href = " class="btn btn-danger">Cancel</button>');*/

   })

  

    //this.showBalance();

  // $("#deposit-bank").click(function(event) 
  // {

  //   var self = this;

  //   var deposit_amount = parseInt(document.getElementById("deposit-amount").value);

  //   $("#status").html("Initiating transaction... (please wait)");

  //   Bank.deployed().then(function(instance) {
  //     console.log(web3.toWei(deposit_amount, 'ether'));
  //     return instance.deposit({from: account, gas: 6000000, value: web3.toWei(deposit_amount, 'ether')});
  //   }).then(function() {
  //     $("#status").html("Transaction complete!");
  //     App.showBalance();
  //   }).catch(function(e) {
  //     console.log(e);
  //     $("#status").html("Error in transaction; see log.");
  //   });
  // });

  // $("#register-bank").click(function(event) {

  //   var self = this;

  //   var loan_interest = parseInt(document.getElementById("interest").value);
  //   var loan_duration = parseInt(document.getElementById("duration").value);
    
  //   //var deposit_interest = parseInt(document.getElementById("deposit-interest").value);
  //   //var bank_name = document.getElementById("bank-name").value;

  //   $("#status").html("Initiating transaction... (please wait)");

  //   Bank.deployed().then(function(instance) 
  //   {
  //     return instance.register(bank_name, deposit_interest, loan_interest, interest, {from: account, gas: 6000000});
  //   }).then(function() 
  //   {
  //     $("#status").html("Transaction complete!");
  //     App.showBalance();
  //   }).catch(function(e) 
  //   {
  //     console.log(e);
  //     $("#status").html("Error in transaction; see log.");
  //   });
  // });
  },

  // $("#register").click(function(){
  //   alert("hai");
  // });

  register : function()
  {
    var self = this;
    var bank;
    var m_address = web3.eth.accounts[0];
    var bal = parseInt($("#amount").val());
    var interest = parseInt($("#interest").val());
    var duration = parseInt($("#duration").val());
    var amount=parseInt($("#amount1").val());
    //console.log(m_address,bal,interest,duration)
    
  Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.register(interest,duration,{from: account, gas: 6000000, value: web3.toWei(amount, 'ether')});
  }).then(function(val) 
  {
        console.log(val);
        // if (val == true) {
        //   $("#bank-info").html("This bank has registered");
        // } else {
        //   $("#bank-info").html("This bank has not registered yet");
        // }
        // return bank.fetchBalance(account);
      })
  },

    payment:function()
    {
        var id=parseInt($("#").val());;
        var pay=parseInt($("#").val());;
        Bank.deployed().then(function(instance) {
        bank = instance;
        return instance.monthlypayment(id,pay);
    }).then(function(val) {
          console.log(val);
          // if (val == true) {
          //   $("#bank-info").html("This bank has registered");
          // } else {
          //   $("#bank-info").html("This bank has not registered yet");
          // }
          // return bank.fetchBalance(account);
        })
  },
 



  // showBalance: function() {
  //   var self = this;

  //   var bank;
    
  //   Bank.deployed().then(function(instance) {
  //     bank = instance;
  //     return instance.isRegistered(account);
  //   }).then(function(val) {
  //     console.log(val);
  //     if (val == true) {
  //       $("#bank-info").html("This bank has registered");
  //     } else {
  //       $("#bank-info").html("This bank has not registered yet");
  //     }
  //     return bank.fetchBalance(account);
  //   }).then(function(val) {
  //     $("#balance-address").html("This bank's balance is " + val);
  //   }).catch(function(e) {
  //     console.log(e);
  //   });
  // },

};

window.addEventListener('load', function() 
{
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined')
  {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } 
  else 
  {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});
