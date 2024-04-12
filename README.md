# Cryptocurrency Conversion Application

## Overview

This applicatio provides a service for cryptocurrency conversion.
It uses Express.js as the server framework and MongoDB for data storage.
This API also saves the available cryptocurrencies every hour in database to avoid calling the external API multiple times.
Also provides functionality to get the list of companies holding the currency.


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

- `MONGODB_URL`: The URL of the MongoDB database
- `COINGECKO_API_KEY`: The API key for the CoinGecko API

Other environment variables can be found in the `.env.example` [file](.env.example).


## API Reference

### Postman
The APIs can be run in Postman using the collection provided [here](https://www.postman.com/lurkingryuu-team/workspace/lurkingryuu-workspace/collection/19693177-7d91ae5d-ebdc-4f31-8fd0-916f86644e15?action=share&creator=19693177)

The Documentation can be found [here](https://documenter.getpostman.com/view/19693177/2sA3Bhfapw).



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

176558.73727068843
```

### POST /api/companies-holding


This endpoint is used to get the list of companies holding the currency in descending order based on total holdings.

**Request:**

```http
POST /api/companies-holding

{
    "currency": "bitcoin"
}
```

**Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
    "MicroStrategy",
    "Tesla",
    ...
]
```
