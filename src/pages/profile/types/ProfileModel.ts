export interface ProfileFormModel {
  Name: string;
  Email: string;
  ImageFile: File | null;
}

export interface ProfileModel {
  idUser: number;
  name: string;
  email: string;
  roles: string[];
  imageFileName: string;
  imagePath: string;
}
