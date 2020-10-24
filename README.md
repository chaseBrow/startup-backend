# startup
To update the cloud code install the Nodechef CLI.  
`npm install -g nodechef-cli`
  
Then Login to your Nodechef account.  
`nc login -em example@example.com -pw #######`  
  
Then run the following command while being located in /startup.  
`nc deploy --ccode -i startup`
  
## **HTTP CALLS**

### GET '/user/create'  
param: {String email, String password}  
response: {String sessionId, String msg}  
*msg will respond with success or failure message*  


### GET '/user/reset' param: {email}
