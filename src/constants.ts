import * as dotenv from 'dotenv'
dotenv.config();

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const JWT_SECRET = process.env.JWT_SECRET;