import { APIResponse } from "@/types/APIResponse";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import AuthService from "./AuthService";
import { ProfileModel } from "@/types/ProfileModel";

class UserService {
  private authUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user`;
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
        `${this.authUrl}/profile`,
        
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

  // }
}

export default UserService;
