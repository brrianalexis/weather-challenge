import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import chalk from 'chalk';
import { PORT } from './constants';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api/v1', router);

const server = app.listen(PORT, () => {
	console.log(`${chalk.blue.bold('[INFO]:')} Express.js server listening on port ${PORT}!`);
});

export { server };
