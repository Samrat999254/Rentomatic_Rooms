import { Router } from 'express'
import {
    signup,
    login,
    requestPasswordReset,
    resetPassword,

} from '../controllers/auth.controller.js'
import { verifyUserEmail } from '../utils/commonFunction.js'
import { updateProfile } from '../utils/commonFunction.js'

const userRoute = Router()

userRoute.post('/signup', signup)
userRoute.post('/login', login)
userRoute.post('/request-password-reset', requestPasswordReset)
userRoute.patch('/reset-password/:token', resetPassword)
userRoute.get('/verification/:id', verifyUserEmail)
userRoute.put('/update/:id', updateProfile)
// userRoute.get('/getphoto/:id',)
export default userRoute
