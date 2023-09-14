import * as dotenv from 'dotenv'
dotenv.config();

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const JWT_SECRET = process.env.JWT_SECRET;

//TIMESHEET CONSTANTS
export const DEFAULT_CLOCK_IN = '08:00:00'
export const DEFAULT_CLOCK_OUT = '17:00:00'
export const ACKNOWLEDGE_WORK_HOURS = 8 //8 hours