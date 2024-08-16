import AuthService from "@/services/AuthService";
import { APIResponse } from "@/types/APIResponse";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import { PostQuery } from "@/types/PostQuery";
import { BeritaFormModel, BeritaModel } from "../models/BeritaModel";

class BeritaService {
  private baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/berita`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async create(data: BeritaFormModel): Promise<APIResponse<BeritaFormModel>> {
    const auth = this.authService.getAuthenticated();
    if (!auth) {
      throw new Error("User not authenticated");
    }
    try {
      const response = await axios.post<APIResponse<BeritaFormModel>>(
        `${this.baseURL}/create`,
        Object.keys(data).reduce((fd, key) => {
          if (data[key as keyof BeritaFormModel])
            fd.append(key, data[key as keyof BeritaFormModel] as any);
          return fd;
        }, new FormData()),
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }

  async update(
    id: number,
    data: BeritaFormModel
  ): Promise<APIResponse<BeritaFormModel>> {
    const auth = this.authService.getAuthenticated();
    if (!auth) {
      throw new Error("User not authenticated");
    }
    try {
      const response = await axios.put<APIResponse<BeritaFormModel>>(
        `${this.baseURL}/update/${id}`,
        Object.keys(data).reduce((fd, key) => {
          if (data[key as keyof BeritaFormModel])
            fd.append(key, data[key as keyof BeritaFormModel] as any);
          return fd;
        }, new FormData()),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  public async getDetail(id: number): Promise<BeritaModel> {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.get<APIResponse<BeritaModel>>(
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
  async all(postQuery: PostQuery): Promise<APIResponse<BeritaModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.post<APIResponse<BeritaModel[]>>(
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
  async list(): Promise<APIResponse<BeritaModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.get<APIResponse<BeritaModel[]>>(
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

export default BeritaService;
