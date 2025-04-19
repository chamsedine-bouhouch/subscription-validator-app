
# We Settle API

A backend API built with **Express.js**, **Sequelize**, and **Supabase PostgreSQL**, deployed on **Vercel** as a serverless function.  
Designed to manage inscription validation and JWT token-based access for users.

---

## 📁 Folder Structure

```
.
├── db.js                   # Sequelize config with Supabase
├── index.js                # Express app entry (Vercel-compatible)
├── models/
│   ├── index.js            # Sequelize associations
│   ├── Inscription.js      # Main data model
│   └── User.js             # Linked user model
├── routes/
│   └── inscriptions.js     # Routes for GET/POST/validate/token
├── middlewares/
│   └── auth.js             # JWT Bearer token middleware
├── .env                    # Environment variables
├── seed.js                 # Seed script with faker
├── package.json            # Project metadata
├── vercel.json             # Vercel deployment config
```

---

## ⚙️ Setup & Development

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/we-settle-api.git
cd we-settle-api
```

### 2. Configure Environment

Create a `.env` file at the root:

```
DATABASE_URL=postgresql://your_user:your_pass@db.xxxxx.supabase.co:5432/your_db
JWT_SECRET=your_super_secret_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Locally

```bash
npm run dev
```

Your server will be running at:  
[http://localhost:3000](http://localhost:3000)

---

## 🧬 Seed the Database (Optional)

Use Faker to generate 30 fake inscriptions:

```bash
vercel dev

npm run seed

npm run seed-inscriptions
```

---

## 🚀 Deploy to Vercel

```bash
vercel login
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel --prod
```

---

## 📬 API Endpoints

### `GET /api/inscriptions`
Fetch all inscriptions.

### `POST /api/inscriptions`
Create a new inscription.

```json
{
  "name": "Chamseddine",
  "lastname": "Bouhouch",
  "email": "bouhouchchamseddine@gmail.com"
}
```

---

### `POST /api/inscriptions/:id/validate`
Validate an inscription by ID.  
Sets `validated: true`, generates `validation_date`.

---

### `GET /api/inscriptions/token/:id`
Generates a JWT bearer token (valid for 1 minute).  
Only available after validation.

```json
{
  "bearer_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### `GET /api/protected` _(example)_
Use `Authorization: Bearer <token>` to access protected routes.

---

## 🔒 Auth Middleware

Use `/middlewares/auth.js` to protect routes via JWT bearer token:

```http
Authorization: Bearer your_jwt_token
```

---

## 🧱 Tech Stack

- **Backend:** Express.js
- **ORM:** Sequelize
- **Database:** Supabase PostgreSQL
- **Auth:** JWT Bearer Tokens
- **Email (WIP):** Nodemailer or external service
- **Hosting:** Vercel (Serverless Functions)

---

## 🌐 Frontend Integration

Use this API with your Vue 3 frontend using Axios + Pinia:

- `/auth/login`: custom login
- `/inscriptions`: admin dashboard to manage users
- Token stored in localStorage with `pinia-plugin-persistedstate`

---

## 📄 License

MIT © 2025 [Chamseddine Bouhouch](mailto:bouhouchchamseddine@gmail.com)
