const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5435,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});


app.get('/api/items', (req, res) => {
    pool.query('SELECT * FROM profile', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result.rows);
      }
    });
  });

  // app.post('/api/items', (req, res) => {
  //   const { name, email,mobilenumber ,image} = req.body;

  //   pool.query(
  //     'INSERT INTO profile (name,  email,mobilenumber,image) VALUES ($1, $2 ,$3 ,$4) RETURNING *',
  //     [name,  email,mobilenumber,image],
  //     (err, result) => {
  //       if (err) {
  //         console.error('Error executing query:', err);
  //         res.status(500).json({ error: 'Internal Server Error' });
  //       } else {
  //         res.json(result.rows[0]);
  //       }
  //     }
  //   );
  // });

  app.post('/api/items', (req, res) => {
    const { name, email, mobilenumber, image } = req.body;

    pool.query(
      'INSERT INTO profile (name, email, mobilenumber, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, mobilenumber, image],
      (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.error('Error executing query:', err);
          res.json(result.rows[0]);
        }
      }
    );
  });


  // app.put('/api/items/:id', (req, res) => {
  //   const { id } = req.params;
  //   const { name, description } = req.body;

  //   pool.query(
  //     'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
  //     [name, description, id],
  //     (err, result) => {
  //       if (err) {
  //         console.error('Error executing query:', err);
  //         res.status(500).json({ error: 'Internal Server Error' });
  //       } else if (result.rows.length === 0) {
  //         res.status(404).json({ error: 'Item not found' });
  //       } else {
  //         res.json(result.rows[0]);
  //       }
  //     }
  //   );
  // });

  // app.delete('/api/items/:id', (req, res) => {
  //   const { id } = req.params;

  //   pool.query(
  //     'DELETE FROM items WHERE id = $1 RETURNING *',
  //     [id],
  //     (err, result) => {
  //       if (err) {
  //         console.error('Error executing query:', err);
  //         res.status(500).json({ error: 'Internal Server Error' });
  //       } else if (result.rows.length === 0) {
  //         res.status(404).json({ error: 'Item not found' });
  //       } else {
  //         res.json(result.rows[0]);
  //       }
  //     }
  //   );
  // }

// );


// app.use(bodyParser.json());

// // Set up multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({ storage: storage });

// app.post('/api/items', upload.single('image'), (req, res) => {
//   const { name, email, mobilenumber } = req.body;
//   const image = req.file;

//   // Handle image file upload
//   let imagePath = null;
//   if (image) {
//     imagePath = image.path;
//   }

//   // Insert data into the database
//   pool.query(
//     'INSERT INTO profile (name, email, mobilenumber, image) VALUES ($1, $2, $3, $4) RETURNING *',
//     [name, email, mobilenumber, imagePath],
//     (err, result) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.json(result.rows[0]);
//       }
//     }
//   );
// });
