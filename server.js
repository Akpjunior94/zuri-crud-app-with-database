const express = require('express');

var mysql = require('mysql');



const app = express();


app.use(express.json());


// creating mySql Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_crud'
})

// connect to mysql server
connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

// Home api route
app.get('/', (req, res)=>{
  res.end(`<h1 style: text-align:center;>Welcome To Zuri Task CRUD APP</h1>
  <p>use the <strong><em>/profiles</em></strong> route to see all users data in the database Using postman</p>
  <p>use the <strong><em>/update-users</em></strong> route to update users data in the database using Postman</p>
  <p>use <strong><em>/delete-users/{id}</em></strong> route to delete user data in the database using Postman</p>
  `)
})

// Get all profiles in DB api route
app.get('/profiles', (req, res)=>{

  connection.query(`SELECT * from profiles`, (err, rows) => {

    if (err) {
      console.log(err)
    } else {
      res.send(rows);
    }
  })
})

// UPDATE USER profile in DB api route
app.put('/update-users', (req, res)=>{  

  const { id, name, email, country } = req.body;

    connection.query(`UPDATE profiles SET name = ?, email = ?, country = ? WHERE id = ?`, [name, email, country, id], (err, rows) => {

      if (err) {
        console.log(err)
      } else {
        // res.send(rows);
        res.send(`User with the name: ${name} has been updated`)
      }
    })
    console.log(req.body)

  // res.send(`<h1>User has been Updated</h1>

  // `)
})

// DELETE USER profile in DB api route
app.delete('/delete-user/:id', (req, res)=>{

    connection.query(`DELETE from profiles WHERE id = ?`, [req.params.id], (err, rows) => {

      if (err) {
        console.log(err)
      } else {
        res.send(`User with the ID: ${[req.params.id]} has been Deleted`);
      }
    })
})



// listening
app.listen(process.env.PORT || '4000', () => {
  console.log(`server is running on port: ${process.env.PORT || '4000'}`)
})

















// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql')

// const app = express();

// // Using our body parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // mySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'node_crud'
// });
// // mysqlConnection.connect((err) => {
// //   if (err) {
// //     console.log('Connection Failed')
// //   } else {
// //     console.log('Connected!');
// //   }
// // });

// // Get all users
// app.get('', (req, res) => {

//   pool.getConnection((err, connection) => {
//     if(err) throw err
//     console.log(`connected as id ${connection.threadId}`)

//     connection.query(`SELECT * from profiles`, (err, rows) => {
//       connection.release() //returns the connection to the pool

//       if (err) {
//         console.log(err)
//       } else {
//         res.send(rows)
//       }
//     })
//   })
// })

// // Getting each users by their ID
// app.get('/:id', (req, res) => {

//   pool.getConnection((err, connection) => {
//     if(err) throw err
//     console.log(`connected as id ${connection.threadId}`)

//     connection.query(`SELECT * from profiles WHERE id = ?`, [req.params.id], (err, rows) => {
//       connection.release() //returns the connection to the pool

//       if (err) {
//         console.log(err)
//       } else {
//         res.send(rows)
//       }
//     })
//   })
// })

// // UPDATE USER PROFILE
// app.put('', (req, res) => {

//   pool.getConnection((err, connection) => {
//     if(err) throw err
//     console.log(`connected as id ${connection.threadId}`)

//     const { id, name, email, country } = req.body;

//     connection.query(`UPDATE profiles SET name = ?, email = ?, country = ? WHERE id = ?`, [name, email, country, id], (err, rows) => {
//       connection.release() //returns the connection to the pool

//       if (err) {
//         console.log(err)
//       } else {
//         res.send(`Profile with the NAME: ${name} has been Updated`)
//       }
//     })
//   })
// })

// // DELETE users PROFILE Record
// app.delete('/:id', (req, res) => {

//   pool.getConnection((err, connection) => {
//     if(err) throw err
//     console.log(`connected as id ${connection.threadId}`)

//     connection.query(`DELETE from profiles WHERE id = ?`, [req.params.id], (err, rows) => {
//       connection.release() //returns the connection to the pool

//       if (err) {
//         console.log(err)
//       } else {
//         res.send(`Profile with the RECORD ID: ${[req.params.id]} has been Deleted`)
//       }
//     })
//   })
// })

// // Add users Route Record
// app.post('', (req, res) => {

//   pool.getConnection((err, connection) => {
//     if(err) throw err
//     console.log(`connected as id ${connection.threadId}`)

//     const params = req.body

//     connection.query(`INSERT INTO profiles SET ?`, params, (err, rows) => {
//       connection.release() //returns the connection to the pool

//       if (err) {
//         console.log(err)
//       } else {
//         res.send(`Profile with the NAME: ${params.name} has been Added`)
//       }
//     })
//   })
// })

// // Listening on environment port or 5000 
// // app.listen(port, () => console.log(`Listen on port ${port}`))

// app.listen(process.env.PORT || 4000);