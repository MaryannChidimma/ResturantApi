
const cloudinary = require('cloudinary').v2
const { InternalServerError } = require('./appError')

exports.singleUpload = async (filedata) => {
    const { path, originalname } = filedata

    cloudinary.config({
        cloud_name: process.env.Cloud_Name,
        api_key: process.env.Api_Cloud_Key,
        api_secret: process.env.Api_Cloud_Secret
    })

    const uniqueFilename = new Date().toISOString()
    let data_ = { public_id: `eva-kitchen/${uniqueFilename}`, tags: `eva-kitchen` }
    let url = await cloudinary.uploader.upload(path, data_);
    if (!url) throw new InternalServerError("something went wrong, could not upload file")
    return ['png', 'jepg', 'jpg'].includes(originalname.split('.')[1]) ? url.secure_url : ''

}

exports.multiple = async () => {

}
