export type WilayahProvinsi = {
  id: number;
  negaraId: number;
  name: string;
  createdDate: string;
  updatedDate: string;
};

export type WilayahKota = {
  id: number;
  provinsiId: number;
  negaraId: number;
  name: string;
  createdDate: string;
  updatedDate: string;
};

export type WilayahKelurahan = {
  id: number;
  kecamatanId: number;
  kotaId: number;
  provinsiId: number;
  negaraId: number;
  name: string;
  createdDate: string;
  updatedDate: string;
};

export type WilayahKecamatan = {
  id: number;
  kotaId: number;
  provinsiId: number;
  negaraId: number;
  name: string;
  createdDate: string;
  updatedDate: string;
};
