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
      const responses = await axios.all([
        axios.get(currentURL),
        axios.get(astronomyURL)
      ]);

      const responseCurrent = responses[0];
      const responseAstro = responses[1];

      const currentData: CurrentResponseFormat = responseCurrent.data;
      const astroData: AstroResponseFormat = responseAstro.data;

      const response: ResponseFormat = {
        name: currentData.location.name,
        details: `${currentData.location.region}, ${currentData.location.country}`,
        time: new Date(currentData.location.localtime!).getTime() || 0,
        temperature: currentData.current.temp_c,
        is_day: currentData.current.is_day,
        weather: currentData.current.condition.text,
        weather_icon: currentData.current.condition.icon.split('/').pop()!,
        sunrise: astroData.astronomy.astro.sunrise,
        sunrise_epoch:
          new Date(
            `${getFormattedDate()} ${astroData.astronomy.astro.sunrise}`
          ).getTime() || 0,
        sunset: astroData.astronomy.astro.sunset,
        sunset_epoch:
          new Date(
            `${getFormattedDate()} ${astroData.astronomy.astro.sunset}`
          ).getTime() || 0
      };

      res.send(response);
    } catch (error) {
      if (error.response && error.response.status !== 200) {
        if (
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message
        ) {
          throw new APIError(error.response.data.error.message);
        }
      }
      throw error;
    }
  }
);

export default router;
