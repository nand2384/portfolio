import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    };

    const data = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "nand2384@gmail.com",
            subject: data.subject,
            html: `
                <h3>New Message</h3>
                <p>Name: ${data.name}</p>
                <p>Email: ${data.email}</p>
                <p>Message: ${data.message}</p>
            `
        });

        res.status(200).json({ sucess: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}