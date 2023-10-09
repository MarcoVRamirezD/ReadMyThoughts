const validator = require("validator");

const validate = (res, parameters) => {
    let validate_author = !validator.isEmpty(parameters.author) &&
        validator.isLength(parameters.author, { min: 1, max: undefined });
    let validate_title = !validator.isEmpty(parameters.title) &&
        validator.isLength(parameters.title, { min: 5, max: undefined });
    let validate_content = !validator.isEmpty(parameters.content);
        validator.isLength(parameters.content, { min: 10, max: undefined });

    if (!validate_title || !validate_content || !validate_author) {
        throw new Error("Couldn't validate the information!")
    }
}

module.exports = {
    validate
}