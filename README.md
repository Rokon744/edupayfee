# 🎓 EduPay — Student Fee Payment System

A React + Firebase + SSLCommerz Sandbox payment portal for students.

---

## 📁 Project Structure

```
student-fee-system/
├── src/
│   ├── firebase/
│   │   ├── config.js              ← Firebase initialization
│   │   ├── studentService.js      ← Firestore read/write functions
│   │   └── firestoreSeedData.json ← Sample data to add to Firestore
│   ├── payment/
│   │   └── sslService.js          ← SSLCommerz payment initiation
│   ├── components/
│   │   ├── SearchBox.jsx          ← Roll number input form
│   │   ├── StudentCard.jsx        ← Student info + Pay button
│   │   ├── LoadingSpinner.jsx     ← Shimmer skeleton loader
│   │   └── ErrorMessage.jsx      ← Error display
│   ├── pages/
│   │   ├── SearchPage.jsx         ← Main page
│   │   └── PaymentResultPage.jsx  ← Success / Fail / Cancel pages
│   ├── App.jsx                    ← React Router setup
│   ├── main.jsx                   ← App entry point
│   └── index.css                  ← Tailwind + custom animations
├── functions/
│   └── index.js                   ← Firebase Cloud Function (optional backend)
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Step-by-Step Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Click **Add app** → Web (`</>`)
4. Copy the `firebaseConfig` object
5. Paste it into `src/firebase/config.js`

#### Enable Firestore
- In Firebase console → **Firestore Database** → **Create database**
- Start in **test mode** (allows all reads/writes while developing)

### 3. Add Sample Data to Firestore

Go to Firestore → **+ Start collection** → Collection ID: `students`

Add documents using roll numbers as Document IDs:

| Document ID    | name           | dueAmount | status   |
|----------------|----------------|-----------|----------|
| CSE-2024-01    | Rahim Uddin    | 12500     | unpaid   |
| CSE-2024-02    | Tasnim Akter   | 8750      | unpaid   |
| EEE-2024-01    | Fariha Islam   | 11200     | unpaid   |
| BBA-2024-01    | Ariful Islam   | 9500      | unpaid   |

> See `src/firebase/firestoreSeedData.json` for the full JSON reference.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 💳 Payment Flow

```
User enters Roll → Firestore lookup → Student Card shown
      → "Pay Now" clicked
      → SSLCommerz API called (via CORS proxy for sandbox)
      → User redirected to SSLCommerz hosted payment page
      → After payment: redirect to /payment/success or /payment/fail
      → On success: Firestore status updated to "paid"
```

### SSLCommerz Sandbox Test Cards

| Card Type  | Number               | Expiry | CVV |
|------------|----------------------|--------|-----|
| VISA       | 4111 1111 1111 1111  | Any    | Any |
| Mastercard | 5500 0000 0000 0004  | Any    | Any |

---

## 🔧 CORS Issue & Solutions

SSLCommerz blocks direct browser calls. Three options:

| Option | How | Best For |
|--------|-----|----------|
| **CORS Proxy** (default) | `corsproxy.io` wraps the request | Sandbox testing only |
| **Firebase Cloud Function** | Deploy `functions/index.js` | Production |
| **Vite Proxy** | Add proxy config to `vite.config.js` | Local dev only |

### Vite Proxy config (alternative for local dev)

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ssl-api': {
        target: 'https://sandbox.sslcommerz.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ssl-api/, '')
      }
    }
  }
})
```

Then in `sslService.js`, replace the fetch URL with `/ssl-api/gwprocess/v4/api.php`.

---

## 🌐 Production Checklist

- [ ] Replace sandbox credentials with live SSLCommerz credentials
- [ ] Deploy Firebase Cloud Function and use its URL in `sslService.js`
- [ ] Remove the CORS proxy
- [ ] Update `successUrl`, `failUrl`, `cancelUrl` to your deployed domain
- [ ] Tighten Firestore security rules (don't leave `allow read, write: if true`)
- [ ] Add student email field to Firestore and use it in the payment payload
