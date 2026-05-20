<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mini Lead Distribution System</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px;
      line-height: 1.7;
      background-color: #f8f9fa;
      color: #222;
    }

    h1 {
      text-align: center;
      margin-bottom: 40px;
    }

    h2 {
      margin-top: 40px;
      color: #111;
      border-bottom: 2px solid #ddd;
      padding-bottom: 10px;
    }

    .section {
      background: white;
      padding: 25px;
      border-radius: 10px;
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    code {
      background: #eee;
      padding: 2px 6px;
      border-radius: 4px;
    }

    pre {
      background: #1e1e1e;
      color: #fff;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
    }

    ul {
      padding-left: 20px;
    }

    li {
      margin-bottom: 10px;
    }
  </style>
</head>

<body>

  <h1>Mini Lead Distribution System - Submission Documentation</h1>
    <a href="https://mini-lead-distribution-system-3rxj.vercel.app/" target="_blank"
         style="background: white; color: #1e40af; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
         🌐 Live Demo
      </a>

  <div class="section">
    <p>
      This document contains:
    </p>

  <ul>
      <li>Setup Instructions</li>
      <li>Allocation Algorithm Explanation</li>
      <li>Concurrency Handling Explanation</li>
      <li>Webhook Idempotency Explanation</li>
  </ul>
  </div>

  <!-- SETUP -->
  <div class="section">

   <h2>1. Setup Instructions</h2>

  <h3>Backend Setup</h3>

  <ol>
      <li>Navigate to backend folder</li>
      <li>Install dependencies:</li>
    </ol>

   <pre>npm install</pre>

  <p>Create <code>.env</code> file:</p>

  <pre>
MONGO_URI=mongodb+srv://aryan11kokare_db_user:k08lW8yeEKesqAtO@cluster0.jkpqzcj.mongodb.net/
PORT=8000
    </pre>

   <p>Start backend server:</p>

   <pre>npm run dev</pre>

  <hr />

  <h3>Frontend Setup</h3>

  <ol>
    <li>Navigate to frontend folder</li>
      <li>Install dependencies:</li>
    </ol>

  <pre>npm install</pre>

   <p>Update <code>services/api.js</code>:</p>

  <pre>
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default api;
    </pre>

   <p>Start frontend server:</p>
    <pre>npm run dev</pre>

  </div>

  <!-- ALLOCATION -->
  <div class="section">

  <h2>2. Allocation Algorithm</h2>

  <p>
      The system uses a hybrid provider allocation strategy.
    </p>

  <h3>Mandatory Providers</h3>

   <p>
      Certain providers always receive leads for specific services.
    </p>

  <h3>Round Robin Distribution</h3>

   <p>
      Remaining providers are selected using a fair round-robin algorithm.
    </p>

  <h3>Quota Validation</h3>

   <p>
      Providers are only selected if:
    </p>

   <pre>usedQuota &lt; monthlyQuota</pre>

   <h3>Persistent Allocation State</h3>

   <p>
      Allocation state is stored in MongoDB to maintain fair rotation even after server restart.
    </p>

  <p>This ensures:</p>

   <ul>
      <li>Fair distribution</li>
      <li>No provider overload</li>
      <li>Consistent allocation</li>
    </ul>

  </div>


  <div class="section">

   <h2>3. Concurrency Handling</h2>

   <p>
      MongoDB transactions and sessions were used to ensure atomic operations.
    </p>

   <p>
      Lead creation, provider allocation, assignment creation,
      and quota updates all execute inside a single transaction.
    </p>

  <p>This prevents:</p>

  <ul>
      <li>Duplicate assignments</li>
      <li>Quota overflow</li>
      <li>Partial database updates</li>
      <li>Race conditions during simultaneous requests</li>
    </ul>

  <p>
      If any operation fails, the transaction is rolled back automatically.
    </p>

  </div>

  <div class="section">

   <h2>4. Webhook Idempotency</h2>

   <p>
      Webhook idempotency is implemented using a
      <code>ProcessedWebhook</code> collection.
    </p>

  <p>
      Each webhook request contains a unique
      <code>webhookId</code>.
    </p>

  <p>
      Before processing:
    </p>

  <ul>
      <li>The system checks whether the webhookId already exists.</li>
    </ul>

   <p>
      If already processed:
    </p>

  <ul>
      <li>The webhook is ignored.</li>
    </ul>

  <p>
      This prevents duplicate quota resets when the same webhook
      is sent multiple times.
    </p>

  </div>

</body>
</html>
