import pkg from 'mongoose'
import mongoose from 'mongoose'
import { CommonRoomDetails } from './common.data.js'

const {Schema} = pkg
export const OwnerSchema = new Schema({
    roomDetails: CommonRoomDetails,
    workPreference: {
        type: String,
        enum: ['Student', 'Employeed', 'Retired', 'Other'],
        required: [true, 'Occupation is required'],
    },
    facilities:{
        type:Array
    }
    ,
    tenantPreference: {
        type: String,
        enum: ['Male', 'Female', 'Couple', 'Others'],
    },
    roomAddress: {
        district: {
            type: String,
            enum: ['Kathmandu', 'Bhaktapur', 'Lalitpur'],
        },
        area: {
            type: Object,
            required: [true, 'Area is required'],
        },
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    name:{
        type:String
    },
    owneremail:{
type:String
    },
    
    images: {
        data: Buffer,  
        contentType: String
    
    },
})

const OwnerModal = mongoose.model('Owner', OwnerSchema)

export default OwnerModal