const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '仅支持 POST 请求' });
  }

  try {
    const { name, email, message, contactMe } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.126.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailContent = `
    姓名/昵称: ${name}
    邮箱地址: ${email}
    反馈内容: ${message}
    是否希望联系: ${contactMe ? '是' : '否'}
    `;

    const mailOptions = {
      from: `"反馈系统" <${process.env.EMAIL_USER}>`,
      to: 'huifeidexiaogougou@126.com',
      subject: '用户反馈',
      text: emailContent,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: '反馈已收到，邮件已发送' });
  } catch (error) {
    console.error('处理反馈时出错:', error);
    return res.status(500).json({ error: '服务器内部错误' });
  }
};