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
      self.spv_list();
      self.loan_list();
      self.get_loan_list();
    });
   // this.showBalance();
  },

  basicfunctions : function(){
    $("#account").val(account)
    
    web3.eth.getBalance(account, (err, balance) => {
      balance = web3.fromWei(balance, "ether") + ""
      $("#balance").val(balance.trim())
    });
  },

  show_Balance: function() {
    var self = this;

    var bank;
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.isRegistered(account);
    }).then(function(val) {
      console.log(val);
      if (val == true) {
        $("#lending_hide").show();
        $("#reg_bank").hide();
        $('#due_set').hide();
        $('#spvdetail_hide').hide();
        $('#get_loan_hide').hide();
        $('#spv_hide').hide();
        $('#borrrow_hide').show();
        $('#fidetail_hide').show();
        $('#spvloan_hide').hide();
        $("#bank-info").show();
        $("#balance-address").show();
        $("#bank-info").html("This Financial Institute has registered");
      } else {
        $("#lending_hide").hide();
        $("#reg_bank").show();
        $('#due_set').hide();
        $('#spvdetail_hide').hide();
        $('#get_loan_hide').hide();
        $('#spv_hide').hide();
        $('#borrrow_hide').hide();
        $('#fidetail_hide').hide();
        $('#spvloan_hide').hide();
        $("#bank-info").show();
        $("#balance-address").show();
        $("#bank-info").html("This Financial Institute has not registered");
      }
      return bank.fetchBalance(account);
    }).then(function(val) {
     $("#balance-address").html("This Financial Institute's balance is " +web3.fromWei(val.toNumber(), "ether"));
    }).catch(function(e) {
      console.log(e);
    });
  },
  borrower: function() {

        var self = this;
    
        $("#lending_hide").hide();
        $("#reg_bank").hide();
        $('#due_set').show();
        $('#spvdetail_hide').remove();
        $('#get_loan_hide').show();
        $('#spv_hide').hide();
        $('#borrrow_hide').show();
        $('#purchase_set').hide();
        $('#fidetail_hide').show();
        $('#spvloan_hide').hide();
        $("#bank-info").hide();
        $("#balance-address").hide();
      
        
    },
    totalhide: function() {
      var self = this;
  
      var bank;
      
      Bank.deployed().then(function(instance) {
        bank = instance;
       
      })
          $("#lending_hide").hide();
          $("#reg_bank").hide();
          $('#due_set').hide();
          $('#spvdetail_hide').hide();
          $('#get_loan_hide').hide();
          $('#spv_hide').hide();
          $('#borrrow_hide').hide();
          $('#fidetail_hide').hide();
          $('#spvloan_hide').hide();
          $("#bank-info").hide();
          $("#balance-address").hide();
          $("#purchase_set").hide();
      },
 
 
  showspv: function() {
    var self = this;

    var bank;
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.spvRegistered({from:account});
    }).then(function(val) {
      console.log(val);
      if (val == true) {
        $("#lending_hide").hide();
        $("#reg_bank").hide();
        $('#due_set').hide();
        $('#spvdetail_hide').show();
        $('#get_loan_hide').hide();
        $('#spv_hide').hide();
        $('#borrrow_hide').show();
        $('#fidetail_hide').show();
        $('#spvloan_hide').show();
        $("#bank-info").show();
        $("#balance-address").show();
        $("#purchase_set").show();
        $("#bank-info").html("This spv has registered");
      } else {
        $("#lending_hide").hide();
        $("#reg_bank").hide();
        $('#due_set').hide();
        $('#spvdetail_hide').hide();
        $('#get_loan_hide').hide();
        $('#spv_hide').show();
        $('#borrrow_hide').hide();
        $('#fidetail_hide').hide();
        $('#spvloan_hide').hide();
        $("#bank-info").show();
        $("#balance-address").show();
        $("#bank-info").html("This spv has not registered yet");
      }
      return bank.spvBalance(account);
    }).then(function(val) {
      $("#balance-address").html("This spv Institute's balance is " +web3.fromWei(val.toNumber(), "ether"));
    }).catch(function(e) {
      console.log(e);
    });
  },
  
  bank_list : function(){
    var self = this;

    var bank;

    $("#bank_list").html('');
   
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.show_registers();
    }).then(function(val) {
       $.each(val,function(err,data){
        bank.bank_d1(data).then(function(result){
          $("#body_bank").append('<tr><td>'+data+'</td><td>'+result[0]+'</td><td>'+web3.fromWei(result[1].toNumber(), "ether")+'</td><td>'+result[3]+'</td></tr>')
        })
       })
      
    });
  },
  spv_list : function(){
    var self = this;

    var bank;

    $("#spv_list").html('');
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.spv_registers();
    }).then(function(val) {
       $.each(val,function(err,data){
        bank.spv_details(data).then(function(result){
          $("#spv_list").append('<tr><td>'+data+'</td><td>'+web3.fromWei(result[0].toNumber(), "ether")+'</td><td>'+result[1]+'</td><td>'+result[2]+'</td><td>'+result[3]+'</td></tr>')
        })
       })
      
    });
  },
get_loan : function(){
  var loan_amount  = parseInt($("#loan-amount").val().trim());
  var loan_address = $("#loan-address").val().trim();
var token_name=$("#token-name").val().trim();
  $("#loan-status").html("Initiating transaction... (please wait)");
  
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.req_loan(loan_address,loan_amount,token_name,{from:account,gas: 6000000});
  }).then(function(val) {
    $("#loan-status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e);
    $("#loan-status").html("Error in transaction; see log.");
  });
},
sale_loan : function(){
  var ether_amount  = parseInt($("#spv_ehter_value").val().trim());
  
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    bank.SPV_ether({from:account,value:web3.toWei(ether_amount,"ether"),gas: 6000000});
  }).then(function() {
    $("#status").html("Transaction complete!");
    App.showspv();
  }).catch(function(e) {
    console.log(e);
    $("#status").html("Error in transaction; see log.");
  });
},
purchase_ln: function(){
  let loanid = [];
  var tmp;
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    tmp = $("#spvLoan_id").val().trim().split(",");
    for(var i=0;i < tmp.length;i++){
      loanid.push(parseInt(tmp[i]))
    }
    
    return bank.purchase_loan(loanid,{from:account,gas: 6000000});
  }).then(function(val) {
      console.log(val);
  }).catch(function(e) {
    console.log(e); 
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
          $("#loan_list").append('<tr><td>'+data[0]+'</td><td>'+web3.fromWei(data[1].toNumber(), "ether")+'</td><td>'+data[3]+'</td></tr>');
        });
      }
  });
},
register_bank:function() {

  var self = this;

  var duration = parseInt((document.getElementById("duration").value));
  var loan_interest = parseInt((document.getElementById("loan-interest").value));
  var deposit_Amount = parseInt((document.getElementById("deposit-amount").value));
  var bank_name = document.getElementById("bank-name").value;

  $("#status").html("Initiating transaction... (please wait)");

  Bank.deployed().then(function(instance) {
    return instance.register(bank_name, loan_interest,duration, {from:account,value:web3.toWei(deposit_Amount,"ether"),gas: 6000000});
  }).then(function() {
    $("#status").html("Transaction complete!");
    App.show_Balance();
  }).catch(function(e) {
    console.log(e);
    $("#status").html("Error in transaction; see log.");
  });
},

get_loan_list:function(){
  var self = this;
  var bank;
  $("#get_loan_list").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank. ln_get_id(account);
  }).then(function(val) {
      for(var i=1;i<=val.toNumber();i++){
        bank.ln_get(account,i).then(function(data,err){
          console.log(data[0])
          var myDate = new Date( (data[7].toNumber()) *1000);
          var a=(myDate.toLocaleString());

          $("#get_loan_list").append('<tr><td>'+data[0]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td><td>'+data[4]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td><td>'+data[6]+'</td><td>'+a.split(',')[0]+'</td><td>'+data[9]+'</td><td>'+web3.fromWei(data[10].toNumber(), "ether")+'</td><td id="month_ins">'+web3.fromWei(data[11].toNumber(), "ether")+'</td><td><input class="btn btn-success form-control" id="due-bank" value="Payment" onclick="App.pay_due('+data[0]+','+web3.fromWei(data[11].toNumber(), "ether")+');"></td></tr>');
        });
      }
  });
},

pay_due:function(id,amount){
  console.log(id,amount)
  var self = this;
  var bank; 
    $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.settlement(parseInt(id),{from:account,value:web3.toWei(amount,'ether'),gas: 6000000});
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