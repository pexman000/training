import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes);
app.get("/", (req: Request, res: Response) => {

});



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});