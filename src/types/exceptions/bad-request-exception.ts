import ErrorResponse from "../response/error-response";

export class BadRequestException extends ErrorResponse {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestException";
  }
}
