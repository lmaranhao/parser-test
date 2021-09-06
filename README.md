# Social Networks Feed Test

## Instructions
[Test Instruction](TechChallenge.pdf)

## Assumptions

## Instructions to install and run it locally
1. git clone 
2. npm install
3. npm start

If everything goes well you should see this in your console:
```
listening at http://localhost:3000
```

## Instructions to run tests locally
1. npm run test

## Instructions to call the service
After you have the application running on your local machine you can use your browser or issue the curl command below:
```
$ curl localhost:3000
```

## Node and NPM versions
This was coded using
```
$ node -v
v12.11.1
$ npm -v
6.12.0
```

## Configuration
In the project there's an [.env file](.env) with all environment variables needed to run the application.

## Assumptions and decisions
1. I'm using a timeout of 30s when calling the APIs provided in the instructions.
2. In case any of them returns an error we the response will have an empty array for that particular endpoint.
3. Unit test cases have been added to test 2 scenarious: when all services returns and when one of them fails.
   1. We are not accessing the real services in the uni tests. I'm mocking the axios GET request responses.
4. I'm also assuming the client only wants the list of tweets, statuses and photos, thus this is the only information being returned.