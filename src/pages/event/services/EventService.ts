import AuthService from "@/services/AuthService";
import { APIResponse } from "@/types/APIResponse";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import { PostQuery } from "@/types/PostQuery";
import { EventFormModel, EventModel } from "../models/EventModel";

class EventService {
  private baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/event`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async create(data: EventFormModel): Promise<APIResponse<EventFormModel>> {
    const auth = this.authService.getAuthenticated();
    if (!auth) {
      throw new Error("User not authenticated");
    }
    try {
      const response = await axios.post<APIResponse<EventFormModel>>(
        `${this.baseURL}/create`,
        Object.keys(data).reduce((fd, key) => {
          if (data[key as keyof EventFormModel])
            fd.append(key, data[key as keyof EventFormModel] as any);
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
    data: EventFormModel
  ): Promise<APIResponse<EventFormModel>> {
    const auth = this.authService.getAuthenticated();
    if (!auth) {
      throw new Error("User not authenticated");
    }
    try {
      const response = await axios.put<APIResponse<EventFormModel>>(
        `${this.baseURL}/update/${id}`,
        Object.keys(data).reduce((fd, key) => {
          if (data[key as keyof EventFormModel])
            fd.append(key, data[key as keyof EventFormModel] as any);
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
  public async getDetail(id: number): Promise<EventModel> {
    try {
      const auth = this.authService.getAuthenticated();
      if (auth !== null) {
        const response = await axios.get<APIResponse<EventModel>>(
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
  async all(postQuery: PostQuery): Promise<APIResponse<EventModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.post<APIResponse<EventModel[]>>(
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
  async list(): Promise<APIResponse<EventModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.get<APIResponse<EventModel[]>>(
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

export default EventService;
