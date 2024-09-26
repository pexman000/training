export interface Ticket {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    sex: 'male' | 'female' | 'other';
    symptoms: string;
}
