export interface ProfileEditForm {
  name: string;
  email: string;
  image: File | null;
}

export interface ProfileModel {
  idUser: number;
  name: string;
  email: string;
  roles: string[];
  imageFileName: string;
  imagePath: string;
}
