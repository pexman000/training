export interface Ticket {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    sex: 'male' | 'female' | 'other';  // corrected 'fmale' to 'female'
    symptoms: string;
}
