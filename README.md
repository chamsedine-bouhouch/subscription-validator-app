# We Settle API

A minimal backend API using Express.js, Sequelize ORM, and Supabase PostgreSQL — deployed on Vercel as a serverless function.

---

## 📁 Folder Structure

```
.
├── db.js                   # Sequelize config with Supabase
├── index.js                # Express app entry (Vercel-compatible)
├── models/
│   ├── index.js            # Sequelize associations (optional)
│   ├── Inscription.js      # Main data model
│   └── User.js             # Linked user model
├── routes/
│   └── inscriptions.js     # Routes for GET/POST inscriptions
├── .env                    # Environment variables
├── package.json            # Project metadata and dependencies
├── vercel.json             # Vercel config for serverless deploy
```

---

## ⚙️ Setup & Development

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/we-settle-api.git
cd we-settle-api
```

### 2. Add Your Supabase DB URL

Create a `.env` file at the root:

```
DATABASE_URL=postgresql://your_user:your_pass@db.xxxxx.supabase.co:5432/your_db
```

You can find this in Supabase → Project Settings → Database → Connection Info.

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Run Locally

Use Vercel dev server:

```bash
npx vercel dev
```

Your server will be available at:  
[http://localhost:3000/api/inscriptions](http://localhost:3000/api/inscriptions)

---

## 🚀 Deploy to Vercel

1. Login and initialize:

   ```bash
   vercel login
   vercel init
   ```

2. Set environment variable:

   ```bash
   vercel env add DATABASE_URL
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

---

## 📬 API Endpoints

### `GET /api/inscriptions`

Returns all inscription entries.

### `POST /api/inscriptions`

Creates a new inscription.

#### Request body:

```json
{
  "name": "Chamseddine",
  "lastname": "Bouhouch",
  "email": "bouhouchchamseddine@gmail.com"
}
```

#### cURL Example:

```bash
curl -X POST http://your-api-domain.com/api/inscriptions \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Chamseddine",
           "lastname": "Bouhouch",
           "email": "bouhouchchamseddine@gmail.com"
         }'
---

## 🧱 Tech Stack

- **Backend:** Express.js
- **ORM:** Sequelize
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel (Serverless Functions)

---

## 📄 License

MIT © 2025 Chamseddine Bouhouch
```
