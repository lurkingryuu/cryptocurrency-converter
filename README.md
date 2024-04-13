# Cryptocurrency Conversion Application

## Overview

This applicatio provides a service for cryptocurrency conversion.
It uses Express.js as the server framework and MongoDB for data storage.
This API also saves the available cryptocurrencies every hour in database to avoid calling the external API multiple times.
Also provides functionality to get the list of companies holding the currency.

## Author

`Yelisetty Karthikeya S M`, aka [lurkingryuu](https://github.com/lurkingryuu)

## Running the Application Locally

### Installation

1. Clone the repository
2. Install the dependencies
3. Configure the environment variables

```bash
git clone git@github.com:lurkingryuu/cryptocurrency-converter.git
cd cryptocurrency-converter
cp .env.example .env
```

4. Start the server

```bash
npm install
npm start
```

### Environment Variables

The following environment variables are necessary to run the application:

-   `MONGODB_URL`: The URL of the MongoDB database
-   `COINGECKO_API_KEY`: The API key for the CoinGecko API

Other environment variables can be found in the `.env.example` [file](.env.example).

## Running the Application in Docker

### Docker ce

1. Clone the repository - same as above
2. Build the Docker image
3. Configure the environment variables - same as above
4. Run the Docker container

```bash
docker build -t crypto_converter .
docker run -d --env-file .env -p 8080:3000 --name crypto_converter-1 crypto_converter
```

5. Check the health of the API

```bash
$ docker ps

CONTAINER ID   IMAGE                    COMMAND                  CREATED              STATUS                        PORTS                     NAMES
15cdc3e4d5d3   crypto_converter         "npm start"              About a minute ago   Up About a minute (healthy)   0.0.0.0:8080->3000/tcp    crypto_converter-1
```

6. Access the API at `http://localhost:8080`
7. Stop and remove the container after use

```bash
docker stop crypto_converter-1
docker rm crypto_converter-1
```

## Docker Compose

1. Clone the repository - same as above
2. Configure the environment variables - according to the `docker-compose.yaml` [file](docker-compose.yaml)
3. Run the Docker Compose

```bash
docker-compose build
docker-compose up -d
```

4. Check the health of the API

```bash
$ docker ps

CONTAINER ID   IMAGE                          COMMAND                  CREATED         STATUS                   PORTS                     NAMES
f3640494709e   cryptocurrency_converter-app   "npm run start"          7 minutes ago   Up 7 minutes (healthy)   0.0.0.0:3000->3000/tcp    crypto-converter-app
91a941d68da3   mongo:6.0.15-rc0-jammy         "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes             27017/tcp                 crypto-converter-db
```

Optionally, you can check the logs of the API container

```bash
docker compose logs -f
```

5. Access the API at `http://localhost:3000`
6. Stop and remove the containers after use

```bash
docker-compose down --volumes
rm -rf ./data
```

## API Reference

Go to [Endpoints](#endpoints) for the quick reference.

### Postman

The APIs can be run in Postman using the collection provided [here](https://www.postman.com/lurkingryuu-team/workspace/lurkingryuu-workspace/collection/19693177-7d91ae5d-ebdc-4f31-8fd0-916f86644e15?action=share&creator=19693177)

The Documentation can be found [here](https://documenter.getpostman.com/view/19693177/2sA3Bhfapw).

### Hosted API

The API is hosted on azure based on the workflow in the repository and can be accessed [koinx.lurkingryuu.me](https://koinx.lurkingryuu.me)

Alternate link: [koinx.azurewebsites.net](https://koinx.azurewebsites.net)

## Endpoints

### GET /ping

This endpoint is used to check the health of the API.

**Request:**

```http
GET /ping
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

"Pong!"
```

### POST /convert

This endpoint is used to convert a cryptocurrency to another cryptocurrency.

**Request:**

```http
POST /api/convert

{
    "fromCurrency": "bitcoin",
    "toCurrency": "basic-attention-token",
    "date": "12-01-2024"
}
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "rate": 176558.73727068843
}
```

### POST /api/companies-holding

This endpoint is used to get the list of companies holding the currency in descending order based on total holdings.

**Request:**

```http
POST /api/companies-holding

{
    "currency": "ethereum"
}
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "count": 2,
    "companies": [
        "Meitu Inc",
        "Mogo Inc."
    ]
}
```
