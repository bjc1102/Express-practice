import express, { Request, Response, NextFunction, response } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv'; //DB 패스워드와 비밀번호드을 숨기기 위해 사용함
import jwt from 'jsonwebtoken';
import { decode } from 'punycode';
dotenv.config();

const app = express();

const PORT = Number(process.env.DB_PORT) || 3000;
const JWT_KEY = process.env.JWT_KEY || 'key';

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
  // const sql = 'insert into 학생(학번 , 이름 , 학년 , 학과) values (101, "영수나", 4 , "전자공")';
  const sql1 = 'update 학생 set 학년 = 2 where 학과 = "컴퓨터"';
  const sql = 'select 학생.이름, 학생.학번 from 학생 where 학과="컴퓨터"';
  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log('update complete');
  });
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/all', (req, res) => {
  const sql = 'select * from 학생';
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/token', (req, res) => {
  const Token = jwt.sign(
    {
      data: 'foobar',
    },
    JWT_KEY,
    { expiresIn: 60 * 60 }
  );

  const decoded = jwt.verify(Token, JWT_KEY);
  console.log(decoded);
  res.send(Token);
});

app.listen('8080', () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8080
  ################################################
`);
});

// delete는 참조 무결성 문제를 고려해야함
// 관계형 데이터베이스에서 데이터를 삭제할 때 미치는 영향
// table 생성시 외래키로 분류한 것들
