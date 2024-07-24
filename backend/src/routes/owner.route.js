import { Router } from 'express'
import {
    getPhoto,
    getAllRoom,
    getRoom,
    getUserByID,
    searchRoom,
    getRoomById,
    deleteRoom,
    getAllRoomsByLoggedInOwner,
    updateRoom,
    getProfilePhoto
} from '../controllers/owner.controller.js'

const ownerRoute = Router()

ownerRoute.param('id', getUserByID)
ownerRoute.param('rid', getRoomById)

ownerRoute.get('/getallrooms', getAllRoom)
ownerRoute.get('/getroombyowner', getAllRoomsByLoggedInOwner)

ownerRoute.get('/hello/:rid', getRoom)

ownerRoute.delete('/deleteroom/:id', deleteRoom)

ownerRoute.get('/searchrooms', searchRoom)

ownerRoute.get('/getphoto/:id', getPhoto)
ownerRoute.get('/getprofilephoto/:id', getProfilePhoto)

ownerRoute.put('/update', updateRoom)
ownerRoute.patch('/updateroom', updateRoom)

export default ownerRoute
