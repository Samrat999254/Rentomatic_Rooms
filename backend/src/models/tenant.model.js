import pkg from 'mongoose';
import { CommonRoomDetails } from './common.data.js'

const {Schema} = pkg;

export const TenantSchema = new Schema({
    occupation: {
        type: String,
        enum: ['Student', 'Employeed', 'Retired', 'Other'],
        required: [true, 'Occupation is required'],
    },
    iam: {
        type: String,
        enum: ['Male', 'Female','Couple'],
        required: [true, 'iam is required'],
    },
    age:{
        type:Number
    },
    facilities:{
        type:Array}
    ,
    name:{
        type:String
    },
    image: {
        data: Buffer,
        // type:Buffer,
        contentType: String
    },
    tenantemail:{
type:String
    },
    preferredRooms: {
        ...CommonRoomDetails,
        availableWithin: {
            type: Date,
            required: [true, 'Available within is required'],
        },
        roomLocation: {
            type: String,
            enum: [
                'Kathmandu',
                'Bhaktapur',
                'Lalitpur',
                'Patan',
                'Boudha',
                'Baneshwor',
                'Pepsicola',
                'Kirtipur',
            ],
            required: [true, 'Room location is required'],
        },
    },
    profileDescription: {
        bio: {
            type: String,
            required: [true, 'Bio is required'],
        },
        
    },
})

const TenantModal = pkg.model('Tenant', TenantSchema)

export default TenantModal