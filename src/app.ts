import express, { Request, Response, NextFunction } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = Number(process.env.DB_PORT) || 4000;

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  port: PORT,
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected');
});

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

app.get('/', (req, res) => res.send('Hellow World!!'));

app.listen('8080', () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8080
  ################################################
`);
});
