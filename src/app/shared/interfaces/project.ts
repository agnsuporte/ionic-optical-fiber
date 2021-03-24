export interface Project {
  id?: number;
  UserId?: number;
  projectName: string;
  projectCompany: string;
  createdAt?: Date;
  updatedAt?: Date;
  Networks?: {
    networkName: string;
  };
}
