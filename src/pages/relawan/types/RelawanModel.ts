import { PoskoModel } from "@/pages/posko/types/PoskoModel";
import { TPSModel } from "@/pages/tps/types/TPSModel";
import { WilayahProvinsi, WilayahKota, WilayahKecamatan, WilayahKelurahan } from "@/types/WilayahModel";

export interface RelawanFormModel {
  nama: string;
  email: string;
  alamat: string;
  noKTP: string;
  jenisKelamin: string;
  jabatan: string;
  jabatanPosko: string;
  poskoId: number | null;
  provinsiId: number | null;
  kotaId: number | null;
  kecamatanId: number | null;
  kelurahanId: number | null;
}

export interface RelawanEditFormModel {
  nama: string;
  alamat: string;
  noKTP: string;
  jenisKelamin: string;
  jabatan: string;
  jabatanPosko: string;
  poskoId: number | null;
  provinsiId: number | null;
  kotaId: number | null;
  kecamatanId: number | null;
  kelurahanId: number | null;
}

export interface RelawanModel {
  id: number;
  nama: string;
  alamat: string;
  noKTP: string;
  userId: number;
  jenisKelamin: string;
  jabatan: string;
  jabatanPosko: string;
  poskoId: number;
  provinsiId: number;
  kotaId: number;
  kecamatanId: number;
  kelurahanId: number;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  posko: PoskoModel;
  provinsi: WilayahProvinsi;
  kota: WilayahKota;
  kecamatan: WilayahKecamatan;
  kelurahan: WilayahKelurahan;
  tpsRelawans: Array<{
    id: number;
    tpsId: number;
    relawanId: number;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
  }>;
}

export interface TPSRelawanModel {
  id: number;
  tpsId: number;
  relawanId: number;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  tps: TPSModel;
}

