# Research Laravel Grafana Swagger

This project serves as a guide on how to integrate NestJS, Loki, and Grafana into clean code practices.

## User Management

You can store user information in the database by making a POST request to `/users/new-user`. Use the `x-www-form-urlencoded` format and provide the following parameters:

- `name`: string
- `username`: string (unique)
- `passwords`: string

To log in, use the POST request to `/auth/login` with the following parameters:

- `username`: string
- `password`: string

This will return an `access_token` that grants access to private routes within the application.

## Logging

Logging is configured using `nest-winston` along with the `winston-daily-rotate` file for log file rotation. Additionally, Loki and Grafana are integrated for enhanced monitoring.

To set up Loki and Grafana:

1. Navigate to the `docker_loki` directory.
2. Run the following command to start Loki and Grafana: 
   cd docker_loki
   docker-compose up
3. Log in to Grafana and add Loki as a data source.
4. Explore logs using the query `{job="varlogs"}`