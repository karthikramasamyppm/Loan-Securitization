/*// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import bank_artifacts from '../../build/contracts/Financial.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Bank = contract(bank_artifacts);
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
        $("#result").html('<h1>Register Finance Instution</h1><br><font face="verdana" size="3"><i><b>Metamask Address</b></i></font>\
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

    $("#Register_spv").click(function()
    {
      var bal;
      web3.eth.getBalance(web3.eth.accounts[0], function(error, result) 
      {
        bal = web3.fromWei(result.toNumber()); 
        $("#result").html('');
        $("#result").html('<h1>Register Spv</h1><br><font face="verdana" size="3"><i><b>Metamask Address</b></i></font>\
        <input type="text" placeholder="Metamask Address" id="metamask_adddress" value='+web3.eth.accounts[0]+'>\
        <font face="verdana" size="3"><i><b>Total Amount Eth</b></i></font>\
        <br><input type="text" placeholder="Amount" name="_amount" id="" value='+bal+' /><br>\
        <font face="verdana" size="3"><i><b>Enter the deposit amount </b></i></font>\
        <input type="text" placeholder="Enter the ether" name="Enter_amount" id="amount2" />\
        <input id="register" onclick="App.registerspv();" type="button" class="btn btn-success" value="Register" />\
        <button type="submit" class="btn btn-danger">Cancel</button>');
        });
    });
    $("#select_fin").click(function()
    {
      var bal;
      web3.eth.getBalance(web3.eth.accounts[0], function(error, result) 
      {
        bal = web3.fromWei(result.toNumber()); 
        $("#result").html('');
        $("#result").html('<html>\
        <head>\
          <title>Bootstrap Example</title>\
          <meta charset="utf-8">\
          <meta name="viewport" content="width=device-width, initial-scale=1">\
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\
        <script src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>\
        <script src="./app.js"></script>\
        </head>\
        <body class="body">\
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
        <td id="myRect1.len_add"></td>\
        <td id="myRect1.ether_amt"></td>\
        <td id="myRect1.rate_oi"></td>\
        <td id="myRect1.instal_ment"></td>\
        <td><input id="loanreq" onclick="App.loanreq();" type="button" class="btn btn-success" value="Loanreq" /></td>\
        <td><input id="loanreq" onclick="App.loan();" type="button" class="btn btn-success" value="Loan" /></td>\
        </tr>\
              </tbody>\
          </table>\
        </div>\
        </body>\
        </html>');
        });
    });
    $("#Existing_fin").click(function()
    {
      var bal;
      web3.eth.getBalance(web3.eth.accounts[0], function(error, result) 
      {
        bal = web3.fromWei(result.toNumber()); 
        $("#result").html('');
        $("#result").html('<html>\
        <head>\
          <title>Bootstrap Example</title>\
          <meta charset="utf-8">\
          <meta name="viewport" content="width=device-width, initial-scale=1">\
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\
        <script src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>\
        <script src="./app.js"></script>\
        </head>\
        <body class="body" onload="App.Bu_existing()">\
        <div class="container">\
        <br><br><br><br><br><br>\
         <center> <h2>Details Of Financial Institution</h2></center>\
          <table id="itemList" class="table table-hover">\
            <thead>\
              <tr>\
                <th>Lender Address</th>\
                <th>Ether Amount</th>\
                <th>Rate Of Interest</th>\
                <th>Installment</th>\
                <th>Total Loan</th>\
                <th></th>\
               </tr>\
            </thead>\
            <tbody>\
        <tbody>\
        <tr id="myRect2">\
        <td id="myRect2.lenadd"></td>\
        <td id="myRect2.etheramt"></td>\
        <td id="myRect2.rateoi"></td>\
        <td id="myRect2.instalment"></td>\
        <td id="myRect2.totalloan"></td>\
        <td><input id="sellloan" onclick="App.sellloan();" type="button" class="btn btn-success" value="Sell Loan" />\
        </tr>\
              </tbody>\
          </table>\
        </div>\
        </body>\
        </html>');
        });
    });
    
    $("#loan_pay").click(function(){

      var bal;
      web3.eth.getBalance(web3.eth.accounts[0], function(error, result) {
        bal = web3.fromWei(result.toNumber()); 
        $("#result").html('');
        $("#result").html('<html>\
        <head>\
            <meta charset="utf-8">\
            <title>loan payment</title>\
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\
             <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\
             <script src="./app.js"></script>\
             </head> \
<body class="body">\
    <br><br><h1>LOAN PAYMENT</h1><br><br>\
    <div>\
    <label for="Tamt">Total Loan Amount</label>\
    <input type="text" id="Tamt" name="LoanId" placeholder="Total loan Amount" required><br><br>\
    <label for="Mamt">Monthly Payment</label>\
    <input type="text" id="Mamt" name="LoanId" placeholder="Monthly Payment" required><br><br>\
    <input id="loanview" onclick="App.loanview();" type="button" class="btn btn-success" value="View" />\<br>\<br>\
      <label for="lid">Loan Id</label>\
            <input type="text" id="lid" name="LoanId" placeholder="Your loan id.." required><br><br>\
            <label for="lamount">Amount</label>\
            <input type="text"  id="lamount" name="Amount"  placeholder="Your loan amount"><br><br>\
            <input id="loanpay" onclick="App.loanpay();" type="button" class="btn btn-success" value="Pay" />\
             <button type="submit" onclick="window.location.href =" class="btn btn-danger">Cancel</button>\
</div>\
</body>\
</html>');
        });
    });

  
  $("#register-bank").click(function(event) {

    var self = this;
 
    var interest = parseInt(document.getElementById("interest").value);
    var loan_interest = parseInt(document.getElementById("loan-interest").value);
    var deposit_interest = parseInt(document.getElementById("deposit-interest").value);
    var bank_name = document.getElementById("bank-name").value;

    $("#status").html("Initiating transaction... (please wait)");

    Bank.deployed().then(function(instance) {
      return instance.register(bank_name, deposit_interest, loan_interest, interest, {from: account, gas: 6000000});
    }).then(function() {
      $("#status").html("Transaction complete!");
      App.showBalance();
    }).catch(function(e) {
      console.log(e);
      $("#status").html("Error in transaction; see log.");
    });
  });
  },
  register : function(){
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
      return instance.register(interest,duration,{from: account, gas: 6000000, value: web3.toWei(amount1, 'ether')});
  }).then(function(val) {
        console.log(val);

      })
},
registerspv : function(){
  var self = this;
  var bank;
  var m_address = web3.eth.accounts[0];
  var bal1 = parseInt($("#amount").val());
  var interest = parseInt($("#interest").val());
  var spvamount=parseInt($("#amount2").val());
    //console.log(m_address,bal,interest,duration)
  
Bank.deployed().then(function(instance) {
    bank = instance;
    return instance.SPV_ether({from: account, gas: 6000000, value: web3.toWei(spvamount, 'ether')});
}).then(function(val) {
      console.log(val);

    })
},
getloan : function(){
  var self = this;
  var bank;
  //var b_address = web3.eth.accounts[0];
  var Token = parseInt($("#Token_value").val());
  alert("yes");
  //console.log(m_address,bal,interest,duration)
  
Bank.deployed().then(function(instance) {
    bank = instance;
    return instance.borrowMoney(Token,{from: account, gas: 6000000});
}).then(function(val) {
      console.log(val);
     
         })
},
sellloan : function(){
  var self = this;
  var bank;
  //var b_address = web3.eth.accounts[0];
    alert("yes");
  //console.log(m_address,bal,interest,duration)
  
Bank.deployed().then(function(instance) {
    bank = instance;
    return instance.sell_loan();
}).then(function(val) {
      console.log(val);
     
         })
},

loanpay : function(){
  var self = this;
  var bank;
  //var b_address = web3.eth.accounts[0];
  var lenderadd = parseInt($("#lid").val());
  var monthpay=parseInt($("#lamount").val());
  alert("yes");
  //console.log(m_address,bal,interest,duration)
  
Bank.deployed().then(function(instance) {
    bank = instance;
    return instance.sendMonthlypayment(lenderadd,{from: account, gas: 6000000, value: web3.toWei(monthpay, 'ether')});
}).then(function(val) {
      console.log(val);
     
         })
},
loan : function(){
  var self = this;

    var bank;
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return ba.existing({from: account, gas: 6000000});
    }).then(function(val) {
      console.log(val);
           document.getElementById("myRect1.len_add").innerHTML=val[0];
           document.getElementById("myRect1.ether_amt").innerHTML=val[1];
           document.getElementById("myRect1.rate_oi").innerHTML=val[2];
           document.getElementById("myRect1.instal_ment").innerHTML=val[3];
          
        
  });
  },
  Bu_existing : function(){
    var self = this;
  
      var bank;
      
      Bank.deployed().then(function(instance) {
        bank = instance;
        return ba.existing({from: account, gas: 6000000});
      }).then(function(val) {
        console.log(val);
        document.getElementById("myRect2.lenadd").innerHTML=val[0];
        document.getElementById("myRect2.etheramt").innerHTML=val[1];
        document.getElementById("myRect2.rateoi").innerHTML=val[2];
        document.getElementById("myRect2.instalment").innerHTML=val[3];
        document.getElementById("myRect2.totalloan").innerHTML=val[4];
    });
    },
    loanview : function(){
      var self = this;
    
        var bank;
        alert("yes")
        Bank.deployed().then(function(instance) {
          bank = instance;
          return ba.ViewLoanamount({from: account, gas: 6000000});
        }).then(function(val) {
          console.log(val);
               document.getElementById("Tamt").innerHTML=val[0];
               document.getElementById("Mamt").innerHTML=val[1];
             });
      },
loanreq : function(){

  var bal;
  web3.eth.getBalance(web3.eth.accounts[0], function(error, result) {
    bal = web3.fromWei(result.toNumber()); 
    $("#result").html('');
    $("#result").html('<html>\
    <head>\
        <meta charset="utf-8">\
        <title>loan payment</title>\
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\
         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\
         <script src="./app.js"></script>\
         </head> \
<body class="body">\
<br><br><h1>LOAN REQUEST</h1><br><br>\
<div>\
  <label for="lid">Borrower Address</label>\
        <input type="text" id="Browwer_add" name="Borrower address" placeholder="Borrower address" value='+web3.eth.accounts[0]+' required><br><br>\
        <label for="lamount">Token value</label>\
        <input type="text"  id="Token_value" name="value"  placeholder="Token value"><br><br>\
       <button type="submit" onclick="App.getloan()" class="btn btn-success">submit</button>\
         <button type="submit" onclick="window.location.href =" id="mainpage" class="btn btn-danger">Cancel</button>\
</div>\
</body>\
</html>');
    });
},


  showBalance: function() {
    var self = this;

    var bank;
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.isRegistered(account);
    }).then(function(val) {
      console.log(val);
      if (val == true) {
        $("#bank-info").html("This bank has registered");
      } else {
        $("#bank-info").html("This bank has not registered yet");
      }
      return bank.fetchBalance(account);
    }).then(function(val) {
      $("#balance-address").html("This bank's balance is " + val);
    }).catch(function(e) {
      console.log(e);
    });
  },

};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});
*/


// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import bank_artifacts from '../../build/contracts/Financial.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Bank = contract(bank_artifacts);

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

      self.basicfunctions();
      self.bank_list();
      self.loan_list();
      self.get_loan_list();
    });
    this.showBalance();
  },

  basicfunctions : function(){
    $("#account").val(account)
    
    web3.eth.getBalance(account, (err, balance) => {
      balance = web3.fromWei(balance, "ether") + ""
      $("#balance").val(balance.trim())
    });
  },

  showBalance: function() {
    var self = this;

    var bank;
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.isRegistered(account);
    }).then(function(val) {
      console.log(val);
      if (val == true) {
        $("#reg_bank").html('');
        $("#borrrow_hide").remove();
        $('#due_set').remove();
        $('#get_loan_hide').remove();
        $("#bank-info").html("This Financial Institute has registered");
      } else {
        $("#lending_hide").remove();
       // $("#bank-info").html("This Financial Institute has not registered yet");
      }
      return bank.fetchBalance(account);
    }).then(function(val) {
      $("#balance-address").html("Your balance is " + val);
    }).catch(function(e) {
      console.log(e);
    });
  },
  
  bank_list : function(){
    var self = this;

    var bank;

    $("#bank_list").html('');
    $("#bank_list").append('<table class="table table-striped"><thead><tr><th>Financial Institute Address</th><th>Bank Name</th><th>Balance</th><th>Fixed Int.</th></tr></thead><tbody id="body_bank"></tbody></table>');
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.show_registers();
    }).then(function(val) {
       $.each(val,function(err,data){
        bank.bank_d1(data).then(function(result){
          $("#body_bank").append('<tr><td>'+data+'</td><td>'+result[0]+'</td><td>'+result[1].toNumber()+'</td><td>'+result[3]+'</td></tr>')
        })
       })
      
    });
  },
  
get_loan : function(){
  var loan_amount  = parseInt($("#loan-amount").val().trim());
  var loan_address = $("#loan-address").val().trim();

  $("#loan-status").html("Initiating transaction... (please wait)");
  
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.req_loan(loan_address,loan_amount,{from:account,gas: 6000000});
  }).then(function(val) {
    $("#loan-status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e);
    $("#loan-status").html("Error in transaction; see log.");
  });
},

loan_list:function(){
  var self = this;
  var bank;
  $("#loan_list").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.ln_pro_count(account);
  }).then(function(val) {
      for(var i=0;i<val.toNumber();i++){
        bank.ln_pro(account,i).then(function(data,err){
          $("#loan_list").append('<tr><td>'+data[0]+'</td><td>'+data[1]+'</td><td>'+data[3]+'</td></tr>');
        });
      }
  });
},

get_loan_list:function(){
  var self = this;
  var bank;
  $("#get_loan_list").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.ln_get_count(account);
  }).then(function(val) {
      for(var i=0;i<val.toNumber();i++){
        bank.ln_get(account,i).then(function(data,err){
          $("#get_loan_list").append('<tr><td>'+data[8]+'</td><td>'+data[0]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td><td>'+data[5]+'</td><td>'+data[6]+'</td><td>'+data[7]+'</td></tr>');
        });
      }
  });
},

pay_due:function(){
  var due = parseInt($("#Loan_id").val().trim());
  var self = this;
  var bank;
  $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.settlement(due,{from:account});
  }).then(function() {
    $("#status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e);
    $("#status").html("Error in transaction; see log.");
  });
}

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});