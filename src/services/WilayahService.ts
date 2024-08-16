import { APIResponse } from "@/types/APIResponse";
import { WilayahProvinsi, WilayahKota, WilayahKecamatan, WilayahKelurahan } from "@/types/WilayahModel";
import { ResponseHandler } from "@/utility/ResponseHandler";
import axios from "axios";
import AuthService from "./AuthService";
import { PostQuery } from "@/types/PostQuery";

class WilayahService {
    private baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1/wilayah`;
    authService: AuthService;
  
    constructor() {
      this.authService = new AuthService();
    }
  
    async provinsiList(): Promise<APIResponse<WilayahProvinsi[]>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.get<APIResponse<WilayahProvinsi[]>>(
            `${this.baseURL}/provinsi/list`,
    
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
      async provinsiAll(postQuery: PostQuery): Promise<APIResponse<WilayahProvinsi[]>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.post<APIResponse<WilayahProvinsi[]>>(
            `${this.baseURL}/provinsi/all`,
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
      async kotaList(provinsiId: number): Promise<APIResponse<WilayahKota[]>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.get<APIResponse<WilayahKota[]>>(
            `${this.baseURL}/kota/list/${provinsiId}`,
    
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
      async kotaAll(postQuery: PostQuery): Promise<APIResponse<WilayahKota[]>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.post<APIResponse<WilayahKota[]>>(
            `${this.baseURL}/kota/all`,
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
      async kotaById(kotaId: number): Promise<APIResponse<WilayahKota>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.get<APIResponse<WilayahKota>>(
            `${this.baseURL}/kota/${kotaId}`,
    
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
    
      async kecamatanList(
        kotaId: number
      ): Promise<APIResponse<WilayahKecamatan[]>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.get<APIResponse<WilayahKecamatan[]>>(
            `${this.baseURL}/kecamatan/list/${kotaId}`,
    
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
      async kecamatanAll(postQuery: PostQuery): Promise<APIResponse<WilayahKecamatan[]>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.post<APIResponse<WilayahKecamatan[]>>(
            `${this.baseURL}/kecamatan/all`,
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
      async kecamatanById(
        kecamatanId: number
      ): Promise<APIResponse<WilayahKecamatan>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.get<APIResponse<WilayahKecamatan>>(
            `${this.baseURL}/kecamatan/${kecamatanId}`,
    
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
    
      async kelurahanList(
        kecamatanId: number
      ): Promise<APIResponse<WilayahKelurahan[]>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.get<APIResponse<WilayahKelurahan[]>>(
            `${this.baseURL}/kelurahan/list/${kecamatanId}`,
    
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
      async kelurahanAll(postQuery: PostQuery): Promise<APIResponse<WilayahKelurahan[]>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.post<APIResponse<WilayahKelurahan[]>>(
            `${this.baseURL}/kelurahan/all`,
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
      async kelurahanById(
        kelurahanId: number
      ): Promise<APIResponse<WilayahKelurahan>> {
        const auth = this.authService.getAuthenticated();
        if (!auth) {
          throw new Error('User not authenticated');
        }
        try {
          const response = await axios.get<APIResponse<WilayahKelurahan>>(
            `${this.baseURL}/kelurahan/${kelurahanId}`,
    
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
  
  export default WilayahService;
  