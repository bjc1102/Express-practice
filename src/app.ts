import express, { Request, Response, NextFunction, response } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv'; //DB 패스워드와 비밀번호드을 숨기기 위해 사용함
dotenv.config();

const app = express();

const PORT = Number(process.env.DB_PORT) || 3000;

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  port: PORT,
  database: 'express_db',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected');

  // const sql = 'insert into 학생(학번 , 이름 , 학년 , 학과) values (100, "나수영", 4 , "컴퓨터")';
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log('학생 추가됨');
  // });

  // const sql =
  //   ' CREATE TABLE 학생 ( 학번 INT NOT NULL PRIMARY KEY, 이름 CHAR(11),학년 INT,학과 CHAR(11))';
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log('table created');
  // });

  // con.query('CREATE DATABASE express_db', function (err, result) {
  //   if (err) throw err;
  //   console.log('database create');
  // });
});

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

app.get('/', (req, res) => {
  const sql = 'select * from 학생';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.listen('8080', () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8080
  ################################################
`);
});
