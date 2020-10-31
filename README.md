# startup
To update the cloud code install the Nodechef CLI.  
`npm install -g nodechef-cli`
  
Then Login to your Nodechef account.  
`nc login -em example@example.com -pw #######`  
  
Then run the following command while being located in /startup.  
`nc deploy --ccode -i startup`

# **Data Structure**
  
## **Environment Variables**
  
`String tags[] = []` (these are a list of tags users can apply to job listings, experiences, or an applicants profile)  
`String states[] = ["AL": "Alabama","AK": "Alaska","AS": "American Samoa","AZ": "Arizona","AR": "Arkansas","CA": "California","CO": "Colorado","CT": "Connecticut","DE": "Delaware","DC": "District Of Columbia","FM": "Federated States Of Micronesia","FL": "Florida","GA": "Georgia","GU": "Guam","HI": "Hawaii","ID": "Idaho","IL": "Illinois","IN": "Indiana","IA": "Iowa","KS": "Kansas","KY": "Kentucky","LA": "Louisiana","ME": "Maine","MH": "Marshall Islands","MD": "Maryland","MA": "Massachusetts","MI": "Michigan","MN": "Minnesota","MS": "Mississippi","MO": "Missouri","MT": "Montana","NE": "Nebraska","NV": "Nevada","NH": "New Hampshire","NJ": "New Jersey","NM": "New Mexico","NY": "New York","NC": "North Carolina","ND": "North Dakota","MP": "Northern Mariana Islands","OH": "Ohio","OK": "Oklahoma","OR": "Oregon","PW": "Palau","PA": "Pennsylvania","PR": "Puerto Rico","RI": "Rhode Island","SC": "South Carolina","SD": "South Dakota","TN": "Tennessee","TX": "Texas","UT": "Utah","VT": "Vermont","VI": "Virgin Islands","VA": "Virginia","WA": "Washington","WV": "West Virginia","WI": "Wisconsin","WY": "Wyoming"]` (this should already be formatted for JSON)  
`String options[] = ["Full Time", "Part Time", "Internship", "Project", "Volunteer"]` (these are the options for users when creating experiences, searching for jobs, and creating listings)  

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
`String country` (I think having country might be overkill initially)  
`String city` (both city and state can later be replaced by a geopoint)  
`String state` (this will allow us to search by proximity if we have time)   
***I Think it would be cool to call this a greeting instead of a bio.  I feel like students often have a hard time writing about themselves, however, every student can think of a way to introduce themselves as if they were meeting IRL.***  
`String greeting`   
`File pic` (profile pictures would be a cool feature to add, but not neccessary)  
`String linkedIn`  
`String github`  

## Class **Experience**
  
### Relationships  
  
1 --> 1 User  
  
### Parameters 
Key: (* = required, # = unique identifier)  
  
*`String name` (this is the name of the company or project)  
*`String start` (this is an start date, please pass it to me like `2020-10-30`)  
`String end` (this is an end date, please pass it to me like `2020-10-30`)  
`String title`  
*`String description`  
*`String type` (if you could  []) 
`String linkedIn`  
`String github`  

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
