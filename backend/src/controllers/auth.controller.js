import createHttpError from 'http-errors'
import formidable from 'formidable'
import fs from 'fs'
import { sendToken } from '../utils/sendToken.js'
import UserModal from '../models/user.model.js'
import { catchAsync } from '../utils/catchAsync.js'
import { sendMail } from '../utils/mailer.js'
import { sendVerificationEmail } from '../utils/commonFunction.js'

const signup = catchAsync(async (req, res, next) => {
    const form = new formidable.IncomingForm()
    const baseurl = req.protocol + '://' + req.get('host')

    form.parse(req, (err, fields, files) => {
        if (err) return next(createHttpError(400, 'Could not process image!!'))
        let { owner, tenant } = fields
        // console.log(tenant);
        if (owner) {
            fields.owner = JSON.parse(owner)
            // JSON.parse(owner)

            const product = new UserModal(fields)

            // console.log(files, fields)

            if (files.images) {
                if (files.images.size > 2097152)
                    return next(createHttpError(400, 'Image size exceeds 2mb!!'))
                //   console.log(files.images)
                product.owner.images.data = fs.readFileSync(files.images.filepath)
                product.owner.images.contentType = files.images.mimetype
                // console.log(product.owner.images.data)
            }
            if(files.image){
                if (files.image.size > 2097152)
                    return next(createHttpError(400, 'Image size exceeds 2mb!!'))
                //   console.log(files.images)
                product.image.data = fs.readFileSync(files.image.filepath)
                product.image.contentType = files.image.mimetype
                // console.log(product.owner.images.data)
            }

            // res.json()

            product.save(async (err, product) => {
                console.log(err)
                if (err) return next(createHttpError(400, 'Could not save user!!'))

                if (product) {
                    await sendVerificationEmail(product.email, baseurl, product._id)
                    res.json(product)
                }
            })
        }
        if (tenant) {
            fields.tenant = JSON.parse(tenant)
            // console.log(files)

            // JSON.parse(owner)

            const product = new UserModal(fields)
            if (files.images) {
                if (files.images.size > 2097152)
                    return next(createHttpError(400, 'Image size exceeds 2mb!!'))
                //   console.log(files.images)
                product.tenant.image.data = fs.readFileSync(
                    files.images.filepath
                )
                product.tenant.image.contentType =
                    files.images.mimetype
                // console.log(product.owner.images.data);
            }
            if(files.image){
                if (files.image.size > 2097152)
                    return next(createHttpError(400, 'Image size exceeds 2mb!!'))
                //   console.log(files.images)
                product.tenant.image.data = fs.readFileSync(
                    files.image.filepath
                )
                product.tenant.image.contentType =
                    files.image.mimetype
                // console.log(product.owner.images.data);
            }
            
            // res.json()

            product.save(async (err, product) => {
                console.log('err', err)
                if (err) return next(createHttpError(400, 'Could not save user!!'))

                await sendVerificationEmail(product.email, baseurl, product._id)
                res.json(product)
            })
        }
        console.log('Exit')
    })
    // console.log(req.body);

    //     // const user = await UserModal.create(req.body)
    //     res.status(201).json({
    //         status: 'success',
    //         data: {
    //             // user,
    //         },
    //     })
})

// export const updateProfile = catchAsync(async (req, res, next) => {
//     const form = new formidable.IncomingForm();

//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             console.error('Error parsing form:', err);
//             return next(createHttpError(400, 'Error parsing form'));
//         }

//         let { owner } = fields;
//         if (owner) {
//             try {
//                 owner = JSON.parse(owner);
//             } catch (err) {
//                 console.error('Error parsing owner:', err);
//                 return next(createHttpError(400, 'Error parsing owner'));
//             }

//             // Only take fullName and address
//             const updatedFields = {
//                 fullName: owner.fullName,
//                 address: owner.address
//             };

//             // Find the owner and update it
//             OwnerModal.findByIdAndUpdate(owner._id, updatedFields, { new: true }, (err, product) => {
//                 if (err) {
//                     console.error('Error updating owner:', err);
//                     return next(createHttpError(400, 'Error updating owner'));
//                 }

//                 if (!product) {
//                     return next(createHttpError(404, 'Owner not found'));
//                 }

//                 res.json(product);
//             });
//         } else {
//             next(createHttpError(400, 'No owner provided'));
//         }
//     });
// });

export const login = catchAsync(async (req, res, next) => {
    console.log('Requested')
    const { email, password } = req.body

    //admin configration
    if (email == 'admin@room.com' && password == 'admin') {
        return sendToken('admin', 'admin', 'Logged in successfully', res, next)
    }
    if (!email || !password) {
        return next(createHttpError(400, 'Please provide email and password'))
    }
    const user = await UserModal.findOne({ email }).select('+password')
    // console.log(user)

    // check whether user with provided email exists or not
    if (!user) return next(createHttpError('400', 'Invalid credentials'))

    if (user.status !== 'active') {
        return res.json({
            success: false,
            error: 'Please verify you email',
        })
    }

    // check whether user's password matches the one provided
    if (!(await user.comparePassword(password))) {
        return next(createHttpError('400', 'Invalid credentials'))
    }
    // if all the credentials are valid, login the user
    sendToken(user.id, user.role, 'Logged in successfully', res, next)
})
export const requestPasswordReset = catchAsync(async (req, res, next) => {
    const { email } = req.body
    // check whether user with provided email exists or not
    const user = await UserModal.findOne({ email })
    if (!user) return next(createHttpError(404, 'User not found'))

    // if the user exists create a password reset token
    // set the token to expire in 10 minutes
    // send the url to reset password to the user's email
    const token = await user.createPasswordResetToken()

    try {
        await sendMail({
            to: user.email,
            subject: 'Reset your Password',
            text: `
            Please send a patch request to following url to reset your password
            http://localhost:3000/api/v1/users/reset-password/${token}
        `,
        })
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Email sent to reset password',
        },
    })
})
export const resetPassword = catchAsync(async (req, res, next) => {
    const { token } = req.params
    const { password, confirmPassword } = req.body

    const user = await UserModal.findOne({
        passwordResetToken: token,
        passwordResetTokenExpiresIn: { $gt: Date.now() },
    })
    if (!user) return next(createHttpError(404, 'Invalid or expired token'))
    if (password !== confirmPassword)
        return next(createHttpError(400, 'Passwords do not match'))
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetTokenExpiresIn = undefined

    await user.save({ validateModifiedOnly: true })
    res.json({
        data: { message: 'Password changed successfully' },
    })
})

export { signup }
