import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'UPDOCJWT';

export const generateToken = (userId: string, userEmail: string) => {
  return jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
