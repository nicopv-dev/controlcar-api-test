import ErrorResponse from "../response/error-response";

export class NotFoundException extends ErrorResponse {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundException";
  }
}
