import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import axios from 'axios';
import getFormattedDate from '../utils/date';
import validateRequestMiddleware from '../middlewares/validate-request';
import APIError from '../errors/api-error';

import ResponseFormat from '../interfaces/current-response';
import CurrentResponseFormat from '../interfaces/external-api/current-weather-response';
import AstroResponseFormat from '../interfaces/external-api/astronomy-response';

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
    const currentURL = `http://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${req.body.query}&aqi=no`;
    const astronomyURL = `http://api.weatherapi.com/v1/astronomy.json?key=${weather_api_key}&q=${
      req.body.query
    }&dt=${getFormattedDate()}`;

    try {
      const [responseCurrent, responseAstro] = await axios.all([
        axios.get(currentURL),
        axios.get(astronomyURL)
      ]);

      const currentData: CurrentResponseFormat = responseCurrent.data;
      const astroData: AstroResponseFormat = responseAstro.data;

      const response: ResponseFormat = {
        name: currentData.location.name,
        details: `${currentData.location.region}, ${currentData.location.country}`,
        time: currentData.location.localtime!.split(' ')[1] || '00:00',
        temperature: currentData.current.temp_c,
        is_day: currentData.current.is_day,
        sunrise: astroData.astronomy.astro.sunrise,
        sunset: astroData.astronomy.astro.sunset
      };

      res.send(response);
    } catch (error) {
      if (error.response && error.response.status !== 200) throw new APIError();
      throw new Error(error);
    }
  }
);

export default router;
