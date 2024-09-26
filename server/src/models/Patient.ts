import { User } from './User';

export interface Patient extends User {
  firstName: string;
  lastName: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  symptoms: string;
}
