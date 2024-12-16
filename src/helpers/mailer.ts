import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail=async({email,emailType,userId}:any)=>{

    try{
        const hashedToken=await bcryptjs.hash(userId.toString(),10);
        //todo config mail for usage
        console.log('hashedToken:',hashedToken);
        console.log('email:',email);
        console.log('emailType:',emailType);
        console.log('userId:',userId);
        console.log(typeof email);
        if(emailType==='VERIFY'){
            const updatedUser=await User.findByIdAndUpdate(userId,
                {$set:
                    {verifyToken:hashedToken, 
                        verifyTokenExpiry:new Date(Date.now()+
                        3600000)}});
            console.log('updatedUser:',updatedUser);
        }
        else if(emailType==='RESET'){
            await User.findByIdAndUpdate
            (userId,
                {$set:{forgotPasswordToken:hashedToken,
                     forgotPasswordTokenExpiry:new Date(Date.now()+
                     3600000)}});
        }

 
        // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "73b42c46c193e7",
            pass: "c4a18b2d476dbe"
        }
  });
          const mailOptions = {
            
                from: 'harsh@harsh.ai', // sender address
                to: email, // list of receivers
                subject: emailType==='VERIFY'?"Verify your email":"Reset your password", // Subject line
                
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType==='VERIFY'?'verify your email':'reset your password'}
                or copy and paste the link below in your browser 
                <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`,
                
            };
            // html body
            const mailResponse = await transporter.sendMail(mailOptions);

    }   
    catch(error:any){
        throw new Error(error);
        console.log('Error:',error);

    }

}