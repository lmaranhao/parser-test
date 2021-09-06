const axios = require('axios');
const responseFactory = require('./ResponseFactory');

class HttpClient {

    async getMedia() {

        const [twitterResult, facebookResult, instagramResult] =
            await Promise.all([
                this.requestSocialMedia(process.env.TWITTER_URL), 
                this.requestSocialMedia(process.env.FACEBOOK_URL), 
                this.requestSocialMedia(process.env.INSTAGRAM_URL)
            ]);
        
        return `{
            "twitter": ${JSON.stringify(twitterResult, null, 2)}, 
            "facebook": ${JSON.stringify(facebookResult, null, 2)}, 
            "instagram": ${JSON.stringify(instagramResult, null, 2)}
        }`;
            
    }

    async requestSocialMedia(url) {
        try {
            const response = await axios.get(url, {
                timeout: process.env.TIMEOUT
            });
            return responseFactory(response.data);
        } catch (e) {
            return [];
        }
    }
}

module.exports = new HttpClient();