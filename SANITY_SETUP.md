# Sanity Studio Setup for DOIT Interiors

We have initialized a Sanity Studio v3 project in the `/sanity` folder.

## 1. Installation

Navigate to the sanity folder and install dependencies:

```bash
cd sanity
npm install
```

## 2. Running Locally

Start the development server:

```bash
npm run dev
```

The Studio will be accessible at [http://localhost:3333](http://localhost:3333).

## 3. Deployment

To deploy the Studio to `https://doit.sanity.studio` (or your configured URL):

```bash
npm run deploy
```

## 4. CORS Configuration (Critical)

For the frontend (running on `http://localhost:5173`) to fetch data from Sanity, you must add it to the CORS origins.

1.  Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2.  Select your project (`wbrwrdre`)
3.  Go to **API** tab
4.  Under **CORS Origins**, add:
    *   `http://localhost:5173` (Allow credentials: No)
    *   `https://doit.sanity.studio` (and your production frontend URL)

## 5. Content Management

1.  Open Studio at `http://localhost:3333`
2.  Log in with your Sanity account
3.  Go to "Gallery Item"
4.  Create new items, upload images, and select categories (Apartment, Villa, etc.)
5.  **Publish** your changes
6.  Refresh the frontend to see the updates!
