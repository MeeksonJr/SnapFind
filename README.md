# SnapFind - AI-Powered Product Identifier

SnapFind is an innovative app that lets users take a picture of a product, send it to a free AI model, and get detailed results back, including the product's title, description, pros, cons, and related items. Built with Next.js, React, and integrated with Google Cloud Vision API, Hugging Face, and Neon PostgreSQL.

## Features

- **AI Image Recognition**: Analyze product images using Google Cloud Vision API and Hugging Face models.
- **Smooth UI/UX**: Clean, responsive design with sleek animations powered by Framer Motion and GSAP.
- **Physics Background Effect**: Dynamic background that reacts to user interactions for an engaging experience.
- **Product History**: Keep track of previously identified products and explore related items.
- **Comparison Tool**: Compare multiple products side by side with pros and cons.
- **User Account**: Optional sign-up to save and track product history.

## Tech Stack

- **Frontend**:
  - Next.js (React-based framework)
  - Tailwind CSS (UI styling)
  - Framer Motion / GSAP (Animations)
  - Three.js (Physics background effect)
  - React Webcam (Image capture from camera)
- **Backend**:
  - Next.js API Routes
  - Google Cloud Vision API
  - Hugging Face API
  - Neon PostgreSQL (Database for product data and user history)
- **Storage**:
  - Cloudinary or Firebase for image storage (optional)

## Getting Started

To get started with the development of SnapFind, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/MeeksonJr/SnapFind.git
cd snapfind
```
2. Install Dependencies
bash

npm install
3. Set up Environment Variables
Create a .env.local file in the root of your project and add the following variables:

# Google Cloud Vision API key
GOOGLE_VISION_API_KEY=your-google-vision-api-key

# Hugging Face Access Token
HUGGING_FACE_ACCESS_TOKEN=your-hugging-face-access-token

# Neon PostgreSQL connection string
NEON_DATABASE_URL=your-neon-database-connection-string

# Gemini API Key
GEMINI_API_KEY=your-gemini-api-key
- 4. Set up Google Cloud Vision API
- Go to Google Cloud Vision.
- Create a new project and enable the Vision API.
- Create an API key and add it to your .env.local file.
- 5. Set up Hugging Face API
- Go to Hugging Face.
* Create an account and generate an API key.
- Add the key to your .env.local file.
- 6. Set up Neon PostgreSQL
- Sign up on Neon and create a new project.
- Get your connection string from the Neon dashboard.
- Add the connection string to your .env.local file.
- 7. Run the Development Server

npm run dev
Your app will be available at http://localhost:3000.

Project Structure
/pages: Contains your pages (Landing, Dashboard, etc.)
/components: Reusable components (Product Card, Header, etc.)
/lib: Utility functions and API routes
/styles: Tailwind CSS configuration
/public: Static assets (images, icons)
Contributing
Fork this repository.
Create your branch: git checkout -b feature/your-feature-name.
Commit your changes: git commit -am 'Add new feature'.
Push to the branch: git push origin feature/your-feature-name.
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Made with ❤️ by MeeksonJr + V0


### Notes:
- Replace `your-google-vision-api-key`, `your-hugging-face-access-token`, `your-neon-database-connection-string`, and `your-gemini-api-key` with the actual credentials in the `.env.local` file.
- Customize the GitHub repository URL and your name in the "Contributing" and "License" sections.

  
