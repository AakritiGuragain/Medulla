# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9f91db5c-e9e8-4e6f-ad8d-698f9aa02d40

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9f91db5c-e9e8-4e6f-ad8d-698f9aa02d40) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9f91db5c-e9e8-4e6f-ad8d-698f9aa02d40) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Django Backend API for Transformation Journey App

## Features
- User registration (email, username, password)
- User login (JWT authentication)
- Post a transformation journey (text + optional image)
- List all transformation journeys

## API Endpoints

### Register
- **URL:** `/api/register/`
- **Method:** POST
- **Body:**
  - `username` (string, required)
  - `email` (string, required)
  - `password` (string, required, min 8 chars)
- **Response:** 201 Created or 400 Bad Request
- **Auth:** None

### Login
- **URL:** `/api/login/`
- **Method:** POST
- **Body:**
  - `email` (string, required)
  - `password` (string, required)
- **Response:** 200 OK with `{ access, refresh }` JWT tokens or 401 Unauthorized
- **Auth:** None

### List/Create Transformation Journeys
- **URL:** `/api/journeys/`
- **Method:**
  - GET: List all journeys (public)
  - POST: Create a journey (auth required)
- **Body (POST):**
  - `description` (string, required, max 2000 chars)
  - `image` (file, optional)
- **Response:**
  - GET: List of journeys
  - POST: Created journey object or error
- **Auth:** JWT access token required for POST

## Authentication
- Use JWT (djangorestframework-simplejwt)
- Include `Authorization: Bearer <access_token>` header for authenticated requests

## CORS
- Configured for `http://localhost:3000` (React frontend)

## File Uploads
- Images uploaded to `/media/journey_images/`
- Access via `MEDIA_URL`

## Setup Instructions

1. **Install dependencies:**
   ```sh
   pip install djangorestframework django-cors-headers Pillow djangorestframework-simplejwt
   ```
2. **Apply migrations:**
   ```sh
   python manage.py makemigrations
   python manage.py migrate
   ```
3. **Create superuser (optional):**
   ```sh
   python manage.py createsuperuser
   ```
4. **Run the server:**
   ```sh
   python manage.py runserver
   ```

## Testing the API

### Register
```sh
curl -X POST http://localhost:8000/api/register/ \
  -H 'Content-Type: application/json' \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
```

### Login
```sh
curl -X POST http://localhost:8000/api/login/ \
  -H 'Content-Type: application/json' \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Create Journey (Authenticated)
```sh
curl -X POST http://localhost:8000/api/journeys/ \
  -H 'Authorization: Bearer <access_token>' \
  -F 'description=My journey' \
  -F 'image=@/path/to/image.jpg'
```

### List Journeys
```sh
curl http://localhost:8000/api/journeys/
```

## Notes
- All responses are JSON with standard HTTP status codes.
- Adjust CORS and media settings as needed for production.
- For frontend integration, ensure requests use the correct endpoints and headers.
