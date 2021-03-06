import nodemailer from "nodemailer";
import fs from 'fs'
import handlebars from "handlebars";
import path from 'path'

export function sendEmail(to: string) {

    const readHTMLFile = function (path: string, callback: Function) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                throw err;
            }
            else {
                callback(null, html);
            }
        });
    };

    readHTMLFile(path.join(__dirname, "index.html"), function(_: Error, html: any) {
        const template = handlebars.compile(html);

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "",
                pass: "",
            },
            logger: true
        });

        const htmlToSend = template({})

        transporter.sendMail({
            from: '"Example" <robbyawaldi@gmail.com>', // sender address
            to: to, // list of receivers
            subject: "Reset Password", // Subject line
            html: htmlToSend,
        }).then(info => {
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });

    });
}

sendEmail("robbyawaldi@gmail.com")