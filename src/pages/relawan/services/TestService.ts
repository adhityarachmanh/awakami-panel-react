import AuthService from "@/services/AuthService";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";

class TestService {
  private authUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async getPagination(postQuery: PostQuery): Promise<APIResponse<any>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.post<APIResponse<any>>(
        `${this.authUrl}/all`,
        postQuery,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
}

export default TestService;

