import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import axios from 'axios';
import validateRequestMiddleware from '../middlewares/validate-request';
import APIError from '../errors/api-error';

import CurrentResponse from '../interfaces/current-response';
import APIResponseFormat from '../interfaces/external-api/current-weather-response';

import { weather_api_key } from '../config.json';

const router = express.Router();

router.post(
  '/current',
  [
    body('query')
      .notEmpty()
      .isString()
      .withMessage('You must provide a valid search query')
  ],
  validateRequestMiddleware,
  async (req: Request, res: Response) => {
    const apiurl = `http://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${req.body.query}&aqi=no`;

    try {
      const apiResponse = await axios.get(apiurl);

      const data: APIResponseFormat = apiResponse.data;

      const response: CurrentResponse = {
        name: data.location.name,
        details: `${data.location.region}, ${data.location.country}`,
        time: data.location.localtime!.split(' ')[1] || '00:00',
        temperature: data.current.temp_c,
        is_day: data.current.is_day
      };

      res.send(response);
    } catch (error) {
      if (error.response && error.response.status !== 200) throw new APIError();
      throw new Error(error);
    }
  }
);

export default router;
