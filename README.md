# Boilerplate Typescript - Express - Postgres - Docker
## API Rest definition

Description of the API Rest endpoints
### Paystats amount
- Aggregated total turnover amount per zip code area in order to support the map layer. For each zip code with turnover its returned:
  - zip code
  - total aggregated
  - WKB, to draw it
  
  The selected color in which it would be painted shall be decided at front level, as we are passing the total aggregate value.
```sh
curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0QWNjZXNzIjoiMjAyMi0wNi0yNlQxNjozNjozOS42MTNaIiwidXNlcklkIjoicjQzcjQiLCJ1c2VyTmFtZSI6Ikl2YW5jaHVjayBhY3RpdmUiLCJpYXQiOjE2NTYyNjEzOTl9.A-GwgSwhYQdrKMqAJJjvhEv_cUptvVpaegjMpWsECuk" -v 'http://0.0.0.0:5001/api/zip-code/paystats-amount?startMonth=2014-01&endMonth=2015-02'
```
### Paystats total
- Total amount based on a date range. It will only return the total amount.
```sh
curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0QWNjZXNzIjoiMjAyMi0wNi0yNlQxNjozNjozOS42MTNaIiwidXNlcklkIjoicjQzcjQiLCJ1c2VyTmFtZSI6Ikl2YW5jaHVjayBhY3RpdmUiLCJpYXQiOjE2NTYyNjEzOTl9.A-GwgSwhYQdrKMqAJJjvhEv_cUptvVpaegjMpWsECuk" -v 'http://0.0.0.0:5001/api/paystats/total?startMonth=2015-01&endMonth=2015-02'
```

### Paystats accumulated by gender
- Data grouped by age and gender. Based on the data range provided the following data is provided:
  -  total amount
  -  age range
  -  gender
```sh
curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0QWNjZXNzIjoiMjAyMi0wNi0yNlQxNjozNjozOS42MTNaIiwidXNlcklkIjoicjQzcjQiLCJ1c2VyTmFtZSI6Ikl2YW5jaHVjayBhY3RpdmUiLCJpYXQiOjE2NTYyNjEzOTl9.A-GwgSwhYQdrKMqAJJjvhEv_cUptvVpaegjMpWsECuk" -v 'http://0.0.0.0:5001/api/paystats/accumulated/age-gender?startMonth=2015-01&endMonth=2015-02'
```
### Paystats accumulated by age, gender and month
- Data grouped by age, gender and month. Based on the data range provided the following data is provided: 
  - total amount
  - age range
  - gender
  - month
```sh
curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0QWNjZXNzIjoiMjAyMi0wNi0yNlQxNjozNjozOS42MTNaIiwidXNlcklkIjoicjQzcjQiLCJ1c2VyTmFtZSI6Ikl2YW5jaHVjayBhY3RpdmUiLCJpYXQiOjE2NTYyNjEzOTl9.A-GwgSwhYQdrKMqAJJjvhEv_cUptvVpaegjMpWsECuk" -v 'http://0.0.0.0:5001/api/paystats/accumulated/age-gender-month?startMonth=2015-01&endMonth=2015-02'
```
### Paystats zip code detail
- Paystats detail of a specific zip code for the selected range. The following data is provided: 
  - total amount
  - age range
  - gender
```sh
curl -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0QWNjZXNzIjoiMjAyMi0wNi0yNlQxNjozNjozOS42MTNaIiwidXNlcklkIjoicjQzcjQiLCJ1c2VyTmFtZSI6Ikl2YW5jaHVjayBhY3RpdmUiLCJpYXQiOjE2NTYyNjEzOTl9.A-GwgSwhYQdrKMqAJJjvhEv_cUptvVpaegjMpWsECuk" -v 'http://0.0.0.0:5001/api/paystats/zip-code/28222?startMonth=2015-01&endMonth=2015-02'
```

## Tech stack
- NodeJs - Express
- Inversify: Dependencies injection
- Pg-pool: Connection pool for Postgres
- JWT: Session token
- Jest: Tests
- Makefile: Beside of npm scripts, makefile rules are available
- Docker: API Rest is containerized (Dockerfile included), also there rules available for managing a postgres-postgis container
- Eslint

### Docker Image
Docker image can be created by using the makefile rule __build_container_image__ and __back_start__ to start it. There is also a __back_stop__ rule

### Project structure
The project has a layered structure, comprising:
 - Controllers: These are endpoints that can be accessed by the front-end.
 - Services: These contain the business logic that is related to the controller requests.
 - Repository: This provides access to the database through a PostgreSQL connector.
 - Model: This refers to the data model that is managed by the database.
 - DTOs: These are formatted data that is sent to the front-end.

In addition to these layers, there are other groups of logic that need to be taken into account:
- Middlewares: There 3 types of middlewares implemented
    - Auth: Verifies and updates the session token. Also verifies the user has permissions to execute the action (Mocked)
    - Cors: As we are dealing with a front-end, it is expected to be deployed in a specific domain. Restricting transactions only with current domain is an extra in security. By default is set to the wildcard *, pending to include a list of domains to be provided by an enviroment variable.
    - Error: When an Error is thrown and is not capture, the middleware in last turn captures it and responds with a 500 including the message provided by the Error.
- Utils:
    - Asserts: Functions to verify data received by parameters from the front-end. These asserts are done at controller level.
    - Error: Standardize error logging
    - Dates: Perform operations related to dates

### Controllers
- Dates send from front-end to back-end are month, so it has been decided to use the ISO 8601 with the format 'YYYY-MM'

### Models
- A model composes of an interface and a class. The interface is named with the suffix _Schema_, and represents the data with the column names in the DB. The class is the model managed by the back-end. The class has a constructor expecting its corresponding _schema interface_.
- This pattern give as the flexibility to define any transformation directly inside the model class, and also to define the structure of the data in the DB.

### Repositories
- All repositories extend from PostgresClient, responsable for converting the structure obtained from the databse to the model class.
- The decision has been made to use pg-pool instead of pg directly, as it allows for multiple connections to be made.

### Authentication
- Included middleware for auth + cors
- Middlewares are included at controllers level. This approach can let us easily decide if an endpoint needs to be secured or if it needs to be govern by any specific middleware for security reasons. For example, status endpoint (defined in src/config/express.ts) is public and used by maintenance operations, so auth or cors middleware defined for front-end requests do not apply. Also, login methods will also be public until the authentication is positive and the token is generated for the first time and sent to back the client.
- No login methods are implemented, but to perfomr tests there is a npm script _tokenGen_ that generates a token with no expiracy. Added to pending list 😢
- Updated token between transactions is a jwt token with expiracy time and it is included in the **authorization** header field. It is evaluated for every transaction, updated (to avoid expiracy) and included back in the response at the same header field
- In the auth middleware, beside verifying the token, user permissions are resolve and decide whether the user is capable of performing the request or not (Mocked). Depending on the type of service provided the token information is not enough to decide if the user has permissions to perform the action. For example, if the user has been banned from the platform or block by an admin, the token will not have that info but once we check against our system the ation will be rejected.

### Tests
- Not enough tests 😞. Need to include more.

### Pendig to implement
- Tests: As mentioned in previuos section.
- Logging:
    - Currently using console.log/error
    - Wanted to include a wrapper for Logging and log messages with Winston
    - Middleware for logging requests-responses, for toubleshooting time.
- Containers:
    - Database container would be ideal if it had a rule to populate with provided data
- Autehntication:
    - Login methods
    - Was not sure if it could be suitable, but considred a second authentication mechanism based on an API Key + origin domain. Similar to how Google does it with Firebase. It would be complementary to the current user authentication. If the __authorization__ header filed content starts with "Bearer" it would mean this option is the autehntication method to be taken into account.
-Documentation:
    - Documentation for the API Rest, add some lib that generates and serves the documentation in swagger style. Would give a first try to [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) and [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
