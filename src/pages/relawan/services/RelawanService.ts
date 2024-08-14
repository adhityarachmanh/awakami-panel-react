import AuthService from "@/services/AuthService";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import {
  RelawanEditFormModel,
  RelawanFormModel,
  RelawanModel,
} from "../types/RelawanModel";

class RelawanService {
  private baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/relawan`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  public async create(data: RelawanFormModel) {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.post<APIResponse<RelawanModel>>(
          `${this.baseURL}/create`,
          data,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        return response.data.data;
      }
      throw new Error("Token refresh failed");
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  public async all(postQuery: PostQuery): Promise<APIResponse<any>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.post<APIResponse<any>>(
        `${this.baseURL}/all`,
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
  public async getDetail(id: number) {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.get<APIResponse<RelawanModel>>(
          `${this.baseURL}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        return response.data.data;
      }
      throw new Error("Token refresh failed");
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  async update(id: number, data: RelawanEditFormModel) {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.put<APIResponse<RelawanModel>>(
          `${this.baseURL}/update/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        return response.data.data;
      }
      throw new Error("Token refresh failed");
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
}

export default RelawanService;
