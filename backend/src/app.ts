import express, { Request, Response } from 'express';

import 'express-async-errors';

import allowCORSMiddleware from './middlewares/allow-cors';
import errorHandlerMiddleware from './middlewares/error-handler';
import requestLoggerMiddleware from './middlewares/request-logger';

import SearchRoute from './routes/search';
import CurrentRoute from './routes/current';

import NotFoundError from './errors/not-found-error';

import { json } from 'body-parser';

const app = express();

//Allow CORS for development sake... Remove in build
app.use(allowCORSMiddleware);

app.use(json());
app.use(requestLoggerMiddleware);

app.use(SearchRoute);
app.use(CurrentRoute);

app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandlerMiddleware);

export { app };
