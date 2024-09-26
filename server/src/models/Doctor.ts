import { User } from './User';

export interface Doctor extends User {
  licenseNumber: string;
  specialization: string;
}
