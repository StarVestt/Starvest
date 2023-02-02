# StarVest

## Added Backend with real database
- You can test the 4 methods - GET, POST, PUT, DELETE
- Controller folder contains all the method functions are declared
- Routes folder contains the routes.
- middleware folder contains an error middleware to generate a custom error message
- model folder contains all the schemas and models for our collection
- config folder contains the configuration for the database linking

## How to run
- Clone the github repo
- Do ```npm install```
- Enter command: ```npm run server```
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