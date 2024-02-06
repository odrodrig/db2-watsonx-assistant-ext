// Does business logic
var ibmdb = require('ibm_db');

// The database connection information is being pulled from the environment. 
// It is considered best practice to pull configuration from the environment rather than hardcoding the values or pulling from a file. This allows for more flexibility when deploying across different environments.

// To set these environment variables, enter the correct connection information in the values below and run all export commands in your terminal.
/*
    export db2_host=""
    export db2_uid=""
    export db2_pwd=""
    export db2_port=""
*/
var db2_host = process.env.db2_host;
var db2_uid = process.env.db2_uid;
var db2_pwd = process.env.db2_pwd;
var db2_port = process.env.db2_port;

// This connection string is required to connect to the DB2 dataabse. Other databases may vary. You will need to check the specific library you are using to see how to connect to the database.
var conStr = "DRIVER={DB2};DATABASE=bludb;HOSTNAME="+db2_host+";UID="+db2_uid+";PWD="+db2_pwd+";PORT="+db2_port+";PROTOCOL=TCPIP;SECURITY=SSL";

// Get the user record by searching with first and last name
async function getUserDetailsByName(firstName, lastName, callback) {

    // Tell db2 to open a connection
    let conn = await ibmdb.open(conStr);

    // We are executing a database query and passing in the first and last name of the user we would like to look up.
    conn.query("SELECT * from cbg93034.candidates where F_NAME='"+firstName+"' and L_NAME='"+lastName+"';", (err, data) => {
        
        if (err) {
            console.log(err);
            conn.close();

            // Send error to callback if there is an error
            callback(err, null);
        } else {
            console.log(data[0]);
            conn.close();

            // send data back to the callback
            callback(null, data[0]);
        }
    });

}

// Get user record by email
async function getUserDetailsByEmail(email, callback) {

    // Tell db2 to open a connection
    let conn = await ibmdb.open(conStr);

    // Execute a database query and pass in the email that we would like to search with
    conn.query("SELECT * from cbg93034.candidates where EMAIL='"+email+"' LIMIT 1;", (err, data) => {
        

        if (err) {
            console.log(err);
            conn.close();

            // Send error to callback if there is an error
            callback(err, null);
        } else {
            console.log(data[0]);
            conn.close();

            // send data back to the callback
            callback(null, data[0]);
        }
    });

}

module.exports = { getUserDetailsByName, getUserDetailsByEmail };