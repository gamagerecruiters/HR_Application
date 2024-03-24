import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

export const sendForgetPasswordLinkByEmail = async (user, setusertoken ,res) =>  {
    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 10 MINUTES     
        http://localhost:5173/forgotpassword/${user.id}/${setusertoken.verifytoken}`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Succsfully" });
        }
      });
}
  