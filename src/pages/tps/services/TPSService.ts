import AuthService from "@/services/AuthService";
import { APIResponse } from "@/types/APIResponse";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import { TPSModel } from "../types/TPSModel";

class TPSService {
  private TPSUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/TPS`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async list(): Promise<APIResponse<TPSModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.get<APIResponse<TPSModel[]>>(
        `${this.TPSUrl}/list`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }

  
}

export default TPSService;
