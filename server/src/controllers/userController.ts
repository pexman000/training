import { Request, Response } from 'express';
import { signupOrLoginService, getUsersService } from '../services/userService';
import { User } from '../models/User';

export const signupOrLogin = async (req: Request, res: Response) => {
    const user: User = req.body;
    if (!user.email || !user.password) {
        res.status(400).json({ message: 'Missing required fields: email or password' });
    }

    try {
        const result = await signupOrLoginService(user);
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error('Error during signup or login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};
