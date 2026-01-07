# How to fix "Google Sign In is Not Working"

The Google Sign-In functionality is built into the code, but it requires valid credentials from Google to work. Because I cannot create a Google Cloud Project for you, you need to follow these steps to generate the keys.

### Step 1: Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **New Project** (e.g., "E-commerce Dashboard").

### Step 2: Configure OAuth Consent Screen
1. In the sidebar, go to **APIs & Services > OAuth consent screen**.
2. Select **External** and click **Create**.
3. Fill in the **App Information** (App name, User support email).
4. Add your email to **Developer contact information**.
5. Click **Save and Continue** until you finish. (You don't need to add scopes for basic login).

### Step 3: Create Credentials
1. Go to **APIs & Services > Credentials**.
2. Click **+ CREATE CREDENTIALS** and select **OAuth client ID**.
3. Application type: **Web application**.
4. Name: `Next.js App` (or anything you like).
5. **Authorized JavaScript origins**:
   - `http://localhost:3000`
6. **Authorized redirect URIs** (Important!):
   - `http://localhost:3000/api/auth/callback/google`
7. Click **Create**.

### Step 4: Add Keys to Your Project
1. Copy the **Client ID** and **Client Secret** shown.
2. Open the `.env` file in your project folder.
3. Paste the keys into the corresponding fields:

```env
GOOGLE_CLIENT_ID="your-copied-client-id"
GOOGLE_CLIENT_SECRET="your-copied-client-secret"
```

### Step 5: Restart the Server
1. Stop the running server (Ctrl+C).
2. Run `npm run dev` again.
3. Go to http://localhost:3000/login and try signing in with Google!
