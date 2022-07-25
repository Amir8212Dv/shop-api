# shop-api
personal project for my resume

i have used monst new technologies likes node.js , mongoDB , graphQL , express , redis , socket.io , ...  for create this project.

if you want to run this project , you can pull project or just docker.compose.yaml file on your system and run `docker-compose up` in command-line to crate docker container and test that.


this application has role restriction , that means only users with specific roles can access to some APIs .
for example only Admin can access to all users data or only a user with AUTHOR role can access blog APIs.
because of that if you want to test all routes you can use  login-mobile  route and use 09999999999 phone number to login(this is a default user that has ADMIN role)

one last note is that verification phone number won't sended to your phone number and for access verification code you can check application logs in command-line
