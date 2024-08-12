import axios from 'axios';

export class ResponseHandler {
  static handleSuccessResponse(response: any): any {
    // Process the success response dynamically
    if (response.data) {
      return response.data;
    }
    // Add more conditions as needed
    return response;
  }

  static handleErrorResponse(error: any): never {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
}