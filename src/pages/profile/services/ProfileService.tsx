import { APIResponse } from "@/types/APIResponse";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import { ProfileFormModel, ProfileModel } from "@/pages/profile/types/ProfileModel";
import AuthService from "@/services/AuthService";

class ProfileService {
  private baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/user`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async getProfile(): Promise<APIResponse<ProfileModel>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.get<APIResponse<ProfileModel>>(
        `${this.baseURL}/profile`,

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

  public async updateProfile(data: ProfileFormModel): Promise<APIResponse<ProfileFormModel>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.put<APIResponse<ProfileFormModel>>(
        `${this.baseURL}/profile`,
        Object.keys(data).reduce((fd, key) => {
          if (data[key as keyof ProfileFormModel])
            fd.append(key, data[key as keyof ProfileFormModel] as any);
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
}

export default ProfileService;
