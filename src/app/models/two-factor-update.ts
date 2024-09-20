// src/app/models/two-factor-update.ts

export interface TwoFactorUpdateSuccessModel {
    status?: number;
    data?: string;
  }
  
  export interface TwoFactorUpdateModel {
    successModel?: TwoFactorUpdateSuccessModel;
  }
  