'use strict';

const express = require('express');
const expressApp = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

expressApp.use(bodyParser.urlencoded({extended:true}));

expressApp.post('/',(req,res)=>{
	const name  = req.body.name;
	const email  = req.body.email;
  const subject  = req.body.subject;
	const message  = req.body.message;		
	console.log(name);

	const CLIENT_ID = '1091193718945-kf96uit06cud467ho64u0rhosbehllc7.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04gggGOtGYwCMCgYIARAAGAQSNwF-L9IrJJuYhvvHPB0lbMyngs-7s-uNhEtdX2i1v4wsJDptHhz5oWiIPLOO7VSCoM-gAoyztSo';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'tineshr050@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'tineshr050@gmail.com',
      to: 'gmm.sh@rmkec.ac.in',
      subject: subject,
      text: name+email+message,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
sendMail();

res.redirect("/contact.html")	
});

module.exports=expressApp;