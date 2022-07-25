# shop-api
Personal project for my resume

I have used monst new technologies likes node.js , mongoDB , graphQL , express , redis , socket.io , ...  for create this project.

If you want to run this project , you can pull project or just docker.compose.yaml file on your system and run `docker-compose up` in command-line to crate docker container and test that.


This application has role restriction , that means only users with specific roles can access to some APIs .
For example only Admin can access to all users data or only a user with AUTHOR role can access blog APIs.
Because of that if you want to test all routes you can use  `/user/login-mobile`  route in swagger and use `09999999999` phone number to login(this is a default user that has ADMIN role)

One last note is that verification phone number won't sended to your phone number and for access verification code you can check application logs in command-line

#### Publish port : `4000`

#### Swagger : `/api-doc/`
#### Graphql : `/graphql`
#### Support : `/support`
