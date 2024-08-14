import AuthService from "@/services/AuthService";
import { APIResponse } from "@/types/APIResponse";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import { PoskoModel } from "../types/PoskoModel";

class PoskoService {
  private poskoUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/posko`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async list(): Promise<APIResponse<PoskoModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.get<APIResponse<PoskoModel[]>>(
        `${this.poskoUrl}/list`,
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

export default PoskoService;
