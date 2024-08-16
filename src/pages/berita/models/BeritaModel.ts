export interface BeritaModel {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  fileName: string;
  filePath: string;
  status: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
}

export interface BeritaFormModel {
  Judul: string;
  Deskripsi: string;
  Tanggal: string;
  ImageFile: File | null;
}
