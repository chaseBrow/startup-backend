# startup
To update the cloud code install the Nodechef CLI.  
`npm install -g nodechef-cli`
  
Then Login to your Nodechef account.  
`nc login -em example@example.com -pw #######`  
  
Then run the following command while being located in /startup.  
`nc deploy --ccode -i startup`

# **Data Structure**
  
## Class **User**
  
### Relationships  
  
If a user is an applicant, they are expected to have atleast 1 Experience and 1 Education.  
If a user is an Employer, they do not need Experience, Education, or a Listing.  
  
1 --> 0..* Experience  
1 --> 0..* Education  
1 --> 0..* Listings  
COMING SOON...  possibly... jk... too much work... diminishing returns...  
1 --> 0..*  Company  
  
### Parameters 
Key: (* = required, # = unique identifier)  
  
*`String firstName`  
*`String lastName`  
*#`String email`  
*`String password`  
*`bool type` (True = Applicant, False = Employer)  
`String city` (both city and state can later be replaced by a geopoint)  
`String state` (this will allow us to search by proximity if we have time)   
***I Think it would be cool to call this a greeting instead of a bio.  I feel like students often have a hard time writing about themselves, however, every student can think of a way to introduce themselves as if they were meeting IRL.***  
`String greeting`   
`File pic` (profile pictures would be a cool feature to add, but not neccessary)  
`String linkedIn`  
`String github`  

## Class **Experience**

## Class **Education**

## Class **Listing**

## Class **Company** Coming soon to an application near you...  

# **HTTP CALLS**

## Endpoint URL: `https://startup-5676.nodechef.com/`  

### GET '/test'  
param: {}  
response: {param}  
*This is a test call where you can send any params and it will always return all of the params just as you sent them.*

## USER  
### GET 'user'
param: {String sessionId}
response: {String firstNameExperience[] experiences, }

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
  
### POST '/user/update/info'  
param: {String firstName, String , bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error} 
  
### POST '/user/update/education'  
param: {String email, String password, bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error}  
  
### GET '/user/update/experience'  
param: {String email}  
response: {String msg, String error}  
*msg will say if the email has been sent and confirm the email address*
  
### POST '/user/update/listings'  
param: {String email, String password, bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error} 

## LISTINGS  

### POST '/listings'  
param: {String email, String password, bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error} 




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
