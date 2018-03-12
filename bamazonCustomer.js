var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    user: "root",
  
    password: "root",
    database: "bamazon_DB"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run functions below
    displayItems();
    connection.end();
  });

  function displayItems() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
      }
      console.log("----------------------------------------------------------");
      runPurchase();
    });
  }

  function runPurchase() {
    inquirer
      .prompt([
        {
            name: "item",
            type: "input",
            message: "ID of item you would like to buy: ",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to buy: ",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
        },
    ])
      .then(function(answer) {
        
      });
  }