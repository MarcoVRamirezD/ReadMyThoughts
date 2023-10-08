const fs = require("fs");
const path = require("path");
const {validate} = require("../helpers/validate");
const Article = require("../models/Article");

const test = (req, res) => {
    return res.status(200).json({
        message: "This is just a testing action for the Article controller"
    })
}

const user = (req, res) => {
    console.log('The endpoint "Testing has been executed."');

    return res.status(200).json([
        {
            name: "Marco Ramirez",
            Age: 24,
            Country: "Costa Rica"
        },
        {
            name: "Charlie",
            Age: 2,
            Country: "Costa Rica"
        }
    ])
};

const create = (req, res) => {

    // Collect the data
    let parameters = req.body;

    // Validate the data
    try {
        validate(res, parameters);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Missing data."
        })
    };

    // Create the object
    const article = new Article(parameters);

    // Save the Object in the database 
    article.save()
        .then((articleSaved) => {
            if (!articleSaved) {
                return res.status(400).json({
                    status: "error",
                    message: "Missing data to send"
                });
            }

            // return result
            return res.status(200).json({
                status: "success",
                article: articleSaved,
                message: "article saved successfully"
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const list = (req, res) => {

    let query = Article.find({});

    if(req.params.last || req.params.last != undefined){
        query.limit(2);
    }


    query.sort({ date: -1 })
        .then((articles) => {
            if (!articles) {
                return res.status(400).json({
                    status: "error",
                    message: "No articles to show"
                });
            }

            // return result
            return res.status(200).json({
                status: "success",
                parameters: req.params.last,
                counter: articles.length,
                articles
            });
        })
        .catch((err) => {
            console.log(err);
        });

};

const listOne = (req, res) => { 
    // collect id from url
    const article_id = req.params.id;

    // find the article
    Article.findById(article_id)
        .then((article) => {
            if (!article) {
                return res.status(400).json({
                    status: "error",
                    message: "No article to show"
                });
            }

            // return result
            return res.status(200).json({
                status: "success",
                article
            });
        })
        .catch((err) => {
            console.log(err);
        });

};

const deleter = (req, res) => {
    // collect id from url
    const article_id = req.params.id;

    // find the article
    Article.findByIdAndDelete(article_id)
        .then((article) => {
            if (!article) {
                return res.status(400).json({
                    status: "error",
                    message: "No article to show"
                });
            }

            // return result
            return res.status(200).json({
                status: "success",
                article
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

const update = (req, res) => { 
    // collect id from url
    const article_id = req.params.id;

    // collect data from body
    const parameters = req.body;

    // validate data
    try {
        validate(res, parameters);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Missing data."
        })
    };

    // find and update the article
    Article.findByIdAndUpdate(article_id, parameters, {new: true})
        .then((article) => {
            if (!article) {
                return res.status(400).json({
                    status: "error",
                    message: "No article to show"
                });
            }

            // return result
            return res.status(200).json({
                status: "success",
                article
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

const upload = (req, res) => {
    // Configure multer

    // collect the file of uploaded image
    if(!req.file && !req.files){
        return res.status(400).json({
            status: "error",
            message: "No image to upload"
        })
    }

    // name of the file
    const file_name = req.file.originalname;


    // extension of the file
    const file_extension = file_name.split(".")[1];
    console.log(file_extension);

    // validate the extension
    if(file_extension != "png" && file_extension != "jpg" && file_extension != "jpeg" && file_extension != "gif"){
        fs.unlink(req.file.path, (err) => {
            if(err){
                return res.status(400).json({
                    status: "error",
                    message: "Invalid extension"
                })
            }
        })
        return res.status(400).json({
            status: "error",
            message: "Invalid extension"
        })
    } else {
        //collect the article id
        const article_id = req.params.id;

        // update the article
        Article.findByIdAndUpdate(article_id, {image: req.file.filename}, {new: true})
            .then((article) => {
                if (!article) {
                    return res.status(400).json({
                        status: "error",
                        message: "No article to show"
                    });
                }

                // return result
                return res.status(200).json({
                    status: "success",
                    article: article,
                    file: req.file
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
}

const image = (req, res) => {  
    const file = req.params.image;
    physical_path = `./images/articles/${file}`;
    
    fs.stat(physical_path, (error, exist) => {
        if(exist){
            return res.sendFile(path.resolve(physical_path));
        } else {
            return res.status(400).json({
                status: "error",
                message: "Image doesn't exist"
            })
        }
    })
}

const search = (req, res) => {
    // collect the string to search
    const string = req.params.string;

    // find the article
    Article.find({ "$or": [
        {"title": {"$regex": string, "$options": "i"}},
        {"content": {"$regex": string, "$options": "i"}}
    ]})
        .then((articles) => {
            if (!articles || articles.length <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No article to show"
                });
            }

            // return result
            return res.status(200).json({
                status: "success",
                articles
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    test,
    user,
    create,
    list,
    listOne, 
    deleter,
    update,
    upload,
    image, 
    search
}