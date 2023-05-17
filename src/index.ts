import express, { Request, Response } from "express";
import sql from "mssql";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || "";


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}


app.get("/", (req: Request, res: Response) => {
  sql
    .connect(config)
    .then((pool) => {
      // Query

      return pool
        .request()
        .input("input_parameter", sql.Int, value)
        .query("select * from mytable where id = @input_parameter");
    })
    .then((result) => {
      console.dir(result);
    })
    .catch((err) => {
      // ... error checks
    });
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
