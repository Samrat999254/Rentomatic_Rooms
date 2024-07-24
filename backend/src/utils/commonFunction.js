import UserModal from '../models/user.model.js'
import { mailTransport } from './mailer.js'

export const sendVerificationEmail = async (email, baseurl, id) => {
    try {
        // const user = req.profile;

        const data = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Your Activation Link for YOUR APP',
            text: `Please use the following link to activate your account on YOUR APP: ${baseurl}/auth/verification/${id}`,
            html: `<p>Please use the following link to activate your account on YOUR APP: <strong><a href="${baseurl}/api/v1/users/verification/${id}" target="_blank">link</a></strong></p>`,
        }

        await mailTransport.sendMail(data, function (err, data) {
            if (err) {
                console.log(err, 'Error Occurs')
            } else {
                console.log('Email sent successfully')
            }
        })
    } catch (err) {
        console.log('Error on /api/auth/get-activation-email: ', err)
    }
}

export const verifyUserEmail = async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id)
        console.log(user)

        if (!user) {
            res.sendStatus(401)
        } else {
            await UserModal.updateOne({ email: user.email }, { status: 'active' })
            // await Code.deleteMany({ email: user.email });

            let redirectPath

            if (process.env.NODE_ENV == 'production') {
                redirectPath = `${req.protocol}://${req.get('host')}account/verified`
            } else {
                redirectPath = `http://127.0.0.1:8080/account/verified`
            }

            res.redirect(redirectPath)
        }
    } catch (err) {
        console.log('Error on /api/auth/verification/verify-account: ', err)
        res.sendStatus(500)
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullName, address,email,password } = req.body;
        const user = await UserModal.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fullName = fullName;
        user.address = address;
        user.email = email;
        user.password = password;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Error on /api/users/update-profile: ', err);
        res.status(500).json({ message: 'An error occurred while updating the profile' });
    }
};