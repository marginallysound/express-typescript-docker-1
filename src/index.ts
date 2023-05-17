import express, {Request, Response} from "express";
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || '';

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
