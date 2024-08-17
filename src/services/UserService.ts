import { APIResponse } from "@/types/APIResponse";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import AuthService from "./AuthService";
import { PostQuery } from "@/types/PostQuery";
import { UserModel } from "@/types/UserModel";

class UserService {
  private authUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/user`;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async all(postQuery: PostQuery): Promise<APIResponse<UserModel[]>> {
    try {
      const auth = this.authService.getAuthenticated();
      if (!auth) {
        throw new Error("Auth is not authenticated");
      }
      const response = await axios.post<APIResponse<UserModel[]>>(
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

export default UserService;
