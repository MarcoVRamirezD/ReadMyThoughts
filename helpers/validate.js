const validator = require("validator");

const validate = (res, parameters) => {

    let validate_title = !validator.isEmpty(parameters.title) &&
        validator.isLength(parameters.title, { min: 5, max: undefined });
    let validate_content = !validator.isEmpty(parameters.content);

    if (!validate_title || !validate_content) {
        throw new Error("Couldn't validate the information!")
    }
}

module.exports = {
    validate
}