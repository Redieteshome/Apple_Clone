const mysql = require("mysql2");
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: true }));

const sqlConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "myDBuser",
  password: "myDBuser",
  database: "myDB",
  port: 3345,
});

sqlConnection.connect((err) => {
  if (err) console.log(err.message);
  else console.log("Connected");
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success 1",
  });
});
// Question 2
app.get("/install", (req, res) => {
  //  Step 1: Store all CREATE TABLE queries in an array
  // This makes the code cleaner and easier to manage
  const tables = [
    // Products table
    `CREATE TABLE IF NOT EXISTS Products(
      product_id INT AUTO_INCREMENT,
      product_url VARCHAR(255) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      PRIMARY KEY (product_id)
    )`,

    // Product description table
    `CREATE TABLE IF NOT EXISTS ProductDescription(
      description_id INT AUTO_INCREMENT,
      product_id INT(11) NOT NULL,
      product_brief_description VARCHAR(255) NOT NULL,
      product_description TEXT NOT NULL,
      product_img VARCHAR(255) NOT NULL,
      product_link VARCHAR(255) NOT NULL,
      PRIMARY KEY (description_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`,

    // Product price table
    `CREATE TABLE IF NOT EXISTS ProductPrice(
      price_id INT AUTO_INCREMENT,
      product_id INT(11) NOT NULL,
      starting_price VARCHAR(255) NOT NULL,
      price_range VARCHAR(255) NOT NULL,
      PRIMARY KEY (price_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`,

    // Users table
    `CREATE TABLE IF NOT EXISTS Users(
      user_id INT AUTO_INCREMENT,
      user_name VARCHAR(255) NOT NULL,
      user_password VARCHAR(255) NOT NULL,
      PRIMARY KEY (user_id)
    )`,

    // Orders table
    `CREATE TABLE IF NOT EXISTS Orders(
      order_id INT AUTO_INCREMENT,
      product_id INT(11) NOT NULL,
      user_id INT(11) NOT NULL,
      PRIMARY KEY (order_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id),
      FOREIGN KEY (user_id) REFERENCES Users(user_id)
    )`,
  ];

  // Step 2: Loop through each query using forEach
  // This executes each CREATE TABLE statement one by one
  tables.forEach((query, index) => {
    sqlConnection.query(query, (err) => {
      if (err) {
        // Log error message if something goes wrong
        console.log(`Error creating table #${index + 1}:`, err.message);
      }
    });
  });

  // Step 3: Send response after triggering all table creation queries
  res.send("All tables created Successfully");
});

// // Question 3
// // Insert a new iPhone
// app.post("/add-product", (req, res) => {
//   // products table
//   let product_name = req.body.product_name;
//   let product_url = req.body.product_url;

//   // product_description table
//   let product_brief_description = req.body.product_brief_description;
//   let product_description = req.body.product_description;
//   let product_img = req.body.product_img;
//   let product_link = req.body.product_link;

//   // ProductPrice table
//   let starting_price = req.body.starting_price;
//   let price_range = req.body.price_range;

//   // User table
//   let user_name = req.body.user_name;
//   let user_password = req.body.user_password;

//   // inserting values in Product table
//   let insertProduct = `INSERT INTO Products(product_url, product_name) VALUES ("${product_url}", "${product_name}")`;

//   // send the value to the database
//   sqlConnection.query(insertProduct, (err) => {
//     if (err) {
//       console.log(err);
//     }

//     // selecting id from product table
//     const getPID = `SELECT product_id FROM Products WHERE product_name = "${product_name}"`;

//     sqlConnection.query(getPID, (err, result) => {
//       if (err) {
//         console.log(err);
//       }

//       const PId = result[0].product_id;

//     let insert_product_des = `INSERT INTO ProductDescription(product_id, product_brief_description,product_description, product_img,product_link) VALUES (${PId}, "${product_brief_description}", "${product_description}", "${product_img}", "${product_link}")`;

//       let insert_Product_price = `INSERT INTO ProductPrice(product_id, starting_price, price_range) VALUES (${PId}, "${starting_price}", "${price_range}")`;

//       let insert_User = `INSERT INTO Users(user_name, user_password) VALUES ("${user_name}", "${user_password}")`;

//       sqlConnection.query(insert_product_des, (err) => {
//         if (err) {
//           console.log(err);
//         }
//       });

//       sqlConnection.query(insert_Product_price, (err) => {
//         if (err) {
//           console.log(err);
//         }
//       });

//       sqlConnection.query(insert_User, (err) => {
//         if (err) {
//           console.log(err);
//         }

//         // selecting user-id from user-table
//         let getuserID = `SELECT user_id FROM Users WHERE user_name = "${user_name}"`;

//         sqlConnection.query(getuserID, (err, result) => {
//           if (err) {
//             console.log(err);
//           }

//           let userID = result[0].user_id;

//           const insert_Order = `INSERT INTO Orders(product_id, user_id) VALUES (${PId}, ${userID})`;

//           sqlConnection.query(insert_Order, (err) => {
//             if (err) {
//               console.log(err);
//             }

//             console.log(
//               "Product, descriptions, price, user, and order inserted successfully!"
//             );
//             res.send("Data inserted successfully!");
//           });
//         });
//       });
//     });
//   });
// });

// app.listen(4000, () => {
//   console.log("Listening on port 4000");
// });

// Question 3 Inserting the data
app.post("/add-product", (req, res) => {
  const {
    product_url,
    product_name,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
    user_name,
    user_password,
  } = req.body;

  const products = `INSERT INTO Products (product_url, product_name) VALUES (?, ?)`;
  const description = `INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES (?, ?, ?, ?, ?)`;
  const price = `INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?, ?, ?)`;
  const user = `INSERT INTO Users (user_name, user_password) VALUES (?, ?)`;
  const order = `INSERT INTO Orders (product_id, user_id) VALUES (?, ?)`; // fixed with VALUES

  // Step 1: Insert into Products table
  sqlConnection.query(
    products,
    [product_url, product_name],
    (err, productResult) => {
      if (err) {
        console.log(`Error inserting product: ${err}`);
        return res.status(500).send("Error inserting product");
      }

      const productId = productResult.insertId; //  get product_id directly

      // Step 2: Insert into ProductDescription
      sqlConnection.query(
        description,
        [
          productId,
          product_brief_description,
          product_description,
          product_img,
          product_link,
        ],
        (err) => {
          if (err) console.log(`Error inserting description: ${err}`);
        }
      );

      // Step 3: Insert into ProductPrice
      sqlConnection.query(
        price,
        [productId, starting_price, price_range],
        (err) => {
          if (err) console.log(`Error inserting price: ${err}`);
        }
      );

      // Step 4: Insert into Users table
      sqlConnection.query(
        user,
        [user_name, user_password],
        (err, userResult) => {
          if (err) {
            console.log(`Error inserting user: ${err}`);
            return res.status(500).send("Error inserting user");
          }

          const userId = userResult.insertId; // get user_id directly

          // Step 5: Insert into Orders table
          sqlConnection.query(order, [productId, userId], (err) => {
            if (err) {
              console.log(`Error inserting order: ${err}`);
              return res.status(500).send("Error inserting order");
            }

            console.log("All data inserted successfully!");
            res.send("All data inserted successfully!");
          });
        }
      );
    }
  );
});


// Route to get all iPhones with their descriptions and prices
app.get("/iphones", (req, res) => {
  // SQL query to join Products, ProductDescriptions, and ProductPrices tables
  sqlConnection.query(
    `SELECT * FROM Products
     INNER JOIN ProductDescription  ON Products.product_id = ProductDescription.product_id
     INNER JOIN ProductPrice ON Products.product_id = ProductPrice.product_id`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database error");
        return;
      }
      // Send the joined data as JSON response
      res.json(rows);
    }
  );
});



app.get("/iphones/:product_id", (req, res) => {

  const productId = req.params.product_id;
  // SQL query to join Products, ProductDescriptions, and ProductPrices tables
  sqlConnection.query(
    `SELECT * FROM Products
     JOIN ProductDescription  ON Products.product_id = ProductDescription.product_id
     JOIN ProductPrice ON Products.product_id = ProductPrice.product_id
     WHERE Products.product_id =  ${productId}`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database error");
        return;
      }
      // Send the joined data as JSON response
      res.json(rows);
    }
  );
});



// Server listening on port 4000
app.listen(4000, (err) => {
  if (err) {
    console.log("Listening on port 4000");
  }
});
