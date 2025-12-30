# Deployment Guide

Follow these steps to deploy your **Grand Door Designs** website to the internet.

## Prerequisites
- A [GitHub](https://github.com/) account (you already have this).
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account (for the database).
- A [Render](https://render.com/) account (for the backend).
- A [Vercel](https://vercel.com/signup) account (for the frontend).

---

## Step 1: Set up the Database (MongoDB Atlas)
Since your local database (`localhost`) cannot be accessed by the deployed server, you need a cloud database.

1.  **Log within/Sign up** to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Create a **New Project**.
3.  Click **Create** to build a database cluster. Select the **M0 (Free)** tier.
4.  **Security Quickstart**:
    -   Create a database user (username and password). **Write these down!**
    -   Add your IP address *and* ensure you verify "Allow Access from Anywhere" (0.0.0.0/0) later in Network Access if needed for Render.
5.  Wait for the cluster to finish creating.
6.  Click **Connect** -> **Drivers** (Node.js).
7.  Copy the **Connection String**. It looks like:
    `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
8.  Replace `<username>` and `<password>` with the credentials you created.

---

## Step 2: Deploy Backend (Render)
1.  **Log in** to [Render](https://render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository: `Mega-Project`.
4.  Configure the service:
    -   **Name**: `megastar-backend` (or similar)
    -   **Root Directory**: `backend` (Important!)
    -   **Runtime**: `Node`
    -   **Build Command**: `npm install`
    -   **Start Command**: `node server.js`
    -   **Environment Variables**: Click "Add Environment Variable"
        -   Key: `MONGO_URI`
        -   Value: *(Paste your MongoDB Atlas connection string from Step 1)*
        -   *(Optional)* Add `PORT` = `5001`. Render usually handles this automatically but good to set.
5.  Click **Create Web Service**.
6.  Wait for deployment to finish. You will get a URL like `https://megastar-backend.onrender.com`. **Copy this URL.**

---

## Step 3: Deploy Frontend (Vercel)
1.  **Log in** to [Vercel](https://vercel.com/).
2.  Click **Add New ...** -> **Project**.
3.  Import your GitHub repository: `Mega-Project`.
4.  Configure the project:
    -   **Framework Preset**: Verify it says "Vite" (Vercel typically auto-detects).
    -   **Root Directory**: `./` (Default is fine).
    -   **Environment Variables**:
        -   Key: `VITE_API_URL`
        -   Value: *(Paste your Backend URL from Step 2, e.g., https://megastar-backend.onrender.com)* **IMPORTANT:** Do not add a trailing slash `/`.
5.  Click **Deploy**.
6.  Wait for build. Once done, you will get a deployed domain (e.g., `mega-project.vercel.app`).

## Final Check
Open your Vercel URL. Try to place an order or inquiry. It should send the data to your MongoDB Atlas database via the Render backend.
