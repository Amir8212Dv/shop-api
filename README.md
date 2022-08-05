# shop-api
##### `Personal project for my resume`

I have used the most new technologies likes node.js , mongoDB , graphQL , express , redis , socket.io & ...  for create and programm this application.

You can run this project on your system by pulling `docker.compose.yaml` file on your system and run `docker-compose up` command at file path in command-line to start docker container (NOTE : `docker` is needed).


This application has role restriction; that means only users with specific roles can access to some APIs .
For example only Admin can access to all users data or only a user with AUTHOR role can access blog APIs.
<br/>
***Note : The first phone number that you sign up with that in application , will be set as `ADMIN` role by default.***

One last note is that verification code won't send to your phone number; for get verification code you can check application logs in command-line

#### Publish port : `4000`

#### Swagger : `/api-doc/`
#### Graphql : `/graphql`
#### Support : `/support`
