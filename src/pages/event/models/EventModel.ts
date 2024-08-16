export interface EventModel {
    id: number;
    judul: string;
    deskripsi: string;
    tanggal: string;
    jam: string;
    fileName: string;
    filePath: string;
    status: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string;
    updatedBy: string;
  }
  
  export interface EventFormModel {
    Judul: string;
    Deskripsi: string;
    Tanggal: string;
    Jam: string;
    ImageFile: File | null;
  }
  