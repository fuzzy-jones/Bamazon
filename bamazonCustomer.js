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
    // connection.end();
  });

  function displayItems() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
      }
      console.log("----------------------------------------------------------");
      makePurchase();
    });
  }

function makePurchase() {
    inquirer
    .prompt([
        {
            name: "item",
            type: "input",
            message: "ID # of item you would like to buy: ",
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
            connection.query("SELECT * FROM products WHERE item_id = ?", [answer.item], function(err, results) {
            if (err) throw err;
                // console.log(results);
                // console.log(results[0]);
                if (answer.amount > results[0].stock_quantity) {
                    console.log("Sorry, not enough inventory to fill order");
                    console.log("Quantity in stock = " + results[0].stock_quantity);
                    newOrder();
                } else {
                    console.log("Thank you, your order has been placed");
                    // rounding total price to 2 decimal places
                    var num = results[0].price * answer.amount;
                    var fixed_num = parseFloat(num).toFixed( 2 );
                    console.log("Total Cost: $" + (fixed_num));
                    // update inventory with amount purchased
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: results[0].stock_quantity - answer.amount
                            },
                            {
                                item_id: answer.item
                            }
                        ],
                        function(err, results) {
                            
                        }
                    );
                    newOrder();
                }
            })
        });
};

// function to run a prompt asking if user wants to make another purchase
// if yes, then run the make purchase function again
// if no, then end connection
function newOrder() {
    inquirer
    .prompt(
      {
        name: "choice",
        type: "confirm",
        message: "Would you like to make another purchase?"
      },
    ) .then(function(answer) {
        if (answer.choice) {
            makePurchase();
        } else {
            connection.end();
        }
    })
};

 