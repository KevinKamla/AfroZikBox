import { UserData } from './user-info';

export interface LoginSuccessModel {
    status?: number;
    accessToken?: string;
    data?: UserData;
  }

  export interface RegisterSuccessModel {
    status?: number;
    waitValidation?: number;
    accessToken?: string;
    data?: UserData;
  }
  export interface SocialLoginSuccessModel {
    status?: number;
    waitValidation?: number;
    accessToken?: string;
    data?: UserData;
  }
  
  export interface SocialLoginErrorModel {
    status?: number;
    error?: string;
  }

  export interface LogoutSuccessModel {
    status?: number;
    message?: string;
  }

  export interface TwoFactorLoginSuccessModel {
    status: number;
    data: string;
    userID: number;
  }

  export interface TrendSearchSuccessModel {
    status: number;
    data: TrendSearch[];
  }
  
  export interface TrendSearch {
    id: number;
    keyword: string;
  }


  export interface Errors {
    [key: string]: string[]; 
  }
  
  export interface SessionErrorModel {
    status?: number;
    error?: string;
    errors?: Errors;
  }
  