<h1>🍰 Cake Shop - React + Firebase + Node.js</h1>
  <p>A full-stack cake ordering web application with customer UI, admin panel, backend API, and Firebase + Cloudinary integration.</p>
  <p>🔗 Live Website:<a href="https://cake-shop-frontend.vercel.app"> https://cake-shop-frontend.vercel.app</a></p>
  <hr />

  <h2>📁 Folder Structure</h2>
  <pre>
cake-shop-react-firebase/
├── admin/       → Admin panel (React)
├── backend/     → Express backend (Node.js + Firebase)
└── frontend/    → Customer website (React)
  </pre>

  <h2>🚀 Getting Started</h2>

  <h3>1. Clone the Repository</h3>
  <pre>
git clone https://github.com/your-username/cake-shop-react-firebase.git
cd cake-shop-react-firebase
  </pre>

  <h3>2. Install Dependencies</h3>
  <pre>
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
  </pre>

  <h3>3. Start the Servers</h3>
  <p><strong>🟡 Backend</strong></p>
  <pre>
cd backend
npm start
  </pre>

  <p><strong>🟢 Customer Frontend</strong></p>
  <pre>
cd frontend
npm start
  </pre>

  <p><strong>🔵 Admin Panel</strong></p>
  <pre>
cd admin
npm start
  </pre>

  <h2>🔧 Tech Stack</h2>
  <ul>
    <li><strong>Frontend (User):</strong> React + Tailwind CSS</li>
    <li><strong>Admin Panel:</strong> React + React Router</li>
    <li><strong>Backend:</strong> Node.js + Express</li>
    <li><strong>Database:</strong> Firebase Firestore</li>
    <li><strong>Image Storage:</strong> Cloudinary</li>
    <li><strong>Deployment:</strong> Vercel</li>
  </ul>

  <h2>☁️ Cloudinary Image Upload</h2>
  <p>The admin panel allows uploading cake images, stored securely on <strong>Cloudinary</strong>. Steps:</p>
  <ul>
    <li>Create a Cloudinary account</li>
    <li>Get <code>cloud_name</code>, <code>api_key</code>, <code>api_secret</code></li>
    <li>Configure backend Cloudinary SDK</li>
    <li>Send image from admin panel using <code>FormData</code></li>
  </ul>

  <h2>🧪 Features</h2>

  <h3>✅ Customer Side</h3>
  <ul>
    <li>View cake details</li>
    <li>Order via WhatsApp (with quantity, special notes, delivery info)</li>
  </ul>

  <h3>✅ Admin Side</h3>
  <ul>
    <li>Add / Edit / Delete cakes</li>
    <li>Upload images to Cloudinary</li>
  </ul>

  <h2>📝 WhatsApp Order</h2>
  <p>The system auto-generates a WhatsApp message from form data with cake details.</p>

  <h2>📸 Screenshots</h2>
  <p>
    <img width="1910" height="1072" alt="Screenshot 2025-07-13 130447" src="https://github.com/user-attachments/assets/b556530c-279c-49ac-8d7f-ef7214a1a546" />
    <img width="1915" height="1074" alt="Screenshot 2025-07-13 130546" src="https://github.com/user-attachments/assets/325210ca-9d52-4935-820c-b2fefd2c005b" />
    <img width="1911" height="1079" alt="Screenshot 2025-07-13 130530" src="https://github.com/user-attachments/assets/a001c164-62d2-4da0-a3e0-cc9f0badfab8" />
    <img width="1899" height="1077" alt="Screenshot 2025-07-13 130521" src="https://github.com/user-attachments/assets/8bb93f53-8b86-4bad-84b8-c1e4e7c0077a" />    
  </p>
 
 <h2>🧑‍💻 Author</h2>
 <p><strong>Thamindu Kalhara</strong><br/>
📧 <a href="mailto:20.kalhara@gmail.com">20.kalhara@gmail.com</a><br/>
🌐 <a href="https://github.com/Kalhara2000">GitHub</a> | <a href="https://www.linkedin.com/in/ktdt-kalhara">LinkedIn</a>
</p>

  <h2>📃 License</h2>
  <p>This project is <strong>open-source</strong> and free to use. Attribution appreciated. 🌟</p>
