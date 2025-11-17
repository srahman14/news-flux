# API Reference

Base URL: `http://127.0.0.1:5000/api`

This document summarizes the backend API endpoints implemented in `flask-backend/app/controllers` and exposed via the blueprints registered under the `/api` prefix.

Notes:
- The backend proxies external APIs (NewsAPI, OpenWeatherMap, NASA, ExchangeRate API, CoinGecko). API keys for external services are loaded from environment variables in the Flask app.
- Error responses are typically JSON objects containing an `error` property and an HTTP error code where applicable.

## News API

| Endpoint | Method | Description | Query Params | Response (summary) |
|---|---:|---|---|---|
| `/news` | GET | Returns top headlines (default: US technology headlines). | none | JSON array of articles. Each article: `title`, `source`, `url`, `image_url`, `published_at`, `description`.
| `/news/search` | GET | Search news with arbitrary NewsAPI query parameters forwarded to the controller. | Any NewsAPI-compatible query params e.g. `q`, `country`, `category`, `page`, `pageSize` | JSON array of formatted articles (same shape as above). If an error occurs, returns `{ "error": "..." }`.

Example successful article structure:

```json
[{
	"title": "...",
	"source": "BBC News",
	"url": "https://...",
	"image_url": "https://...",
	"published_at": "2025-11-01T12:00:00Z",
	"description": "..."
}]
```

## Weather API

| Endpoint | Method | Description | Query Params | Response (summary) |
|---|---:|---|---|---|
| `/weather` | GET | Return a 5-day forecast for the provided `city` and `country`. | `city` (required) — city name; `country` (required) — country code (e.g. `US`). | `{ "city": "CityName", "country": "US", "forecasts": { "YYYY-MM-DD": { "temperature": <C>, "weather": "desc", "icon": "iconcode", "datetime": "YYYY-MM-DD hh:mm:ss" }, ... } }` or `{ "error": "..." }` with HTTP 400 if params missing.
| `/weather/random` | GET | Returns forecast data for a random preconfigured city (used by UI demo components). | none | Same shape as `/weather` response.

Notes:
- The controller keeps one representative forecast per day (first timestamp found for that date).
- Temperatures are returned in Celsius (`units=metric`).

Example:

```json
{
	"city": "London",
	"country": "GB",
	"forecasts": {
		"2025-11-17": { "temperature": 12.5, "weather": "light rain", "icon": "10d", "datetime": "2025-11-17 12:00:00" },
		"2025-11-18": { ... }
	}
}
```

## NASA API

| Endpoint | Method | Description | Query Params / Body | Response (summary) |
|---|---:|---|---|---|
| `/nasa-small` | GET | Returns a single random Astronomy Picture of the Day (APOD). | none | `{ "title": "...", "explanation": "...", "url": "...", "hdurl": "...", "media_type": "image" }` or `{ "error": "..." }`.
| `/nasa` | GET, POST | Returns APOD for a specific date (passed as query param). | `date` (query string) — ISO date string `YYYY-MM-DD` | Same APOD object as above. If `media_type` is not `image`, the controller returns `{ "error": "APOD is not an image" }`.

Example:

```json
{
	"title": "The Moon",
	"explanation": "...",
	"url": "https://...jpg",
	"hdurl": "https://...hd.jpg",
	"media_type": "image"
}
```

## Currency API

| Endpoint | Method | Description | Query Params | Response (summary) |
|---|---:|---|---|---|
| `/currency/latest` | GET | Returns latest exchange rates for a base currency and a small selection of popular currencies. | `base` (optional, default `USD`), `target` (optional — single currency code) | `{ "base": "USD", "date": "<timestamp>", "rates": [["EUR", 0.92], ["GBP", 0.78], ...], "target_rate": <number|null> }` or `{ "error": "..." }`.

Notes:
- `rates` is a small array (top ~5 popular currencies and their conversion rates relative to `base`). `target_rate` is provided if `target` was passed.

## Crypto API

| Endpoint | Method | Description | Query Params | Response (summary) |
|---|---:|---|---|---|
| `/crypto-small` | GET | Returns the top N cryptocurrencies by market cap (display feed). | none (limit hard-coded to 5 in route) | JSON array of objects: `{ "id": "bitcoin", "name": "Bitcoin", "current_price": 12345.67 }`.
| `/crypto-history` | GET | Returns historical price series for a crypto coin (by default `bitcoin`). | `crypto` (optional, default `bitcoin`), `days` (optional, default `30`) | `{ "prices": [ [timestamp_ms, price], ... ] }` (empty list or `{ "prices": [] }` on errors).

Example crypto feed item:

```json
[ { "id": "bitcoin", "name": "Bitcoin", "current_price": 45000.12 }, ... ]
```

---

Common error response example:

```json
{ "error": "Description of problem" }
```

If you want, I can:
- Add example curl commands for each endpoint.
- Add full example responses captured from the running backend.
- Validate and fix any route typos (e.g. missing leading slash in `news_routes.py`) so the documentation exactly matches the running endpoints.

