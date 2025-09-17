// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv'
// import { dirname, resolve } from "path"
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url))
// dotenv.config({ path: resolve(__dirname, "../config/.env") })

// // create a transporter object using SMTP transport
// console.log('Ram Ram', process.env.GMAIL_APP_PASSWORD, process.env.GMAIL_USER,)
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'deependraswami4144@gmail.com',
//         pass: 'wwvbuepxdskkknjk'
//     }
// });



// export async function sendEmail({ to, OTP }) {
//     const response = await transporter.sendMail({
//         from: 'deependraswami4144@gmail.com',
//         to,
//         subject: 'Password reset OTP',
//         text: `Your OTP is ${OTP}`,
//         html: `<html lang="en">
//             <head>
//                 <meta charset="UTF-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <title>Password Reset</title>
//             </head>
//             <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
//                 <div style="max-width:500px; margin:auto; background:#fff; padding:20px; border-radius:10px;">
//                     <h2 style="color:#333;">Password Reset OTP</h2>
//                     <p>Hello,</p>
//                     <p>Your OTP for resetting the password is:</p>
//                     <div style="font-size:24px; font-weight:bold; text-align:center; background:#007bff; color:white; padding:10px; border-radius:8px;">
//                         ${OTP}
//                     </div>
//                     <p style="margin-top:15px;">This OTP will expire in 10 minutes.</p>
//                     <p>If you didn’t request a password reset, ignore this email.</p>
//                 </div>
//             </body>
//         </html>`
//     })
//     console.log("Message sent", response.messageId)
// }
