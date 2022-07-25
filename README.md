# shop-api
##### `Personal project for my resume`

I have used most new technologies likes node.js , mongoDB , graphQL , express , redis , socket.io , ...  for create this project.

You can run this project on your system by pulling `docker.compose.yaml` file on your system and run `docker-compose up` command at file path in command-line to start docker container (NOTE : `docker` is needed).


This application has role restriction; that means only users with specific roles can access to some APIs .
For example only Admin can access to all users data or only a user with AUTHOR role can access blog APIs.
Because of that, if you want to test all routes you can use  `/user/login-mobile`  route in swagger and login with `09999999999` phone number. (this is a default user with `ADMIN` role)

One last note is that verification code won't send to your phone number; for get verification code you can check application logs in command-line

#### Publish port : `4000`

#### Swagger : `/api-doc/`
#### Graphql : `/graphql`
#### Support : `/support`
