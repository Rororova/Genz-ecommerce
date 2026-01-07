# MongoDB Setup & Usage Guide for Cuck Chair

This guide explains how to set up and manage the MongoDB database for the Cuck Chair application.

## 1. Choose Your Database Type

You can run MongoDB in two ways:
*   **Locally**: Good for development, fast, no internet required.
*   **Cloud (MongoDB Atlas)**: Good for production, accessible from anywhere.

---

## Option A: Local MongoDB Setup (Recommended for Development)

1.  **Download MongoDB Community Server**:
    *   Visit the [MongoDB Download Center](https://www.mongodb.com/try/download/community).
    *   Select your OS (Windows).
    *   Download and run the installer.
    *   **Important**: During installation, check "Install MongoDB as a Service" and "Install MongoDB Compass" (a helpful GUI tool).

2.  **Verify Installation**:
    *   Open MongoDB Compass.
    *   Connect to `mongodb://localhost:27017`.
    *   If you can connect, your local server is running!

3.  **Configure Application**:
    *   The `.env` file in your project root is already set up for local development:
        ```env
        MONGODB_URI=mongodb://localhost:27017/cuck-chair
        PORT=3001
        ```

---

## Option B: MongoDB Atlas (Cloud) Setup

1.  **Create an Account**:
    *   Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.

2.  **Create a Cluster**:
    *   Build a Database -> Choose "Shared" (Free) -> Create Cluster.
    *   Select a provider/region close to you.

3.  **Setup Security**:
    *   **Database Access**: Create a database user (username/password). Remember these credentials!
    *   **Network Access**: Add IP Address -> "Allow Access from Anywhere" (0.0.0.0/0) for easiest testing, or add your specific IP.

4.  **Get Connection String**:
    *   Click **Connect** on your cluster.
    *   Select **Drivers** (Node.js).
    *   Copy the connection string. It will look like:
        ```
        mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
        ```
    *   Replace `<username>` and `<password>` with the user you created in step 3.

5.  **Update Configuration**:
    *   Open the `.env` file in your project root.
    *   Update `MONGODB_URI` with your connection string:
        ```env
        MONGODB_URI=mongodb+srv://user:pass123@cluster.mongodb.net/cuck-chair?retryWrites=true&w=majority
        ```

---

## 2. Running the Application

1.  **Start the Server**:
    ```bash
    npm run server
    ```

2.  **First Run (Seeding)**:
    *   When the server starts for the first time (or if the database is empty), it will automatically:
        *   Create the database `cuck-chair`.
        *   Create a moderator account (`moderator` / `moderator123`).
        *   Create initial "Brainrot" hashtags (SIGMA, RIZZ, etc.).
        *   Create sample forum posts.

3.  **Verify**:
    *   You should see `Connected to MongoDB` and `Database initialized successfully` in the terminal.

---

## 3. Managing Data with MongoDB Compass

MongoDB Compass is a GUI that lets you explore your data visually.

1.  Open **MongoDB Compass**.
2.  Connect using your URI (e.g., `mongodb://localhost:27017`).
3.  On the left sidebar, find `cuck-chair`.
4.  You will see collections matching your code:
    *   `users`: User accounts.
    *   `forumposts`: The forum threads.
    *   `comments`: Replies to posts.
    *   `hashtags`: Trending tags.
    *   `postlikes`: Likes on posts.

You can directly edit documents here if you need to fix data or manually elevate a user to 'moderator'.

## 4. Troubleshooting

*   **Error: connection refused**
    *   Ensure MongoDB service is running in Windows Services.
    *   Check if the URI in `.env` is correct.
*   **Error: bad auth / authentication failed**
    *   Check your username and password in the Atlas connection string.
    *   Ensure you didn't include special characters in the password that interfere with the URL (if so, URL encode them).
*   **Whitelisting**
    *   If using Atlas, make sure your current IP address is added in "Network Access".

