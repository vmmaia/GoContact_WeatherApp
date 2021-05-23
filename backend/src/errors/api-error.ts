import { CustomError } from './custom-error';

class APIError extends CustomError {
  statusCode = 500;

  constructor(message?: string) {
    super(message ? message : 'Something went wrong with the external API');

    Object.setPrototypeOf(this, APIError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message
          ? this.message
          : 'Something went wrong with the external API'
      }
    ];
  }
}

export default APIError;
