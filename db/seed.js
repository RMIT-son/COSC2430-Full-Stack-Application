// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dang Quoc Thang
// ID: s3977877
// Acknowledgement: Acknowledge the resources that you use here.
User.insertMany([
    {
      "username": "customer01",
      "password": "Customer@123",
      "role": "customer",
      "profilePicture": "/path/to/customer01/menprofile.png",
      "name": "Alice Johnson",
      "address": "123 Elm Street, Springfield"
    },
    {
      "username": "customer02",
      "password": "Customer@456",
      "role": "customer",
      "profilePicture": "/path/to/customer02/womenprofile.png",
      "name": "Bob Smith",
      "address": "456 Maple Avenue, Shelbyville"
    },
    {
      "username": "vendor01",
      "password": "Vendor@789",
      "role": "vendor",
      "profilePicture": "/path/to/vendor01/menprofile.png",
      "name": "Charlie Brown",
      "address": "789 Birch Boulevard, Springfield",
      "businessName": "Charlie's Electronics"
    },
    {
      "username": "vendor02",
      "password": "Vendor@101",
      "role": "vendor",
      "profilePicture": "/path/to/vendor02/menprofile.png",
      "name": "Diana White",
      "address": "101 Pine Place, Capital City",
      "businessName": "Diana's Delights"
    },
    {
      "username": "shipper01",
      "password": "Shipper@121",
      "role": "shipper",
      "profilePicture": "/path/to/shipper01/womenprofile.png",
      "name": "Edward Black",
      "address": "121 Cedar Court, Ogdenville",
      "distributionHub": "Hanoi"
    }
])
  .then(() => {
    console.log('Data seeded successfully.');
    process.exit();
  })
  .catch(error => {
    console.error('Error seeding data:', error);
  });


DistributionHub.insertMany(
    [
        {
          "name": "Ho Chi Minh Hub",
          "address": "123 Nguyen Hue Street, District 1, Ho Chi Minh City"
        },
        {
          "name": "Da Nang Hub",
          "address": "456 Tran Phu Street, Hai Chau District, Da Nang City"
        },
        {
          "name": "Hanoi Hub",
          "address": "789 Hoang Quoc Viet Street, Cau Giay District, Hanoi City"
        },
        {
          "name": "Can Tho Hub",
          "address": "101 Vo Van Kiet Street, Ninh Kieu District, Can Tho City"
        },
        {
          "name": "Hue Hub",
          "address": "234 Le Loi Street, Phu Hoi Ward, Hue City"
        }
    ]
)
.then(() => {
    console.log('Data seeded successfully.');
    process.exit();
  })
  .catch(error => {
    console.error('Error seeding data:', error);
  });

Product.insertMany(
    [
        {
          "vendorId": "613a8a785d744ab59c488a89",  // Sample ObjectId for vendor reference
          "name": "Wireless Bluetooth Headphones",
          "price": 49.99,
          "image": "/path/to/product1/airpods.png",
          "description": "High-quality wireless headphones with noise-cancelling feature."
        },
        {
          "vendorId": "613a8a785d744ab59c488a90",
          "name": "Ultra Slim Laptop",
          "price": 799.99,
          "image": "/path/to/product2/laptop.png",
          "description": "Lightweight, ultra slim laptop with 13-inch display and 12-hour battery life."
        },
        {
          "vendorId": "613a8a785d744ab59c488a91",
          "name": "Smart LED TV",
          "price": 299.99,
          "image": "/path/to/product3/tv.png",
          "description": "40-inch Smart LED TV with crystal clear display and internet connectivity."
        },
        {
          "vendorId": "613a8a785d744ab59c488a92",
          "name": "Portable Bluetooth Speaker",
          "price": 24.99,
          "image": "/path/to/product4/speaker.png",
          "description": "Compact portable Bluetooth speaker with powerful sound output."
        },
        {
          "vendorId": "613a8a785d744ab59c488a93",
          "name": "Digital Camera",
          "price": 199.99,
          "image": "/path/to/product5/camera.png",
          "description": "20MP digital camera with 5x optical zoom and 1080p video recording."
        }
      ]      
)
.then(() => {
    console.log('Data seeded successfully.');
    process.exit();
  })
  .catch(error => {
    console.error('Error seeding data:', error);
  });

ShoppingCart.insertMany(
    [
        {
          "userId": "613b8a785d744ab59c488a80",  // Sample ObjectId for user reference
          "items": [
            {
              "productId": "613c8a785d744ab59c488a50", // Sample ObjectId for product reference
              "quantity": 2,
              "priceAtOrder": 49.99
            },
            {
              "productId": "613c8a785d744ab59c488a51",
              "quantity": 1,
              "priceAtOrder": 799.99
            }
          ]
        },
        {
          "userId": "613b8a785d744ab59c488a81",
          "items": [
            {
              "productId": "613c8a785d744ab59c488a52",
              "quantity": 1,
              "priceAtOrder": 299.99
            }
          ]
        },
        {
          "userId": "613b8a785d744ab59c488a82",
          "items": [
            {
              "productId": "613c8a785d744ab59c488a53",
              "quantity": 3,
              "priceAtOrder": 24.99
            },
            {
              "productId": "613c8a785d744ab59c488a54",
              "quantity": 1,
              "priceAtOrder": 199.99
            }
          ]
        },
        {
          "userId": "613b8a785d744ab59c488a83",
          "items": []
        },
        {
          "userId": "613b8a785d744ab59c488a84",
          "items": [
            {
              "productId": "613c8a785d744ab59c488a55",
              "quantity": 1,
              "priceAtOrder": 49.99
            }
          ]
        }
      ]
      
)
.then(() => {
    console.log('Data seeded successfully.');
    process.exit();
  })
  .catch(error => {
    console.error('Error seeding data:', error);
  });

Order.insertMany(
    [
        {
          "userId": "613b9a785d744ab59c488a94",
          "items": [
            {
              "productId": "613c9a785d744ab59c488a60",
              "quantity": 2,
              "priceAtOrder": 49.99
            },
            {
              "productId": "613c9a785d744ab59c488a61",
              "quantity": 1,
              "priceAtOrder": 799.99
            }
          ],
          "totalAmount": 899.97,
          "orderStatus": "active",
          "distributionHub": "613d8a785d744ab59c488a10",
          "orderDate": "2023-09-15T09:00:00.000Z"
        },
        {
          "userId": "613b9a785d744ab59c488a95",
          "items": [
            {
              "productId": "613c9a785d744ab59c488a62",
              "quantity": 1,
              "priceAtOrder": 299.99
            }
          ],
          "totalAmount": 299.99,
          "orderStatus": "delivered",
          "distributionHub": "613d8a785d744ab59c488a11",
          "orderDate": "2023-09-12T10:45:00.000Z"
        },
        {
          "userId": "613b9a785d744ab59c488a96",
          "items": [
            {
              "productId": "613c9a785d744ab59c488a63",
              "quantity": 3,
              "priceAtOrder": 24.99
            },
            {
              "productId": "613c9a785d744ab59c488a64",
              "quantity": 1,
              "priceAtOrder": 199.99
            }
          ],
          "totalAmount": 275.96,
          "orderStatus": "canceled",
          "distributionHub": "613d8a785d744ab59c488a12",
          "orderDate": "2023-09-14T14:30:00.000Z"
        },
        {
          "userId": "613b9a785d744ab59c488a97",
          "items": [],
          "totalAmount": 0,
          "orderStatus": "active",
          "distributionHub": "613d8a785d744ab59c488a13",
          "orderDate": "2023-09-16T15:20:00.000Z"
        },
        {
          "userId": "613b9a785d744ab59c488a98",
          "items": [
            {
              "productId": "613c9a785d744ab59c488a65",
              "quantity": 1,
              "priceAtOrder": 49.99
            }
          ],
          "totalAmount": 49.99,
          "orderStatus": "active",
          "distributionHub": "613d8a785d744ab59c488a10",
          "orderDate": "2023-09-17T16:50:00.000Z"
        }
      ]      
)
.then(() => {
    console.log('Data seeded successfully.');
    process.exit();
  })
  .catch(error => {
    console.error('Error seeding data:', error);
  });