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
      self.bank_list1();
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
  firegister: function() {
    var self = this;

    var bank;
    $("#home").removeClass("active");
    $("#fi").addClass("active");
    $("#brr").removeClass("active");
    $("#spv").removeClass("active");
    $("#inv").removeClass("active");
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.bank_d1(account);
    }).then(function(val) {
      //console.log(val);
      if (val[1]>0) {
        $("#fi_registered").show();
        $("#borrower").hide();
        $('#spv_registered').hide();
        $('#invester_register').hide();
        $("#a1").show();
        $("#a2").show();
        $("#a3").show();
        $("#bank-info").val("This Financial Institute has registered");
      } else {
        $("#bank-info").val("This Financial Institute has not registered");
          $('#myModal').modal('show');
            }
      return bank.bank_d1(account);
    }).then(function(val) {
     $("#balance-address").val("This Financial Institute's balance is " +web3.fromWei(val[1].toNumber(), "ether"));
    }).catch(function(e) {
      console.log(e);
    });
  },
  totalhide: function() {
    var self = this;

    var bank;
    $("#home").addClass("active");
    $("#fi").removeClass("active");
    $("#brr").removeClass("active");
    $("#spv").removeClass("active");
    $("#inv").removeClass("active");
    Bank.deployed().then(function(instance) {
      bank = instance;
     
    })
        $("#fi_registered").hide();
        $("#borrower").hide();
        $('#spv_registered').hide();
        $('#invester_register').hide();
        $("#a1").hide();
        $("#a2").hide();
        $('#a3').hide();
        $("#bank-info").val("");
        $("#balance-address").val("");  
        
    },
      borrower: function() {
        var self = this;
        var bank;
        $("#home").removeClass("active");
        $("#fi").removeClass("active");
        $("#brr").addClass("active");
        $("#spv").removeClass("active");
        $("#inv").removeClass("active");
        Bank.deployed().then(function(instance) {
          bank = instance;
        })
            $("#fi_registered").hide();
            $("#borrower").show();
            $('#spv_registered').hide();
            $('#invester_register').hide();
            $("#a1").show();
            $("#a2").show();
            $("#a3").hide();  
            $("#bank-info").val("");
            $("#balance-address").val("");  
        },
      spvregister: function() {
          var self = this;
          var bank;
          $("#home").removeClass("active");
          $("#fi").removeClass("active");
          $("#brr").removeClass("active");
          $("#spv").addClass("active");
          $("#inv").removeClass("active");
      Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.spv_details(account);
    }).then(function(val) {
      //console.log(val);
      if (val[0]>0) {
        $("#fi_registered").hide();
        $("#borrower").hide();
        $('#spv_registered').show();
        $('#invester_register').hide();
        $("#a1").show();
        $("#a2").show();
        $("#a3").show();
        $("#bank-info").val("This SPV has registered");
      } else {
        $("#bank-info").val("This SPV has not registered");
          $('#myModal1').modal('show');
            }
      return bank.spv_details(account);
    }).then(function(val) {
     $("#balance-address").val("This SPV balance is " +web3.fromWei(val[0].toNumber(), "ether"));
    }).catch(function(e) {
      console.log(e);
    });    
          },
investerregister: function() {
            var self = this;
            var bank;
            $("#home").removeClass("active");
            $("#fi").removeClass("active");
            $("#brr").removeClass("active");
            $("#spv").removeClass("active");
            $("#inv").addClass("active");
  Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.spv_details(account);
    }).then(function(val) {
      //console.log(val);
      if (val[0]>0) {
        $("#fi_registered").hide();
        $("#borrower").hide();
        $('#spv_registered').hide();
        $('#invester_register').show();
        $("#a1").show();
        $("#a2").show();
        $("#a3").show();
        $("#bank-info").val("This Investor has registered");
      } else {
        $("#bank-info").val("This Investor has not registered");
          $('#myModal2').modal('show');
            }
      return bank.spv_details(account);
    }).then(function(val) {
     $("#balance-address").val("This Invester balance is " +web3.fromWei(val[0].toNumber(), "ether"));
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
        bank.bank_d1(account).then(function(result){
          $("#body_bank").append('<tr><td>'+account+'</td><td>'+result[0]+'</td><td>'+web3.fromWei(result[1].toNumber(), "ether")+'</td><td>'+result[3]+'</td></tr>')
        }) 
    });
  },
  bank_list1 : function(){
    var self = this;
    var bank;
    $("#bank_list").html('');
    let gen_id = 0;
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.show_registers();
    }).then(function(val) {
       $.each(val,function(err,data){
        bank.bank_d1(data).then(function(result){
          $("#body_bank1").append('<tr><td id=b'+gen_id+'>'+data+'</td><td>'+result[0]+'</td><td>'+web3.fromWei(result[1].toNumber(), "ether")+'</td><td>'+result[3]+'</td><td><input type="button" class="btn btn-primary form-control" id="bank-de" value="Choose FI" onclick=App.getloan("#b'+gen_id+'");></td></tr>')
          gen_id ++;
        })
       })
    });
  },
  getloan: function(d) {
    var self = this;
    var bank;
    Bank.deployed().then(function(instance) {
      bank = instance;
      let address = $(d.trim()).text().trim();
      $("#loan-address").val(address);
    })
          
    },

    /*pursloan: function(d) {
      var self = this;
      var bank;
      Bank.deployed().then(function(instance) {
        bank = instance;
        let ad = d;
        let ae = d;
       console.log($("#spvLoan_id").val().trim())
        if($("#spvLoan_id").val().trim()==0)
        {
          //alert(ad);
          $("#ad").hide();
          $("#spvLoan_id").val(ad);
        }
        else
        {
           $("#ad").hide();
          $("#spvLoan_id").val($("#spvLoan_id").val().trim()+','+ae);
        }
      })
            
      },*/
  
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
          $("#body1_bank").append('<tr><td id=b'+gen_id+'>'+data+'</td><td>'+result[0]+'</td><td>'+web3.fromWei(result[1].toNumber(), "ether")+'</td><td>'+result[3]+'</td><td><input type="button" class="btn btn-primary form-control" id="bank-de" value="Choose FI" onclick=App.spvloan_tbody("#b'+gen_id+'");></td></tr>')
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
        bank.spv_details(account).then(function(result){
          $("#spv_list").append('<tr><td>'+account+'</td><td>'+web3.fromWei(result[0].toNumber(),"ether")+'</td><td>'+result[1]+'</td><td>'+result[2]+'</td></tr>')
        });
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
          $("#spv_list1").append('<tr><td id=b1'+gen1_id+'>'+data+'</td><td>'+web3.fromWei(result[0].toNumber(), "ether")+'</td><td>'+result[1]+'</td><td>'+result[2]+'</td><td><input type="button" class="btn btn-primary form-control" id="bank1-de" value="Choose SPV" onclick=App.spvpackdetail_body("#b1'+gen1_id+'");></td></tr>')
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
  $("#status").html("Initiating transaction... (please wait)");

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
  $("#status").html("Initiating transaction... (please wait)");

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
  //let loanid = [];
  let loanid;
  var tmp;
  var self = this;
  var bank;
  var financ_add = document.getElementById("finance_add").value;
  $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    tmp = $("#spvLoan_id").val().trim().split(",");
    for(var i=0;i < tmp.length;i++){
      console.log(tmp);
     // loanid.push(parseInt(tmp[i]))
   loanid=parseInt(tmp[i]);
    bank.purchase_loan(loanid,financ_add,{from:account,gas: 6000000});
    }
  }).then(function(val) {
    $("#status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e); 
    $("#status").html("Error in transaction; see log.");
  });
},
/*purchase_ln: function(){
  //let loanid = [];
  let loanid;
  var tmp;
  var self = this;
  var bank;
  var financ_add = document.getElementById("finance_add").value;
  $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    tmp = $("#spvLoan_id").val().trim().split(",");
    for(var i=0;i < tmp.length;i++){
      console.log(tmp);
     // loanid.push(parseInt(tmp[i]))
   loanid=parseInt(tmp[i]);
    bank.spvloancheck(loanid,financ_add,{from:account,gas: 6000000}).then(function(val) {
    if(val==true)
    {
      bank.purchase_loan(loanid,financ_add,{from:account,gas: 6000000}).then(function(val){
    $("#status").html("Transaction complete!");
      })
    }
    else{
      alert("this loan is already purchased" +loanid);
    }
  }).catch(function(e) {
    console.log(e); 
    $("#status").html("Error in transaction; see log.");
  });
}
  });
},*/
create_pack: function(){
  let spvid = [];
  var tmp;
  var self = this;
  var bank;
  $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    tmp = $("#spv_id").val().trim().split(",");
    for(var i=0;i < tmp.length;i++){
      spvid.push(parseInt(tmp[i]))
    }
    return bank.createPacking(spvid,{from:account,gas: 6000000});
  }).then(function(val) {
    $("#status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e); 
    $("#status").html("Error in transaction; see log.");
  });
},
purchase_pack: function(){
 // let invesid = [];
 let invesid;
  var tmp;
  var self = this;
  var bank;
  var spvadd = document.getElementById("spv_add").value;
  $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    tmp = $("#pack_id").val().trim().split(",");
    for(var i=0;i < tmp.length;i++){
     // invesid.push(parseInt(tmp[i]))
    invesid=parseInt(tmp[i]);
     bank.purchase_pack(invesid,spvadd,{from:account,gas: 6000000});
    }
  }).then(function(val) {
    $("#status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e); 
    $("#status").html("Error in transaction; see log.");
  });
},
/*purchase_pack: function(){
   // let invesid = [];
 let invesid;
 var tmp;
 var self = this;
 var bank;
 var spvadd = document.getElementById("spv_add").value;
 $("#status").html("Initiating transaction... (please wait)");
 Bank.deployed().then(function(instance) {
   bank = instance;
   tmp = $("#pack_id").val().trim().split(",");
   for(var i=0;i < tmp.length;i++){
    // invesid.push(parseInt(tmp[i]))
   invesid=parseInt(tmp[i]);
    bank.invsloancheck(invesid,spvadd,{from:account,gas: 6000000}).then(function(val) {
    if(val==true)
    {
      bank.purchase_pack(invesid,spvadd,{from:account,gas: 6000000}).then(function(val){
    $("#status").html("Transaction complete!");
      })
    }
    else{
      alert("this pack is already purchased" +loanid);
    }
  }).catch(function(e) {
    console.log(e); 
    $("#status").html("Error in transaction; see log.");
  });
}
  });
},*/

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
  }).catch(function(e) {
    console.log(e);
    $("#status").html("Error in transaction; see log.");
  });
},
get_loan_list : function(){
  var self = this;

  var bank;

  $("#get_loan_list").html('');
 
  let gen_id = 0;
  Bank.deployed().then(function(instance) {
    bank = instance;
    return instance.storefi(account);
  }).then(function(val) {
    $.each(val,function(err,data1){
        bank.bank_d1(data1).then(function(val2){
          for(var i=val2[4].toNumber();i<=val2[5].toNumber();i++){
            bank.ln_get(data1,i).then(function(data,err){
                  if(account==data[4]&&data[0]>0)
                   {
              $("#get_loan_list").append('<tr><td>'+data[0]+'</td><td>'+data[11]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td id='+data[0]+'>'+data[3]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td><td>'+data[6]+'</td><td>'+data[7]+'</td><td>'+web3.fromWei(data[8].toNumber(), "ether")+'</td><td id="month_ins">'+web3.fromWei(data[9].toNumber(), "ether")+'</td><td><input type="button" class="btn btn-primary form-control" id="due-bank" value="Payment" onclick="App.pay_due('+data[0]+','+web3.fromWei(data[9].toNumber(), "ether")+');"></td></tr>');
                 gen_id ++;   
                  }
            })
          }
      }) 
    })
  });
},

/*get_loan_list:function(){
  var self = this;
  var bank;
  $("#get_loan_list").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.ln_get_id(account);
  }).then(function(val) {
      for(var i=1;i<=val.toNumber();i++){
        bank.ln_get(account,i).then(function(data,err){
          console.log(data)
          var myDate = new Date( (data[7].toNumber()) *1000);
          var a=(myDate.toLocaleString());
              if(data[0]>0)
               {
          $("#get_loan_list").append('<tr><td>'+data[0]+'</td><td>'+data[13]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td id='+data[0]+'>'+data[3]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td><td>'+data[6]+'</td><td>'+a.split(',')[0]+'</td><td>'+data[9]+'</td><td>'+web3.fromWei(data[10].toNumber(), "ether")+'</td><td id="month_ins">'+web3.fromWei(data[11].toNumber(), "ether")+'</td><td><input type="button" class="btn btn-success form-control" id="due-bank" value="Payment" onclick="App.pay_due('+data[0]+','+web3.fromWei(data[11].toNumber(), "ether")+');"></td></tr>');
                }
        });
      }
  });
},*/
invesdetail_tbody : function(){
  var self = this;
  var bank;
  $("#invesdetail_tbody").html('');
  Bank.deployed().then(function(instance) {
    bank = instance;
  }).then(function(val) {
      bank.spv_details(account).then(function(result){
        $("#invesdetail_tbody").append('<tr><td>'+account+'</td><td>'+web3.fromWei(result[0].toNumber(), "ether")+'</td><td>'+result[2]+'</td></tr>')
     
     })
    
  });
},
spvloan_tbody:function(fi){
  
  let address = $(fi.trim()).text().trim();
  $("#finance_add").val(address);
  var self = this;
  var bank;
   $("#spvloan_tbody").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.bank_d1(address);
  }).then(function(val) {
      for(var i=val[5].toNumber();i<val[4].toNumber();i++){
        bank.ln_get(address,i).then(function(data,err){
          $("#spvloan_tbody").append('<tr><td>'+data[0]+'</td><td>'+data[13]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td></tr>');
        });
      }
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
          $("#body1_bank").append('<tr><td id=b'+gen_id+'>'+data+'</td><td>'+result[0]+'</td><td>'+web3.fromWei(result[1].toNumber(), "ether")+'</td><td>'+result[3]+'</td><td><input type="button" class="btn btn-primary form-control" id="bank-de" value="Choose FI" onclick=App.spvloan_tbody("#b'+gen_id+'");></td></tr>')
          gen_id ++;
        })
       })
      
    });
  },
    
spv_tbody:function(){
  var self = this;
  var bank;
  $("#spv_tbody").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return instance.storespvfi(account);
  }).then(function(val) {
    $.each(val,function(err,data1){
        bank.bank_d1(data1).then(function(val2){
          for(var i=val2[4].toNumber();i<=val2[5].toNumber();i++){
            bank.ln_get(data1,i).then(function(data,err){
              bank.loanadd(i).then(function(data2,err){
                  if(account==data2[0]&&data[0]>0)
                   {       
          $("#spv_tbody").append('<tr><td>'+data[10]+'</td><td>'+data[0]+'</td><td>'+data[11]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td></tr>');
        }
      })
      })
    }
}) 
})
});
},
spvpack_body:function(){
  var self = this;
  var bank;
  $("#spvpack_body").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.spv_details(account);
  }).then(function(val) {
      for(var i=val[6].toNumber();i<=val[5].toNumber();i++){

        bank.packagedetail(account,i).then(function(data,err){
          
          $("#spvpack_body").append('<tr><td>'+data[0]+'</td><td>'+web3.fromWei(data[1].toNumber(), "ether")+'</td></tr>');
        });
      }
});
},
spvpackdetail_body:function(fii){
  let address = $(fii.trim()).text().trim();
  $("#spv_add").val(address);
  var self = this;
  var bank;
  
  $("#spvpackdetail_body").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.spv_details(account);
  }).then(function(val) {
      for(var i=val[6].toNumber();i<=val[5].toNumber();i++){

        bank.packagedetail(account,i).then(function(data,err){
          
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
    return bank.spv_details(account);
  }).then(function(val) {
      for(var i=val[6].toNumber();i<=val[5].toNumber();i++){

        bank.packagedetail(account,i).then(function(data,err){
          
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
    return bank.bank_d1(account);
  }).then(function(val) {
   // alert(val)
      for(var i=val[5].toNumber();i<val[4].toNumber();i++)
      {
        bank.ln_get(account,i).then(function(data,err)
        {
          $("#fi_loan_list").append('<tr><td>'+data[0]+'</td><td>'+data[11]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[4]+'</td><td>'+web3.fromWei(data[5].toNumber(), "ether")+'</td><td>'+data[6]+'</td><td>'+data[7]+'</td><td>'+web3.fromWei(data[8].toNumber(), "ether")+'</td><td id="month_ins">'+web3.fromWei(data[9].toNumber(), "ether")+'</td><td>'+"sold"+'</td></tr>');
        });
      }
  });
},
pay_due:function(id,amount){
  var address = $("#"+id).text().trim();
  alert(amount)
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