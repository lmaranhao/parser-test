const { response } = require("express");

const responseFactory = (responseArray) => {
    if(responseArray.length === 0) {
        return response;
    }

    const responseMap = responseArray.map((response) => {
        if(response.status) {
            return response.status;
        } else if(response.tweet) {
            return response.tweet;
        }if(response.picture) {
            return response.picture;
        }
    });

    return responseMap;
}

module.exports = responseFactory;