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
response: {String sessionId, String error}  


### GET '/user/reset'  
param: {String email}  
response: {String msg, String error}  
*msg will say if the email has been sent and confirm the email address*
