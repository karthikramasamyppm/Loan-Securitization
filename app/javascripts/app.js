// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import bank_artifacts from '../../build/contracts/Financial.json'
import bank_artifacts1 from '../../build/contracts/LoanToken.json'
// MetaCoin is our usable abstraction, which we'll use through the code below.
var Bank = contract(bank_artifacts);
var Bank1=contract(bank_artifacts1);
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
      self.bank1_list();
      
      self.spv_list();
      self.spv_list1();
      self.invesdetail_tbody();

      self.get_loan_list();
      self.fi_loan_list();
      // self.spvloan_tbody();
      self.spv_tbody();
      self.spvpack_body();
     // self.spvpackdetail_body();
      self.inverstorpack_body();
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
      //console.log(val);
      if (val == true) {
        $("#lending_hide").show();
        $("#reg_bank").hide();
        $('#due_set').hide();
        $('#spvdetail_hide').hide();
        $('#get_loan_hide').hide();
        $('#spv_hide').hide();
        $('#borrrow_hide').hide();
        $('#fi_hide').show();
        $('#fidetail_hide').show();
        $("#bank-info").show();
        $("#balance-address").show();
        self.fi_loan_list();
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
        $("#bank-info").hide();
        $("#balance-address").hide();
        $("#spv_reg").hide();
        $('#inves_hide').hide();
        /*Bank.deployed().then(function(instance) {
          //bank = instance;
          return Bank1.getLoanContract(account).then(function(addr){ $("Token-address").value=addr;
        });
      });*/
        
        self.get_loan_list();
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
          $('#spvdetail_hide1').hide();
          $('#get_loan_hide').hide();
          $('#spv_hide').hide();
          $('#borrrow_hide').hide();
          $('#fidetail_hide').hide();
          $("#bank-info").hide();
          $("#balance-address").hide();
          $("#purchase_set").hide();
          $("#fi_hide").hide();
          $("#inves_hide").hide();
          $("#spvdetail").hide();
          $("#choosefi").hide();
          $("#choosespv").hide();
          $("#create_pack").hide();
          $("#purchase_pack").hide();
          $("#invester_pack_details").hide();
          $("#spv_pack").hide();
          $("#spv_loan_detail").hide();
          $("#investor_detail").hide();
          $("#spv_deta").hide();
          $("#spv_reg").hide();
          $("#spv_packdetail").hide();
          $("#fidetail_hide1").hide();
      },
 
 
  showspv: function() {
    var self = this;

    var bank;
   
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.spvRegistered(account);
    
    }).then(function(val) {
      //console.log(val);
      if (val == true) {
        $("#lending_hide").hide();
        $("#reg_bank").hide();
        $('#due_set').hide();
        $('#spvdetail_hide').show();
        $('#get_loan_hide').hide();
        $('#spv_hide').hide();
        $('#spv_pack').show();
        $('#spv_loan_detail').show();
        $('#spv_deta').show();
        $('#borrrow_hide').hide();
        $('#create_pack').show();
        $('#choosefi').show();
        $('#fidetail_hide1').show();
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
        $('#spv_hide').hide();
        $('#borrrow_hide').hide();
        $('#fidetail_hide').hide();
        $("#spv_reg").show();
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
  showinvester: function() {
    var self = this;

    var bank;
   
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.investerRegistered(account);
    
    }).then(function(val) {
      //console.log(val);
      if (val == true) {
        $("#lending_hide").hide();
        $("#reg_bank").hide();
        $('#due_set').hide();
        $('#spvdetail_hide1').show();
        $('#get_loan_hide').hide();
        $('#borrrow_hide').hide();
        $('#fidetail_hide').hide();
        $('#purchase_pack').show();
        $('#investor_detail').show();
        $('#invester_pack_details').show();
        $('#choosespv').show();
        $("#bank-info").show();
        $("#choosespv").show();
        $("#balance-address").show();
        $("#purchase_set").hide();
        $("#spv_reg").hide();
        $("#spv_packdetail").show();
        $("#bank-info").html("This Investor has registered");
      } else {
        $("#lending_hide").hide();
        $("#reg_bank").hide();
        $('#due_set').hide();
        $('#spvdetail_hide').hide();
        $('#get_loan_hide').hide();
        $('#borrrow_hide').hide();
        $('#fidetail_hide').hide();
        $("#spv_reg").hide();
        $('#inves_hide').show();
        $("#bank-info").show();
        $("#spv_packdetail").hide();
        $("#balance-address").show();
        $("#bank-info").html("This Investor has not registered yet");
      }
      return bank.investerBalance(account);
    }).then(function(val) {
      $("#balance-address").html("This Investor balance is " +web3.fromWei(val.toNumber(), "ether"));
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
  bank1_list : function(){
    var self = this;

    var bank;

    $("#bank1_list").html('');
   
    let gen_id = 0;
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.show_registers();
    }).then(function(val) {
       $.each(val,function(err,data){
        bank.bank_d1(data).then(function(result){
          $("#body1_bank").append('<tr><td id=b'+gen_id+'>'+data+'</td><td>'+result[0]+'</td><td>'+web3.fromWei(result[1].toNumber(), "ether")+'</td><td>'+result[3]+'</td><td><input type="button" class="btn btn-success form-control" id="bank-de" value="Choose FI" onclick=App.spvloan_tbody("#b'+gen_id+'");></td></tr>')
          gen_id ++;
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
          $("#spv_list").append('<tr><td>'+data+'</td><td>'+web3.fromWei(result[0].toNumber(), "ether")+'</td><td>'+result[1]+'</td><td>'+result[3]+'</td></tr>')
        })
       })
      
    });
  },
spv_list1 : function(){
    var self = this;

    var bank;

    $("#spv_list1").html('');
    let gen1_id = 0;
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.spv_registers();
    }).then(function(val) {
       $.each(val,function(err,data){
        bank.spv_details(data).then(function(result){
          $("#spv_list1").append('<tr><td id=b1'+gen1_id+'>'+data+'</td><td>'+web3.fromWei(result[0].toNumber(), "ether")+'</td><td>'+result[1]+'</td><td>'+result[3]+'</td><td><input type="button" class="btn btn-success form-control" id="bank1-de" value="Choose SPV" onclick=App.spvpackdetail_body("#b1'+gen1_id+'");></td></tr>')
          gen1_id ++;
        })
       })
      
    });
  },
get_loan : function(){
  var Token_add=$("#Token-address").val().trim();
  var loan_amount  = parseInt($("#loan-amount").val().trim());
  var loan_address = $("#loan-address").val().trim();
  var token_name=$("#token-name").val().trim();
  $("#loan-status").html("Initiating transaction... (please wait)");
  
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.req_loan(Token_add,loan_address,loan_amount,token_name,{from:account,gas: 6000000});
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
Register: function(){
  var invsether_amount  = parseInt($("#invester_ether_value").val().trim());
  
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    bank.Investor_ether({from:account,value:web3.toWei(invsether_amount,"ether"),gas: 6000000});
  }).then(function() {
    $("#status").html("Transaction complete!");
    App.showinvester();
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
  var financ_add = document.getElementById("finance_add").value;
  Bank.deployed().then(function(instance) {
    bank = instance;
    tmp = $("#spvLoan_id").val().trim().split(",");
    for(var i=0;i < tmp.length;i++){
      loanid.push(parseInt(tmp[i]))
    }
    
    return bank.purchase_loan(loanid,financ_add,{from:account,gas: 6000000});
  }).then(function(val) {
      //console.log(val);
  }).catch(function(e) {
    console.log(e); 
  });
},
create_pack: function(){
  let spvid = [];
  var tmp;
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    tmp = $("#spv_id").val().trim().split(",");
    for(var i=0;i < tmp.length;i++){
      spvid.push(parseInt(tmp[i]))
    }
    
    return bank.createPacking(spvid,{from:account,gas: 6000000});
  }).then(function(val) {
      //console.log(val);
  }).catch(function(e) {
    console.log(e); 
  });
},
purchase_pack: function(){
  let invesid = [];
  var tmp;
  var self = this;
  var bank;
  var spvadd = document.getElementById("spv_add").value;
  Bank.deployed().then(function(instance) {
    bank = instance;
    tmp = $("#pack_id").val().trim().split(",");
    for(var i=0;i < tmp.length;i++){
      invesid.push(parseInt(tmp[i]))
    }
    
    return bank.purchase_pack(invesid,spvadd,{from:account,gas: 6000000});
  }).then(function(val) {
      //console.log(val);
  }).catch(function(e) {
    console.log(e); 
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
/*choose_fi:function() {

  var self = this;

  
  var fi_add = document.getElementById("choose_FI").value;

  $("#status").html("Initiating transaction... (please wait)");

  Bank.deployed().then(function(instance) {
    return instance.choosefinanceinstute(fi_add,{from:account,gas: 6000000});
  }).then(function() {
    $("#status").html("Transaction complete!");
    App.show_Balance();
  }).catch(function(e) {
    console.log(e);
    $("#status").html("Error in transaction; see log.");
  });
},*/
/*choose_spv:function() {

  var self = this;

  
  var spv_add = document.getElementById("choose_spv").value;

  $("#status").html("Initiating transaction... (please wait)");

  Bank.deployed().then(function(instance) {
    return instance.choosespv(spv_add,{from:account,gas: 6000000});
  }).then(function() {
    $("#status").html("Transaction complete!");
    App.show_Balance();
  }).catch(function(e) {
    console.log(e);
    $("#status").html("Error in transaction; see log.");
  });
},*/

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
          console.log(data)
          var myDate = new Date( (data[7].toNumber()) *1000);
          var a=(myDate.toLocaleString());
              if(data[0]>0)
               {
          $("#get_loan_list").append('<tr><td>'+data[0]+'</td><td>'+data[13]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td id='+data[0]+'>'+data[3]+'</td><td>'+data[4]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td><td>'+data[6]+'</td><td>'+a.split(',')[0]+'</td><td>'+data[9]+'</td><td>'+web3.fromWei(data[10].toNumber(), "ether")+'</td><td id="month_ins">'+web3.fromWei(data[11].toNumber(), "ether")+'</td><td><input class="btn btn-success form-control" id="due-bank" value="Payment" onclick="App.pay_due('+data[0]+','+web3.fromWei(data[11].toNumber(), "ether")+');"></td></tr>');
                }
        });
      }
  });
},
invesdetail_tbody : function(){
  var self = this;

  var bank;

  $("#invesdetail_tbody").html('');
 
  
  Bank.deployed().then(function(instance) {
    bank = instance;
   
  }).then(function(val) {
     
      bank.investor_details(account).then(function(result){
        $("#invesdetail_tbody").append('<tr><td>'+account+'</td><td>'+web3.fromWei(result[0].toNumber(), "ether")+'</td><td>'+result[1]+'</td></tr>')
     
     })
    
  });
},
spvloan_tbody:function(fi){
  
  let address = $(fi.trim()).text().trim();
  var self = this;
  var bank;
   $("#spvloan_tbody").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.filn_get_id(address);
  }).then(function(val) {
      for(var i=1;i<=val.toNumber();i++){
        bank.filn_get(address,i).then(function(data,err){
          $("#spvloan_tbody").append('<tr><td>'+data[0]+'</td><td>'+data[13]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td></tr>');
        });
      }
  });
  },
spv_tbody:function(){
  var self = this;
  var bank;
  $("#spv_tbody").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank. spvln_get_id(account);
  }).then(function(val) {
      for(var i=1;i<=val.toNumber();i++){
        bank.spvln_get(account,i).then(function(data,err){
          
          $("#spv_tbody").append('<tr><td>'+data[12]+'</td><td>'+data[0]+'</td><td>'+data[13]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td></tr>');
        });
      }
  });
},
spvpack_body:function(){
  var self = this;
  var bank;
  $("#spvpack_body").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank. spvpackid(account);
  }).then(function(val) {
      for(var i=1;i<=val.toNumber();i++){
        bank.spvpackage(account,i).then(function(data,err){
          
          $("#spvpack_body").append('<tr><td>'+data[0]+'</td><td>'+web3.fromWei(data[1].toNumber(), "ether")+'</td></tr>');
        });
      }
  });
},
spvpackdetail_body:function(fii){
  let address = $(fii.trim()).text().trim();
  var self = this;
  var bank;
  
  $("#spvpackdetail_body").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank. spvpackid(address);
  }).then(function(val) {
      for(var i=1;i<=val.toNumber();i++){
        bank.spvpackage(address,i).then(function(data,err){
          
          $("#spvpackdetail_body").append('<tr><td>'+data[0]+'</td><td>'+web3.fromWei(data[1].toNumber(), "ether")+'</td></tr>');
        });
      }
  });
},

inverstorpack_body:function(){
  var self = this;
  var bank;
  $("#inverstorpack_body").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank. investerpackid(account);
  }).then(function(val) {
      for(var i=1;i<=val.toNumber();i++){
        bank.investerpackage(account,i).then(function(data,err){
          
          $("#inverstorpack_body").append('<tr><td>'+data[0]+'</td><td>'+web3.fromWei(data[1].toNumber(), "ether")+'</td></tr>');
        });
      }
  });
},

fi_loan_list:function(){
  var self = this;
  var bank;
  $("#fi_loan_list").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.filn_get_id(account);
  }).then(function(val) {
    console.log(val.toNumber())
      for(var i=1;i<=val.toNumber();i++){
        bank.filn_get(account,i).then(function(data,err){
          //console.log(data[0])
          var myDate = new Date( (data[7].toNumber()) *1000);
          var a=(myDate.toLocaleString());

          $("#fi_loan_list").append('<tr><td>'+data[0]+'</td><td>'+data[13]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td><td>'+data[4]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td><td>'+data[6]+'</td><td>'+a.split(',')[0]+'</td><td>'+data[9]+'</td><td>'+web3.fromWei(data[10].toNumber(), "ether")+'</td><td id="month_ins">'+web3.fromWei(data[11].toNumber(), "ether")+'</td></tr>');
        });
      }
  });
},

pay_due:function(id,amount){
  var address = $("#"+id).text().trim();
  console.log(id,address,amount)
  var self = this;
  var bank; 
    $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.settlement(parseInt(id),address,{from:account,value:web3.toWei(amount,'ether'),gas: 6000000});
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