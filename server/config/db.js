import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ingsunny",
  database: "easyshop",
});

console.log("Connected to MySQL!");
export default db;
