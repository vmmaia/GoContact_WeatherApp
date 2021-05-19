import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import axios from 'axios';
import validateRequestMiddleware from '../middlewares/validate-request';
import APIError from '../errors/api-error';

import SearchResponse from '../interfaces/search-response';
import SearchDetails from '../interfaces/search-details';
import APIResponseFormat from '../interfaces/external-api/search-response';

import { weather_api_key } from '../config.json';

const router = express.Router();

router.post(
  '/search',
  [
    body('query')
      .notEmpty()
      .isString()
      .withMessage('You must provide a valid search query')
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    const apiurl = `http://api.weatherapi.com/v1/search.json?key=${weather_api_key}&q=${req.body.query}`;

    try {
      const apiResponse = await axios.get(apiurl);

      const data = apiResponse.data;

      const response: SearchResponse = { results: new Array<SearchDetails>() };

      data.forEach((r: APIResponseFormat) => {
        const name = r.name.split(', ')[0];
        const details = r.name.substring(name.length + 2);

        response.results.push({ name, details });
      });

      res.send(response);
    } catch (error) {
      if (error.response && error.response.status !== 200) throw new APIError();
      throw new Error(error);
    }
  }
);

export default router;
