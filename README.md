
# Clothify

An online fashion store to scale up your business.


## Screenshots

![App Screenshot](https://github.com/sparsh-18/Clothify/blob/master/screenshots/HomeEx.png?raw=true)

  
## Tech Stack

**Client:** Bootstrap Template, EJS

**Server:** Node, Express

**Database:** Mysql

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Root Admin Credentials**

```
adminname=admin@dashboard

adminpassword=123
```

  
## Installation

Clone the project

```bash
  git clone https://github.com/sparsh-18/Clothify
```

Go to the project directory

```bash
  cd Clothify
```

Create Database

```bash
  Create a new database of the name ecom in phpmyadmin

  Import emon.sql in it.
```

Install dependencies

```bash
  npm init
  npm install
```

Start the server

```bash
  npm run start
```

  
## Features

***Users can do the following:***

- Create an account, login or logout


<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/registerEx.png?raw=true" width="600" > </img>
<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/loginEx.png?raw=true" width="600" > </img>

- Browse available products added by the admin

<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/prodExample.png?raw=true" width="600" > </img>
<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/allProdEx.png?raw=true" width="600" > </img>

- Add products to the shopping cart
- Delete products from the shopping cart
- Display the shopping cart
- To checkout, a user must be logged in
- The profile contains all the orders a user has made

<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/profileExample.png?raw=true" width="600" > </img>


***Admins can do the following:***

- Add/Delete new admins (Only root user can)
- Login or logout to the admin panel
- View all the information stored in the database.

<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/UsersEx.png?raw=true" width="600" > </img>

- Approve/Decline Orders

<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/ApproveExample.png?raw=true" width="600" > </img>

- Add/Delete delivery locations

<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/delvEx.png?raw=true" width="600" > </img>

- View/add/edit/delete orders, users, products and categories. The cart model cannot be modified by an admin because a cart is either modified by the logged in user before the purchase or deleted after the purchase.

<img src="https://github.com/sparsh-18/Clothify/blob/master/screenshots/addprodex.png?raw=true" width="600" > </img>

  
## Authors

- [Sparsh Verma](https://github.com/sparsh-18)
- [Mohd Rafey Khan](https://github.com/mohd-rafey-khan)

  
