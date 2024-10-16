# **GarageBuddy**

A web-based system to keep track of items in your garage with a visual map and inventory. The app lets you add items with photos, descriptions, categories, and location tags. You can also pinpoint each item’s location on a custom map of your garage.

## **Table of Contents**

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up the Garage Map](#setting-up-the-garage-map)
- [Running the Application](#running-the-application)
- [Accessing the Application on Mobile](#accessing-the-application-on-mobile)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## **Features**

- Manage inventory items with descriptions, images, and categories.
- Visualize item locations on a custom map of your garage.
- Add, edit, and delete items from the inventory.
- Responsive design for both desktop and mobile devices.
- View detailed item information and pinpoint locations on a map.

## **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher): [Download Node.js](https://nodejs.org/)
- **Python** (version 3.8 or higher): [Download Python](https://www.python.org/)
- **SQLite**: Comes pre-installed with Python.
- **Git**: [Download Git](https://git-scm.com/)
- **VSCode** (optional but recommended for development): [Download VSCode](https://code.visualstudio.com/)

## **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/garagebuddy.git
   cd garagebuddy
   ```

2. **Set up the virtual environment** for the backend:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the frontend**:

   ```bash
   cd garagebuddy_frontend
   npm install
   ```

5. **Create the SQLite database**:

   - Create a file named `garage.db` in the `backend` folder.
   - The app will automatically initialize the required tables when you run the backend server.

## **Setting Up the Garage Map**

1. **Draw your garage map** using any image editor (e.g., Photoshop, GIMP, or even a hand-drawn map scanned and saved as an image).
2. Save the map image as `garage_map.png` in the `public` folder of your frontend (`garagebuddy_frontend/public/garage_map.png`).

   - Ensure that the image is not too large (e.g., **under 2MB**) for faster loading times.

## **Running the Application**

1. **Start the backend server**:

   ```bash
   cd backend
   python app.py
   ```

   - The server will start at `http://localhost:5000`.

2. **Start the frontend server**:

   ```bash
   cd garagebuddy_frontend
   npm start
   ```

   - The frontend will start at `http://localhost:3000`.

## **Accessing the Application on Mobile**

- Make sure your mobile device and the development machine are connected to the **same Wi-Fi network**.
- Access the frontend using your computer's IP address:

  - Find your computer's IP address:
    - **Windows**: Run `ipconfig` in Command Prompt and look for `IPv4 Address`.
    - **Mac/Linux**: Run `ifconfig` or `ip a` in Terminal and look for `inet` or `inet addr`.
  - Visit `http://<your-ip-address>:3000` on your mobile browser.

- The app will automatically adjust the backend URL to ensure proper functionality on mobile.

## **Project Structure**

```
garagebuddy/
│
├── backend/                 # Flask backend
│   ├── app.py               # Main Flask app file
│   ├── models.py            # Database models
│   ├── uploads/             # Directory for uploaded images
│   └── requirements.txt     # Python dependencies
│
├── garagebuddy_frontend/    # React frontend
│   ├── public/
│   │   └── garage_map.png   # Custom map of the garage
│   ├── src/
│   │   ├── components/      # React components (ItemCard, ItemForm, etc.)
│   │   ├── App.js           # Main React app file
│   │   └── index.js         # React entry point
│   └── package.json         # Node.js dependencies
│
└── README.md                # Project documentation
```

## **Technologies Used**

- **Frontend**: React, Material-UI, React-Konva
- **Backend**: Flask, SQLAlchemy
- **Database**: SQLite
- **Other Tools**: Axios, Konva, React Router

## **Troubleshooting**

- **Image Not Displaying on Mobile**: Ensure the `garage_map.png` file is in the correct location and that you are accessing the app using the IP address of your computer.
- **CORS Errors**: Make sure `CORS` is enabled in the backend with `flask-cors` and that the frontend is set up to communicate with `http://localhost:5000`.
- **Database Issues**: Ensure that `garage.db` exists in the `backend` folder and that the Python virtual environment is activated when running the backend.
- **Port Conflicts**: If `localhost:3000` or `localhost:5000` is already in use, change the port numbers in the respective configurations.

## **Contributing**

1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature/your-feature`).
3. **Make your changes** and **commit** (`git commit -m 'Add some feature'`).
4. **Push to the branch** (`git push origin feature/your-feature`).
5. **Open a pull request**.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
