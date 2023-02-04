# StarVest

# File structure
- Config folder contains the configuration for the database linking
- Controller folder contains all the method functions are declared
- Middleware folder contains an error middleware to generate a custom error message
- Model folder contains all the schemas and models for our collection
- Routes folder contains the routes.
- Test folder contains all the tests

# Running the Server
## How to run
- Clone the github repo
- Do ```npm install```
- Enter command: ```npm run server``` to run with nodemon
- Enter command: ```npm run server-once``` to run it once
- This will start the server, wait for the Connection establishment message from mongo and now you can test the API's

## Testing routes
- Open postman and select the route you want
- Address will be "localhost:3001/api/blogs"
- For PUT and DELETE route address will be ".../api/blogs/:id" where :id is any value

## Sample data
### POST
```
{
    "title":"value",
    "content":"value"
}
```

### PUT
```
{
   <required_field> : "value"
}
```

- To delete or edit a blog the id's are written in the blogs itself, make a get request and get the id. 

# Running Tests
## How to run tests
- Enter command: ```npm run test```


## Some Points to remember:
> - Running the server and tests at the same time will give error as the database can only be used by one at a time.
> - Sometimes there will be connection error while connecting to mongoDB so try reconnecting again