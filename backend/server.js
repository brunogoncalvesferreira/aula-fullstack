import express, { json } from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'

const db = new sqlite3.Database('./database.db')

db.serialize(() => {
  db.run(
    `create table if not exists users (
      id text primary key,
      name text,
      email text,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  )
})

const app = express()
app.use(express.json())

app.use(cors())

app.post('/users', (req, res) => {
  const { name, email } = req.body
  const id = crypto.randomUUID()


  db.run(`insert into users (id, name, email) values (?,?,?)`, [id, name, email], (err) => {
      if(err) {
        return res.status(500).json(err)
      } else {
        return res.status(201).json('Usuário criado com sucesso!')
      }
    })
})

app.get('/users', (req, res) => {
  db.all('select * from users order by created_at desc', (err, rows) => {
    if(err) {
      console.log(err)
    } else {
      return res.status(200).json(rows)
    }
  })
})

app.listen(8080, () => {
  console.log('Servidor ligado com sucesso')
})