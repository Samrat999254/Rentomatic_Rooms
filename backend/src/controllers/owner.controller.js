import createHttpError from 'http-errors'
import formidable from 'formidable'
import fs from 'fs'
import { catchAsync } from '../utils/catchAsync.js'
import UserModal from '../models/user.model.js'
import OwnerModal from '../models/owner.model.js'
import mongoose from 'mongoose';

import TenantModal from '../models/tenant.model.js'
import { exit } from 'process'
import { Console } from 'console'

export const getAllRoom = catchAsync(async (req, res, next) => {
    const room = await UserModal.find({}, { owner: 2 })
    const ownerroom = await OwnerModal.find({ owner: 1 })

    let r = ownerroom.map(data => {
        return {
            _id: data._id,
            owner: data,
        }
    })

    let result = room.filter(data => data.owner)
    result = [...result, ...r]

    return res.send(result)
})

const updateR = catchAsync(async (req, res, next) => {
    const form = new formidable.IncomingForm()
    const baseurl = req.protocol + '://' + req.get('host')

    form.parse(req, (err, fields, files) => {
        if (err) return next(createHttpError(400, 'Could not process image!!'))
        let { owner, tenant } = fields
        // console.log(tenant);
        if (owner) {
            // fields.owner = JSON.parse(owner)
            // JSON.parse(owner)

            const product = new OwnerModal(fields)

            // console.log(files, fields)

            if (files.images) {
                if (files.images.size > 2097152)
                    return next(createHttpError(400, 'Image size exceeds 2mb!!'))
                //   console.log(files.images)
                product.images.data = fs.readFileSync(files.images.filepath)
                product.images.contentType = files.images.mimetype
                // console.log(product.owner.images.data)
            }
            if (files.image) {
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
                if (err) return next(createHttpError(400, 'Could add data!!'))

                if (product) {
                    res.json(product)
                }
            })
        }

        // console.log('Exit')
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

export const updateRoom = catchAsync(async (req, res, next) => {
    const form = new formidable.IncomingForm()

    form.parse(req, async (err, fields, files) => {
        let owner = JSON.parse(fields.owner)

        console.log(owner);

        if (owner) {
            // Check if required fields are present
            const requiredFields = ['description', 'title', 'roomAddress.area', 'workPreference', 'roomDetails.rentDuration', 'roomDetails.rentPerMonth', 'roomDetails.roomType'];
            for (let field of requiredFields) {
                let fieldParts = field.split('.');
                let value = owner;
                for (let part of fieldParts) {
                    value = value[part];
                    if (value === undefined) {
                        console.error(`Missing required field: ${field}`);
                        return res.status(400).json({ error: `Missing required field: ${field}` });
                    }
                }
            }

            if (files.images) {
                if (files.images.size > 2097152)
                    return next(createHttpError(400, 'Image size exceeds 2mb!!'))
                owner.images = owner.images || {};
                owner.images.data = fs.readFileSync(files.images.filepath)
                owner.images.contentType = files.images.mimetype
            }
            if (files.image) {
                if (files.image.size > 2097152)
                    return next(createHttpError(400, 'Image size exceeds 2mb!!'))
                owner.image = owner.image || {};
                owner.image.data = fs.readFileSync(files.image.filepath)
                owner.image.contentType = files.image.mimetype
            }

            // console.log('ownerid');

            // update with mongo query
            const updatedProduct = await UserModal.findOneAndUpdate({ 'owner.id': owner.id }, { owner }, { new: true });
            if (!updatedProduct) {
                return next(createHttpError(500, 'Could not update the room'));
            }
            res.json(updatedProduct);
        }
    })
})
export const getAllRoomsByLoggedInOwner = async (req, res, next) => {
    // Assuming req.query.ownerId contains the ID of the logged-in owner
    const ownerRooms = await OwnerModal.find({ _id: req.query.ownerId });

    return res.send(ownerRooms);
};

export const getRoom = catchAsync(async (req, res, next) => {
    if (req.room.images == undefined) {
        // handle undefined images
    }
    const user = await UserModal.findOne({ id: req.room.id }).select('phoneNumber');

    // Convert the Mongoose document to a plain JavaScript object
    let room = req.room.toObject();

    // Add the phoneNumber to the room object
    room.ownerPhoneNumber = user.phoneNumber;
    // console.log(user);

    return res.send(room);
});

export const searchRoom = catchAsync(async (req, res, next) => {
    const searchParams = req.query
    let room
    let ownerroom

    if (searchParams.location) {
        const districtRegex = new RegExp(searchParams.location, 'i');
        const areaRegex = new RegExp(searchParams.location, 'i');
    
        room = await UserModal.find(
            {
                $or: [
                    { 'owner.roomAddress.district': { $regex: districtRegex } },
                    { 'owner.roomAddress.area': { $regex: areaRegex } }
                ]
            },
            { owner: 1 }
        );
    
        ownerroom = room;
    }
    // for price

    if (searchParams.price) {
        console.log(searchParams.price)
        if (searchParams.price == 'cheapest') {
            room = await UserModal.find({}, { owner: 1 }).sort({
                'owner.roomDetails.rentPerMonth': 1,
            })

            room = room.filter(data => {
                if (data.owner) {
                    return data
                }
            })
            ownerroom = await OwnerModal.find({}, {}).sort({
                'owner.roomDetails.rentPerMonth': 1,
            })
        }

        //expensive price

        if (searchParams.price == 'expensive') {
            room = await UserModal.find({}, { owner: 1 }).sort({
                'owner.roomDetails.rentPerMonth': -1,
            })
            // if(room.length <= 0){
            //   room = await UserModal.find({},{owner:1}).sort({'owner.roomDetails.rentPerMonth':-1})
            // }
            room = room.filter(data => {
                if (data.owner) {
                    return data
                }
            })

            // console.log(room);

            ownerroom = await OwnerModal.find({}, {}).sort({
                'owner.roomDetails.rentPerMonth': -1,
            })
            // if(ownerroom.length <= 0){
            //  ownerroom = await OwnerModal.find({},{}).sort({'owner.roomDetails.rentPerMonth':-1})

            // }
        }
    }

    //for preference gender

    if (searchParams.preference) {
        if (searchParams.preference == 'male') {
            room = await UserModal.find(
                { 'owner.tenantPreference': searchParams.preference },
                { owner: 1 }
            )

            ownerroom = await OwnerModal.find(
                { tenantPreference: searchParams.preference },
                {}
            )
        }
        if (searchParams.preference == 'female') {
            room = await UserModal.find(
                { 'owner.tenantPreference': searchParams.preference },
                { owner: 1 }
            )

            ownerroom = await OwnerModal.find(
                { tenantPreference: searchParams.preference },
                {}
            )
        }
        if (searchParams.preference == 'family') {
            room = await UserModal.find(
                { 'owner.tenantPreference': searchParams.preference },
                { owner: 1 }
            )

            ownerroom = await OwnerModal.find(
                { tenantPreference: searchParams.preference },
                {}
            )
        }
    }

    // For Duration
    if (searchParams.duration) {
        if (searchParams.duration == 'short') {
            room = await UserModal.find(
                { 'owner.roomDetails.rentDuration': 'Under 6 months' },
                { owner: 1 }
            )

            ownerroom = await OwnerModal.find(
                { 'roomDetails.rentDuration': 'Under 6 months' },
                {}
            )
        }
        if (searchParams.duration == 'long') {
            room = await UserModal.find(
                { 'owner.roomDetails.rentDuration': 'More than 6 months' },
                { owner: 1 }
            )

            ownerroom = await OwnerModal.find(
                { 'roomDetails.rentDuration': 'More than 6 months' },
                {}
            )
        }
    }
    // console.log(room,ownerroom);

    let r = ownerroom.map(data => {
        // console.log(data);
        return {
            owner: data,
        }
    })

    let result = [...room, ...r]

    // console.log(r);
    // .where({owner:{roomAddress:{district:searchParams.location}}})
    return res.send(result)
})

export const getPhoto = catchAsync(async (req, res, next) => {
    // console.log(req.profile)
    if (req.profile.tenant) {
        console.log(3)

        res.set(
            'Content-Type',
            req.profile.image.contentType
        )
        return res
            .status(200)
            .send(req.profile.images.data)
    }

    if (req.profile.owner !== undefined && req.profile.owner.images) {
        console.log(1)
        //   res.set("status", 200);
        res.set('Content-Type', req.profile.owner.images.contentType)
        return res.status(200).send(req.profile.owner.images.data)
    }
    if (req.profile[0].owner) {
        console.log(2)

        //   res.set("status", 200);
        res.set('Content-Type', req.profile[0].owner.images.contentType)
        return res.status(200).send(req.profile[0].owner.images.data)
    }
    if (req.profile[0].tenant) {
        // console.log(2);
        // console.log("PROFILE",req.profile[0].tenant);

        //   res.set("status", 200);
        res.set(
            'Content-Type',
            req.profile[0].tenant.images.contentType
        )
        return res
            .status(200)
            .send(req.profile[0].tenant.images.data)
    } else {
        console.log(4)

        res.set('Content-Type', req.profile.images.contentType)
        return res.status(200).send(req.profile.images.data)
    }
    // next();
})

export const getProfilePhoto = catchAsync(async (req, res, next) => {
    // console.log(req.profile)
    if (req.profile.tenant) {
        console.log(3)

        res.set(
            'Content-Type',
            req.profile.tenant.image.contentType
        )
        return res
            .status(200)
            .send(req.profile.tenant.image.data)
    }

    if (req.profile !== undefined && req.profile.image) {
        console.log(1)
        //   res.set("status", 200);
        res.set('Content-Type', req.profile.image.contentType)
        return res.status(200).send(req.profile.image.data)
    }
    if (req.profile[0].owner) {
        console.log(2)

        //   res.set("status", 200);
        res.set('Content-Type', req.profile[0].image.contentType)
        return res.status(200).send(req.profile[0].image.data)
    }
    if (req.profile[0].tenant) {
        // console.log(2);
        // console.log("PROFILE",req.profile[0].tenant);

        //   res.set("status", 200);
        res.set(
            'Content-Type',
            req.profile[0].tenant.image.contentType
        )
        return res
            .status(200)
            .send(req.profile[0].tenant.image.data)
    } else {
        console.log(4)

        res.set('Content-Type', req.profile.image.contentType)
        return res.status(200).send(req.profile.image.data)
    }
    // next();
})

export const getRoomById = async (req, res, next, id) => {
    let room = [];
    room = await UserModal.find({ 'owner._id': id }).populate('owner', 'phoneNumber');

    if (room.length > 0) {
        req.room = room[0].owner;
        req.room.phoneNumber = room[0].owner.phoneNumber; // Access the phone number
    }

    if (!room || room.length <= 0) {
        room = await OwnerModal.findById(id);
        req.room = room;
        req.roommodel = room;
    }

    if (!room || room.length <= 0) {
        return next(createHttpError(500, 'Room not found'));
    }
    next();
}
export const getUserByID = async (req, res, next, id) => {
    console.log(id)
    let user = await UserModal.findById(id)

    // , (err, user) => {
    // console.log(user,err);
    // console.log(user);

    if (!user | (user == null)) {
        user = await UserModal.find({ 'owner._id': id })
    }

    if (!user | (user == null)) {
        user = {
            owner: await OwnerModal.findById(id),
        }
        console.log('USER', user)
    }

    if (!user | (user == null) | (user == null)) {
        user = await TenantModal.findById(id)
    }
    // console.log('USER', user)

    if (!user | (user == null) | (user.length == 0)) {
        user = await UserModal.find({ 'tenant._id': id })
    }

    if (!user) {
        next(createHttpError(500, 'User not found'))
    }
    // console.log("HI",user);

    req.profile = user
    next()
    // });
}

export const deleteRoom = catchAsync(async (req, res, next) => {
    console.log(req.profile[0]._id);
    // check this owner._id exists in the database
    const owner = await UserModal.findById(req.profile[0]._id);
    if (!owner) {
        return next(createHttpError(404, 'Owner not found'));
    }
    else {
        console.log("owner found");

        try {
            await owner.updateOne(
                { $unset: { 'owner.roomDetails': '', 'owner.roomAddress': '', 'owner.images': '', 'owner.images': '', 'owner.workPreference': '', 'owner.description': '', 'owner.title': '', } }
            );
            // if success check
            res.status(200).json({ message: 'Owner title deleted successfully' });
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).json({ error: 'An error occurred while deleting the owner title' });
        }

    }

})
