const httpClient = require('./HttpClient');
const axios = require('axios');

jest.mock('axios');

const twitter = {
    data: [{
            "username": "@GuyEndoreKaiser",
            "tweet": "If you live to be 100, you should make up some fake reason why, just to mess with people... like claim you ate a pinecone every single day."
        },
        {
            "username": "@mikeleffingwell",
            "tweet": "STOP TELLING ME YOUR NEWBORN'S WEIGHT AND LENGTH I DON'T KNOW WHAT TO DO WITH THAT INFORMATION."
        }
    ]
};

const facebook = {
    data: [{
            "name": "Some Friend",
            "status": "Here's some photos of my holiday. Look how much more fun I'm having than you are!"
        },
        {
            "name": "Drama Pig",
            "status": "I am in a hospital. I will not tell you anything about why I am here."
        }
    ]
};

const instagram = {
    data: [{
            "username": "hipster1",
            "picture": "food"
        },
        {
            "username": "hipster2",
            "picture": "coffee"
        },
        {
            "username": "hipster3",
            "picture": "coffee"
        },
        {
            "username": "hipster4",
            "picture": "food"
        },
        {
            "username": "hipster5",
            "picture": "this one is of a cat"
        }
    ]
}

test('testing all services responded', async() => {
    axios.get.mockResolvedValueOnce(twitter);
    axios.get.mockResolvedValueOnce(facebook);
    axios.get.mockResolvedValueOnce(instagram);

    // users = [{ name: 'Bob3' }];
    // resp = { data: users };
    // axios.get.mockImplementationOnce(() => {
    //     throw new Error('');
    // });
    const response = await httpClient.getMedia();
    const jsonResponse = JSON.parse(response);

    expect(jsonResponse["twitter"][0].username).toBe('@GuyEndoreKaiser');
    expect(jsonResponse["twitter"][0].tweet).toContain('If you live to be 100');
    expect(jsonResponse["twitter"].length).toBe(2);
    expect(jsonResponse["facebook"][1].name).toBe('Drama Pig');
    expect(jsonResponse["facebook"][1].status).toContain('I am in a hospital');
    expect(jsonResponse["facebook"].length).toBe(2);
    expect(jsonResponse["instagram"][4].username).toBe('hipster5');
    expect(jsonResponse["instagram"][4].picture).toBe('this one is of a cat');
    expect(jsonResponse["instagram"].length).toBe(5);
});

test('testing 1 service failed', async() => {
    axios.get.mockResolvedValueOnce(twitter);
    axios.get.mockResolvedValueOnce(facebook);

    axios.get.mockImplementationOnce(() => {
        throw new Error('');
    });
    const response = await httpClient.getMedia();
    const jsonResponse = JSON.parse(response);
    
    expect(jsonResponse["twitter"][0].username).toBe('@GuyEndoreKaiser');
    expect(jsonResponse["twitter"][0].tweet).toContain('If you live to be 100');
    expect(jsonResponse["twitter"].length).toBe(2);
    expect(jsonResponse["facebook"][1].name).toBe('Drama Pig');
    expect(jsonResponse["facebook"][1].status).toContain('I am in a hospital');
    expect(jsonResponse["facebook"].length).toBe(2);
    expect(jsonResponse["instagram"].length).toBe(0);
});