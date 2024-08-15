import AuthService from "@/services/AuthService";
import { APIResponse } from "@/types/APIResponse";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import { TPSFormModel, TPSModel } from "../types/TPSModel";
import { PostQuery } from "@/types/PostQuery";

class TPSService {
  private baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/TPS`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  public async create(data: TPSFormModel): Promise<TPSModel> {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.post<APIResponse<TPSModel>>(
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
      throw new Error("User not authenticated");
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  public async update(id: number, data: TPSFormModel): Promise<TPSModel> {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.put<APIResponse<TPSModel>>(
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
      throw new Error("User not authenticated");
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  public async getDetail(id: number): Promise<TPSModel> {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.get<APIResponse<TPSModel>>(
          `${this.baseURL}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        return response.data.data;
      }
      throw new Error("User not authenticated");
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  async all(postQuery: PostQuery): Promise<APIResponse<TPSModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.post<APIResponse<TPSModel[]>>(
        `${this.baseURL}/all`,
        postQuery,
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
  async list(): Promise<APIResponse<TPSModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.get<APIResponse<TPSModel[]>>(
        `${this.baseURL}/list`,
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
  async delete(ids: string[]): Promise<APIResponse<any>> {
    const auth = this.authService.getAuthenticated();
    if (!auth) {
      throw new Error("User not authenticated");
    }
    try {
      const response = await axios.post<APIResponse<any>>(
        `${this.baseURL}/delete`,
        {
          ids: ids,
        },
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
