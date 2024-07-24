import createHttpError from 'http-errors'
import { catchAsync } from '../utils/catchAsync.js'
import UserModal from '../models/user.model.js'

export const getAllTenant = catchAsync(async (req, res, next) => {
    const tenant = await UserModal.find({}, { tenant: 1 })
    let result = tenant.filter(data => data.tenant)

    return res.send(result)
})

export const getTenantById = (req, res, next, id) => {
    UserModal.find({ 'tenant._id': id }, (err, users) => {
        if (err || !users || users.length === 0) next(createHttpError(500, 'User not found'))

        req.tenant = users[0]; // This now includes the full user details
        next();
    })
}

export const getProfilePhoto = catchAsync(async (req, res, next) => {
    // console.log(req.profile)
    if (req.profile.tenant) {
        console.log(3)

        res.set(
            'Content-Type',
            req.profile.image.contentType
        )
        return res
            .status(200)
            .send(req.profile.image.data)
    }

    if (req.profile !== undefined && req.profile.image) {
        console.log(1)
        //   res.set("status", 200);
        res.set('Content-Type', req.profile.image.contentType)
        return res.status(200).send(req.profile.image.data)
    }
    if (req.profile[0]) {
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
            req.profile[0].image.contentType
        )
        return res
            .status(200)
            .send(req.profile[0].image.data)
    } else {
        console.log(4)

        res.set('Content-Type', req.profile.image.contentType)
        return res.status(200).send(req.profile.image.data)
    }
    // next();
})

export const getTenant = catchAsync(async (req, res, next) => {
    console.log('single')
    return res.send(req.tenant)
})

export const searchTenant = catchAsync(async (req, res, next) => {
    const searchParams = req.query
    let room = []
    console.log('hi', searchParams)
    if (searchParams.price) {
        room = await UserModal.find({}, { tenant: 1 }).sort({
            'tenant.preferredRooms.rentPerMonth': 1,
        })

        room = room.filter(data => {
            if (data.tenant) {
                return data
            }
        })
        console.log('Tenant', room)
    }

    //for preference gender
    if (searchParams.preference) {
        if (searchParams.preference == 'male') {
            room = await UserModal.find(
                { gender: searchParams.preference },
                { tenant: 1 }
            )
            room = room.filter(data => {
                if (data.tenant) {
                    return data
                }
            })
            console.log('hi', room)

            // ownerroom = await OwnerModal.find({'tenantPreference':searchParams.preference},{})
        }
        if (searchParams.preference == 'female') {
            room = await UserModal.find(
                { gender: searchParams.preference },
                { tenant: 1 }
            )
            console.log('female', room)
            room = room.filter(data => {
                if (data.tenant) {
                    return data
                }
            })
        }
    }

    // For Duration
    if (searchParams.duration) {
        if (searchParams.duration == 'short') {
            room = await UserModal.find(
                { 'tenant.preferredRooms.rentDuration': 'Under 6 months' },
                { tenant: 1 }
            )
            room = room.filter(data => {
                if (data.tenant) {
                    return data
                }
            })

            // ownerroom = await OwnerModal.find({'roomDetails.rentDuration':"Under 6 months"},{})
        }
        if (searchParams.duration == 'long') {
            room = await UserModal.find(
                { 'tenant.preferredRooms.rentDuration': 'More than 6 months' },
                { tenant: 1 }
            )
            room = room.filter(data => {
                if (data.tenant) {
                    return data
                }
            })

            // ownerroom = await OwnerModal.find({'roomDetails.rentDuration':"More than 6 months"},{})
        }
    }
    if (searchParams.location) {
        room = await UserModal.find(
            { 'tenant.preferredRooms.roomLocation': searchParams.location },
            { tenant: 1 }
        )
        console.log('Tenant', room)
    }

    let result = [...room]

    // .where({owner:{roomAddress:{district:searchParams.location}}})
    console.log(result)
    return res.send(result)
})

export const deleteTenant = catchAsync(async (req, res, next) => {
    console.log('req.tenant')
    if (req.tenant) {
        let user = await UserModal.findByIdAndDelete(req.tenant._id)    
        return res.status(200).send('Tenant deleted succesfully')
    }
})

export const getProfile = catchAsync(async (req, res, next) => {
    UserModal.find({ _id: req.params.ids }, (err, tenant) => {
        if (err || !tenant) next(createHttpError(500, 'Tenant not found'))

        console.log(tenant, req.params.ids)

        res.send(tenant)
    })
})
