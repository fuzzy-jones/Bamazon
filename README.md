# Bamazon
In this application, I created an Amazon-like storefront using a MySQL database. The app will takes in orders from customers and updates stock from the store's inventory.

### Instructions
When "node bamazonCustomer.js" is passed into the command line, all available products for purchase will be displayed. The customer will then be prompted to enter an "id" number for the item they would like to purchase. Next, they will be asked how many of the item they would like to buy. Once the user enters the amount they will be prompted with a total amount of purchase. The user will next be prompted if they would like to make another purchase, If "y" they will be able to make another purchase if available. Once the customer selects "n", the connection will end.

As each purchase is made the MySQL database will update the inventory count. If the customer selects to buy more product than available, they will be prompted "Sorry, not enough inventory to fill order" and the available inventory count will be displayed. They will then be prompted if they would like to make another purchase. A demonstration of the app displayed below, and a demonstration of the MySQL update is below the node demo.

### Node DEMO
![GIF DEMO](/images/bamazon1.gif)

### Node DEMO updating database
![GIF DEMO](/images/bamazon2.gif)