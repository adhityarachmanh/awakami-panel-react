import AuthService from "@/services/AuthService";
import { APIResponse } from "@/types/APIResponse";
import { PostQuery } from "@/types/PostQuery";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import {
  RelawanEditFormModel,
  RelawanFormModel,
  RelawanModel,
  TPSRelawanModel,
} from "../types/RelawanModel";
import { TPSRelawanFormModel } from "../types/TPSRelawanModel";

class RelawanService {
  private baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/relawan`;
  private baseURLTPSRelawan = `${
    import.meta.env.VITE_BASE_URL
  }/api/v1/tps_relawan`;
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
      throw new Error("User not authenticated");
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  public async all(postQuery: PostQuery): Promise<APIResponse<RelawanModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.post<APIResponse<RelawanModel[]>>(
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
      throw new Error("User not authenticated");
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
      throw new Error("User not authenticated");
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
  async getTPSRelawan(id: number): Promise<APIResponse<TPSRelawanModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.get<APIResponse<TPSRelawanModel[]>>(
          `${this.baseURLTPSRelawan}/list-by-relawan-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        return response.data;
      }
      throw new Error("User not authenticated");
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  async createTPSRelawan(data: TPSRelawanFormModel) {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.post<APIResponse<TPSRelawanModel>>(
          `${this.baseURLTPSRelawan}/create`,
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
  async updateTPSRelawan(tpsId: number, data: TPSRelawanFormModel) {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.put<APIResponse<TPSRelawanModel>>(
          `${this.baseURLTPSRelawan}/update/${tpsId}`,
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
  async deleteTPSRelawan(ids: string[]) {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.post<APIResponse<TPSRelawanModel>>(
          `${this.baseURLTPSRelawan}/delete`,
          {
            ids,
          },
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
