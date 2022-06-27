# Paystats API Rest for CARTO - [Description](https://gist.github.com/ajaest/164cbf99777cc33463b20e3e2fce9313#file-data-zip)
Git project is included
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
The project is structured in following basic layers:
- Controllers: Endpoints accesible by the FE 
- Services: Buissness logic related to the controller requested
- Repository: Access to DB via a postgres connector
- Model: Model managed by de DB
- DTOs: Data formatted sent to the FE

Beside of this layers related to satisfying the requests received from the client side, there other groups of ligic to consider:
- Middlewares: There 3 types of middlewares implemented
    - Auth: Verifies and updates the session token. Also verifies the user has permissions to execute the action (Mocked)
    - Cors: As we are dealing with a FE, it is expected to be deployed in a specific domain. Restricting transactions only with current domain is an extra in security. By default is set to the wildcard *. Pending to include a list of domains to be provided by enviroment variable.
    - Error: When an Error is thrown and is not capture, the middleware in last turn captures it and responds with a 500 including the message provided by the Error.
- Utils:
    - Asserts: Functions to verify data received by parameters from the FE. These asserts are done at controller level.
    - Error: Log errors in a common way
    - Dates: Dates operations

### Controllers
- Dates send from FE to BE are month, so it has been decided to use the ISO 8601 with the format 'YYYY-MM'
- As mentioned in test description it has been assumed that the FE can directly work with geometries in the WKB format, as I have no idea on how FE usually work wiht the GEOJSON

### Models
- A model composes of an interface and a class. The interface is named with the suffix _Schema_, and represents the data with the column names in the DB. The class is the model managed by the BE. The class has a constructor expecting its corresponding _schema interface_
- Provided file **postal_codes.csv** has 2 types of line breaks, windows and unix. Had to run dos2unix to be able to run it with /copy

### Repositories
- All repositories extend from PostgresClient, responsable for converting the structure obtained from the DB to the model class.
- It has been decided to use pg-pool instead of the pg directly as multiple connections could be performed.

### Authentication
- Included middleware for auth + cors
- Middleware is included at controllers level, because for example the status endpoint is public. Also, login methods will also be public until token is generated for first time and sent to the client.
- No login methods are implemented, but to perfomr tests there is a npm script _tokenGen_ that generates a token with no expiracy
- Updated token between transactions is a jwt token with expiracy time and it is included in the **authorization** header field. It is evaluated for every transaction, updated (to avoid expiracy) and included back in the response at the same header field
- In the middleware, beside verifying the token, user permissions are resolve and decide wether he is capable of performing the request or not (Mocked)

### Tests
- Not enough tests. I had ran out of time and decided to leave out tests for controllers and repositories mainly because specific environment should be prepared. Also some auth method should be included.

### Left overs due to missing time
- Tests: As mentioned in previuos section.
- Logging:
    - Currently using console.log/error
    - Wanted to include a wrapper for Logging and log messages with Winston
    - Middleware for logging requests-responses
- Containers:
    - DB container would be ideal if it had a rule to populate with provided data
- Autehntication:
    - Login methods
    - Was not sure if it could be suitable, but considred a second authentication mechanism based on an API Key + origin domain. Similar to how Google does it. It would be complementary to the current user authentication. If the __authorization__ header filed content starts with "Bearer" it would mean this option is the autehntication method to be taken into account.
-Documentation:
    - Documentation for the API Rest, adding some lib that generates and serves the documentation in swagger style. Would give a first try to [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) and [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
    