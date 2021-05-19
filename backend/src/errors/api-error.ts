import { CustomError } from './custom-error';

class APIError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Something went wrong with the external API');

    Object.setPrototypeOf(this, APIError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Something went wrong with the external API' }];
  }
}

export default APIError;
