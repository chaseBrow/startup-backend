# startup
To update the cloud code install the Nodechef CLI.  
`npm install -g nodechef-cli`
  
Then Login to your Nodechef account.  
`nc login -em example@example.com -pw #######`  
  
Then run the following command while being located in /startup.  
`nc deploy --ccode -i startup`
  
## **HTTP CALLS**

Endpoint URL: `https://startup-5676.nodechef.com/`  

### GET '/test'  
param: {}  
response: {param}  
*This is a test call where you can send any params and it will always return all of the params just as you sent them.*


### POST '/user/create'  
param: {String email, String password, bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error}  


### GET '/user/reset'  
param: {String email}  
response: {String msg, String error}  
*msg will say if the email has been sent and confirm the email address*


### POST '/user/create'  
param: {String email, String password, bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error} 


### POST '/user/create'  
param: {String email, String password, bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error} 
