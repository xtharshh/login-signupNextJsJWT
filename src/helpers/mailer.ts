import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcryptjs from 'bcryptjs';

interface EmailParams {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log('hashedToken:', hashedToken);
        console.log('email:', email);
        console.log('emailType:', emailType);
        console.log('userId:', userId);
        console.log(typeof email);

        if (emailType === 'VERIFY') {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
            console.log('updatedUser:', updatedUser);
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "73b42c46c193e7",
                pass: "c4a18b2d476dbe"
            }
        });

        const mailOptions = {
            from: 'harsh@harsh.ai',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.NEXT_PUBLIC_API_BASE_URL}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}
            or copy and paste the link below in your browser 
            <br> ${process.env.NEXT_PUBLIC_API_BASE_URL}/verifyemail?token=${hashedToken}
            </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        console.log('mailResponse:', mailResponse);
    } catch (error) {
        console.log('Error:', error);
        throw new Error(String(error));
    }
}