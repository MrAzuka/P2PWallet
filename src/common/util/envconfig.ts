import * as dotenv from 'dotenv';

dotenv.config({
  path: '${__dirname}/../.env'
});

// export const port = Number(process.env.PORT);
export const dbPort = Number(process.env.DB_PORT);
export const dbUsername = String(process.env.DB_USERNAME);
export const dbName = String(process.env.DB_NAME);
export const dbPassword = String(process.env.DB_PASSWORD);
export const dbHost = String(process.env.DB_HOST);
export const environment = String(process.env.NODE_ENV)
// export const salt = Number(process.env.SALT)
export const jwtSecretKey = String(process.env.JWT_SECRET_KEY)
// export const paystackSecretKey = String(process.env.PAYSTACK_SECRET_KEY)
// export const senderEmail = String(process.env.NODEMAILER_EMAIL)
// export const senderPassword =  String(process.env.NODEMAILER_PASSWORD)