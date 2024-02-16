const nodemailer = require("nodemailer");
const { EMAIL, PASS } = require("../env.js");
const MailGen = require("mailgen");

// send mail from testing account
const signup = async (req, res) => {
  // test account
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter obj using the default smtp transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, //true for only 465,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Succefully register with us.", // plain text body
    html: "<b>Succefully register with us.</b>", // html body
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "You have receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
      //   res.status(201).json("Signup Successfull...!");
    })
    .catch((err) => {
      return res.status(500).json({ msg: err });
    });
};

// send mail from real gmail account
const getBills = async (req, res) => {
  const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASS,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new MailGen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      name: "Rndom name",
      intro: "Your Bill has Arrived!",
      table: {
        data: [
          {
            item: "Nodemailer stack book",
            description: "A backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business ",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Place order",
    html: mail,
  };

  await transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({ msg: "You should receive an email" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });

  //   res.status(201).json("Get bills Successfull...!");
};
module.exports = { signup, getBills };
