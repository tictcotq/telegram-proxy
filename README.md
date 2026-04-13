# telegram-proxy

A minimal Vercel serverless proxy for the Telegram Bot API.

Forwards all requests from `api.telegram.org` through Vercel's infrastructure — useful when your server's network blocks outbound connections to Telegram.

## Usage

Deploy to Vercel, then point your bot client at the proxy:

```
TELEGRAM_API_ROOT=https://<your-deployment>.vercel.app/api
```

## How it works

A single catch-all route (`api/[...path].js`) forwards any request to `https://api.telegram.org/<path>`, preserving the method, body, and query parameters.
