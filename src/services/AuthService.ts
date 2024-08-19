import { APIResponse } from "@/types/APIResponse";
import { AuthModel, LoginRequest } from "@/types/AuthModel";
import { decryptData } from "@/utility/decryptUtil";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";

class AuthService {
  private authUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/auth`;

  public async login(request: LoginRequest): Promise<APIResponse<AuthModel>> {
    try {
      const response = await axios.post<APIResponse<AuthModel>>(
        `${this.authUrl}/login`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }

  async refreshToken(): Promise<AuthModel> {
    try {
      const auth = await this.getAuthenticated();
      if (auth === null) {
        throw new Error("Token not found");
      }
      const response = await axios.post<APIResponse<any>>(
        `${this.authUrl}/refresh_token`,
        {
          token: auth.accessToken,
          refreshToken: auth.refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      const tokenResponse = response.data.data;
      const authResponse = {
        ...auth,
        accessToken: tokenResponse.token,
        refreshToken: tokenResponse.refreshToken,
      };
      return authResponse;
    } catch (error) {
      ResponseHandler.handleErrorResponse(error);
    }
  }
  getAuthenticated(): AuthModel | null {
    try {
      const xa = localStorage.getItem("persist:xa");
      if (xa) {
        const parsedXA = JSON.parse(xa);

        const auth = decryptData(JSON.parse(parsedXA.auth));

        return auth ? auth : null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  // public logout(): void {
  //   localStorage.removeItem("persist:xa");
  // }
}

export default AuthService;
