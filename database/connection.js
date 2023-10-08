const mongoose = require("mongoose");

const connection = async() => {

    try{
        await mongoose.connect("mongodb+srv://marcovramirezd:a83U9J1OjQlzbDWp@cluster0.2o9oqpt.mongodb.net/my_blog");

        console.log('database connected successfully')
    } catch(error){
        console.log(error)
        throw new Error("Couldn't connect to the database.")
    }

}

module.exports = {
    connection
}