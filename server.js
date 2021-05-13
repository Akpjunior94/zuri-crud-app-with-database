const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')

const app = express();

// Using our body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_crud'
});
// mysqlConnection.connect((err) => {
//   if (err) {
//     console.log('Connection Failed')
//   } else {
//     console.log('Connected!');
//   }
// });

// Get all users
app.get('', (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    connection.query(`SELECT * from profiles`, (err, rows) => {
      connection.release() //returns the connection to the pool

      if (err) {
        console.log(err)
      } else {
        res.send(rows)
      }
    })
  })
})

// Getting each users by their ID
app.get('/:id', (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    connection.query(`SELECT * from profiles WHERE id = ?`, [req.params.id], (err, rows) => {
      connection.release() //returns the connection to the pool

      if (err) {
        console.log(err)
      } else {
        res.send(rows)
      }
    })
  })
})

// UPDATE USER PROFILE
app.put('', (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const { id, name, email, country } = req.body;

    connection.query(`UPDATE profiles SET name = ?, email = ?, country = ? WHERE id = ?`, [name, email, country, id], (err, rows) => {
      connection.release() //returns the connection to the pool

      if (err) {
        console.log(err)
      } else {
        res.send(`Profile with the NAME: ${name} has been Updated`)
      }
    })
  })
})

// DELETE users PROFILE Record
app.delete('/:id', (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    connection.query(`DELETE from profiles WHERE id = ?`, [req.params.id], (err, rows) => {
      connection.release() //returns the connection to the pool

      if (err) {
        console.log(err)
      } else {
        res.send(`Profile with the RECORD ID: ${[req.params.id]} has been Deleted`)
      }
    })
  })
})

// Add users Route Record
app.post('', (req, res) => {

  pool.getConnection((err, connection) => {
    if(err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const params = req.body

    connection.query(`INSERT INTO profiles SET ?`, params, (err, rows) => {
      connection.release() //returns the connection to the pool

      if (err) {
        console.log(err)
      } else {
        res.send(`Profile with the NAME: ${params.name} has been Added`)
      }
    })
  })
})

// Listening on environment port or 5000 
// app.listen(port, () => console.log(`Listen on port ${port}`))

app.listen(process.env.PORT || 4000);