# research-laravel-grafana-swagger

This project will inform you about master template how to integrate nestjs, loki, grafana in clean code


you can store user to the database at POST /users/new-user with x-www-form-urlencoded with following parameters : 
name: string,
username: string, unique
passwords: string

and then you can login to the database at POST /auth/login with parameters :
username :  string,
password : string

this will return an access_token which can be used to access private routes in the application