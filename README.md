# startup
This is the backend for an IOS application which serves to connect software engineers with little experience to startups looking for technical assistance.  

To update the cloud code install the Nodechef CLI.  
`npm install -g nodechef-cli`
  
Then Login to your Nodechef account.  
`nc login -em example@example.com -pw #######`  
  
Then run the following command while being located in /startup.  
`nc deploy --ccode -i startup`

# **Data Structure**
  
## **Environment Variables**
  
Note the importance of these tags.  These are how personalized job suggestions are made.
`String tags[] = ["Python", "JavaScript", "Java", "Python", "C++", "Go", "Swift", "React", "Vue", "Angular", "Node.js", "ExpressJS", "DJango", "AWS", "GCP", "Adobe Suite", "Agile", "Front-End", "Back-End", "Full-Stack", "Mobile"]` (these are a list of tags users can apply to job listings, experiences, or an applicants profile, please add more) 
   
`String states[] = ["AL": "Alabama","AK": "Alaska","AS": "American Samoa","AZ": "Arizona","AR": "Arkansas","CA": "California","CO": "Colorado","CT": "Connecticut","DE": "Delaware","DC": "District Of Columbia","FM": "Federated States Of Micronesia","FL": "Florida","GA": "Georgia","GU": "Guam","HI": "Hawaii","ID": "Idaho","IL": "Illinois","IN": "Indiana","IA": "Iowa","KS": "Kansas","KY": "Kentucky","LA": "Louisiana","ME": "Maine","MH": "Marshall Islands","MD": "Maryland","MA": "Massachusetts","MI": "Michigan","MN": "Minnesota","MS": "Mississippi","MO": "Missouri","MT": "Montana","NE": "Nebraska","NV": "Nevada","NH": "New Hampshire","NJ": "New Jersey","NM": "New Mexico","NY": "New York","NC": "North Carolina","ND": "North Dakota","MP": "Northern Mariana Islands","OH": "Ohio","OK": "Oklahoma","OR": "Oregon","PW": "Palau","PA": "Pennsylvania","PR": "Puerto Rico","RI": "Rhode Island","SC": "South Carolina","SD": "South Dakota","TN": "Tennessee","TX": "Texas","UT": "Utah","VT": "Vermont","VI": "Virgin Islands","VA": "Virginia","WA": "Washington","WV": "West Virginia","WI": "Wisconsin","WY": "Wyoming"]` (this should already be formatted for JSON)  
  
`String options[] = ["Full Time", "Part Time", "Internship", "Project", "Volunteer"]` (these are the options for users when creating experiences, searching for jobs, and creating listings)  
  
`String sort[] = ["Relevant", "Newest", "Oldest"]` (these are the options for users when searching for listings)  

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
  
#`String objectId` (this is automatically assigned at creation)
*`String firstName`  
*`String lastName`  
*#`String email`  
*`String password`  
*`bool type` (True = Applicant, False = Employer)  
`String country` (I think having country might be overkill initially)  
`String location` (both city and state can later be replaced by a geopoint which will allow us to filter for proximity to a certain location, please pass it to me like `Mishawaka, IN`)  
***I Think it would be cool to call this a greeting instead of a bio.  I feel like students often have a hard time writing about themselves, however, every student can think of a way to introduce themselves as if they were meeting IRL.***  
`String greeting`   
`File pic` (profile pictures would be a cool feature to add, but not neccessary)  
`String linkedIn`  
`String github`  
`String tags[]`  

## Class **Experience**
  
### Relationships  
  
1 --> 1 User  
  
### Parameters 
Key: (* = required, # = unique identifier)  
  
#`String objectId` (this is automatically assigned at creation) 
*`String name` (this is the name of the company or project)  
*`String start` (this is an start date, please pass it to me like `2020-10-30`)  
`String end` (this is an end date, please pass it to me like `2020-10-30`)  
`bool present` (True = present, False = ended)
`bool project` (True = project, False = ended)
`String title`  
*`String description`  
`String tags[]`  
  
## Class **Education**
  
### Relationships  
  
1 --> 1 User  
  
### Parameters 
Key: (* = required, # = unique identifier)  
  
#`String objectId` (this is automatically assigned at creation)
*`String college` (this is the name of the college/university)  
*`String start` (this is an start date, please pass it to me like `2020-10-30`)  
`String end` (this is an end date, please pass it to me like `2020-10-30`)  
`bool present` (True = present, False = ended)
*`String major`  
`String minor` 
`double gpa`  
`String tags[]`  

## Class **Listing**
  
### Relationships  
  
1 --> 1 User  
  
### Parameters 
Key: (* = required, # = unique identifier)  
  
#`String objectId` (this is automatically assigned at creation)
*`String name` (this is the name of the company or project)  
`String start` (this is an start date, please pass it to me like `2020-10-30`)  
`String location` (this is the location of the opportunity, please pass it to me like `Mishawaka, IN`)  
`String type` (give them the options as listed above in the ENV_VAR)
`bool paid` (True = paid, False = ended)
*`String title`  
`String description`  
`String tags[]` 

## Class **Company** Coming soon to an application near you...  

# **HTTP CALLS**

## Endpoint URL: `https://startup-5676.nodechef.com/`  

### GET '/test'  
param: {}  
response: {param}  
*This is a test call where you can send any params and it will always return all of the params just as you sent them.*

## USER  
### GET '/user'
This call will return all of the profile information for the currently logged in user.  
param: {*String sessionId}  
response: {String firstName, String lastName, String email, String location, String greeting, Experience[] experiences, Education[] educations, Listing[] listings}

### POST '/user/create'  
This call will create a new user.  All of the params are required and if one is missing it will return an error.  Please collect and send all of the information before making the call.  
param: {*String firstName, *String lastName, *String email, *String password, *bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error}  
  
### POST '/user/onboard/info'  
This is the second half of the user creation process.  None of the parameters are required, whatever params are not passed will be set to NULL.  
param: {*String sessionId, String location, String greeting, String linkedIn, String github, String tags[]}  
response: {String error}  

### POST '/user/onboard/education'  
This is the second half of the user creation process.  If a user has multiple educations, this call should be made multiple times.  
param: {*String sessionId, *String college, *String start, String end, bool present (True = present, False = ended), *String major, String minor, double gpa, String tags[]}  
response: {String error}  

### POST '/user/onboard/experience'  
This is the second half of the user creation process.  If a user has multiple experiences, this call should be made multiple times.  
param: {*String sessionId, *String name, *String start, String end, bool present, bool project, String title, String description, String tags[]}  
response: {String error}  
  
### GET '/user/reset'  
This call will reset the password of a user.  
param: {String email}  
response: {String msg, String error}  
*msg will say if the email has been sent and confirm the email address*
  
### PUT '/user/update/info'  
This call will update the users info (everything besides experiences and education)
param: {*String sessionId, String firstName, String lastName, String email, String location, String greeting}  
response: {String error} 
  
### PUT '/user/update/education'  
This call will update the user's educations, It is important to note... A user cannot change the name/startDate of a current education connected to their profile... If they want to change these values they will need to delete the current education and create a new one.  I still need you to pass the current name/startDate so I can make sure I am editing the correct education.
param: {*String sessionId, *String college, *String start, String end, bool present (True = present, False = ended), *String major, String minor, double gpa, String tags[]}  
response: {String error} 
  
### PUT '/user/update/experience'  
This call will update the user's experiences, It is important to note... A user cannot change the name/startDate of a current experience connected to their profile... If they want to change these values they will need to delete the current experience and create a new one.  I still need you to pass the current name/startDate so I can make sure I am editing the correct experience.
param: {*String sessionId, *String name, *String start, String end, bool present, bool project, String title, String description, String tags[]}  
response: {String error} 
  
### PUT '/user/update/listings'  
This call will update a listing connected to a users, It is important to note... A user cannot change the name/title of a current listing connected to their user... If they want to change these values they will need to delete the current listing and create a new one.  I still need you to pass the current name/title so I can make sure I am editing the correct listing.  
param: {*String sessionId, *String name, String start, String location, String type, bool paid, *String title, String description, String tags[]}  
response: {String error} 

## LISTINGS  

### GET '/listings'  
the first three params are filters.  If you pass multiple parameters it will use all of them to filter.  The last param is to sort the array, please see the ENV_VAR above for possible sorting options.  
param: {String name, String type, bool paid, String sortBy}    
response: {String sessionId, String error} 
  
### POST '/listings/create'  
param: {String email, String password, bool type (True = Applicant, False = Employer)}  
response: {String sessionId, String error}  
  
### PUT '/listings/update'  
param: {String email}  
response: {String msg, String error}  
*msg will say if the email has been sent and confirm the email address*