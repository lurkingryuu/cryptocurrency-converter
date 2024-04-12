# Cryptocurrency Conversion Application

## Overview

This applicatio provides a service for cryptocurrency conversion. It uses Express.js as the server framework and MongoDB for data storage.
This API also saves the available cryptocurrencies every hour in database to avoid calling the external API multiple times.

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
