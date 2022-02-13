import * as nodeMailer from 'nodemailer';
export const sendMail = (email: string, title: string, conten: string) => {
  const secure = process.env.MAIL_ENCRYPTION == 'false' ? false : true;
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST || `mail.smtp.com`,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: secure,
    auth: {
      user: process.env.MAIL_USERNAME || `zocodevelop01@gmail.com`,
      pass: process.env.MAIL_PASSWORD || 'zoco@123456',
    },
  });
  const options = {
    from: process.env.MAIL_USERNAME || `zocodevelop01@gmail.com`, // địa chỉ admin email bạn dùng để gửi
    to: email, // địa chỉ gửi đến
    subject: title, // Tiêu đề của mail
    html: conten, // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  };
  return transporter.sendMail(options);
};
