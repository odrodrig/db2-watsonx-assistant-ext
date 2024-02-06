# DB2 integration for Watsonx Assistant
This repo contains an example of how you can integrate a DB2 database with Watsonx Assistant via an extension.

For this application, we would like to query a database to retrieve information about a specific user. For example, getting the user's account number, rewards balance, contact information, etc. In this case, we can use either a customer's first and last name or their email to retrieve the user record. In a production application, this could be done automatically when a user logs in to the website so that the user themself doesn't have to pass in an email to the virtual assistant.

Other applications of database integrations could include retrieving:
- incoming orders
- product information
- invoice status
- and more

## Process

Custom extentions can be created for Watsonx Assistant by providing an OpenAPI document that defines an API that you would like to call from within a chat dialog. More information about creating custom extensions can be found [here](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-build-custom-extension)

This OpenAPI document can be found in this same repo at [./openapi.json](./openapi.json).

The steps taken to create this integration are as follows:

1. Create an application that can handle API requests. In this repo, I used a simple nodejs express application to do this and we have 2 endpoints: `/user/byName` and `/user/byEmail`.

2. For each API endpoint, I have implemented a function that calls a library for DB2 to query the database. If you are using a different database then you will need to find the appropriate library that will allow you to query the database from your code.

3. Create an OpenAPI document that describes the API endpoints that have been created.

4. Follow the steps in the [Watsonx Assistant documentation](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-build-custom-extension) to upload the OpenAPI document to create the custom extention.

5. Once the custom extention has been created, then it can be referenced within an Action step. You can choose what data from the conversation to send to your newly created API endpoint.

## Files of note

- routes/users.js: This file contians the API endpoints that we will expose in the application. This is where we will handle incoming request objects and send back responses. This file will call the service contained in `services/userService.js`.

- services/userService.js: This is where our logic for accessing the database resides. From this file we make a connection to our database and pass a query along.

- openapi.json: The OpenAPI document that is required for creating a custom extension in Watsonx Assistant. 

- containerfile: This is the file that is used to build the application container.