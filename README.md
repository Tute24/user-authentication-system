# User Authentication System App
An user auth system application using MERN. This application was develop for learning purposes. It is great to understand how middlewares and user authentication works step-by-step.

# You can check de deploy link right here, and interact with the application yourself: https://userauth-frontend.vercel.app/

# Intro:
Using MERN stack, this app presents a whole login, register and dashboard enviromento that showcases how to properly authenticate an user (if he is a new user or an existing one) using the local Storage feature. It also has the admin page, which uses a different middleware to redirect the admin user to it's own page. On this app, we can see how the front-end, the back-end and the database comunicate with each other to safely handle the user's requests.

# Key Features:
 - **Login:** Verify the user's credentials a logs him into his dashboard page;
 - **Sign Up (Register):** Registers the user on the database, if his e-mail doesn't exists on the DB already, and then logs him into his dashboard page;
 - **Update infos:** In his dashboard page, the user can update his e-mail or password;
 - **Delete account:** In his dashboard page, the user can delete his account if he provides the correct password. The correspondent user will be deleted from the database;
 - **Logout:** The common logout feature, only a button away;
 - **Admin dashboard page:** If the logged user has an "admin" role on the database, he will be redirected to the admin dashboard page, where he can see all the registered users on the application and their name/email. *Note: the "admin" role needs to be configured manually on the database*;

# Technologies and libraries used:
  # Back-end:
  - **Node.Js:** a JavaScript runtime built on Chrome's V8 JavaScript engine;
  - **Express:** a fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for web and mobile applications;
  - **MongoDB:** a source-available, cross-platform, document-oriented database program (NoSQL);
  - **MongoDB Atlas:** an integrated suite of data services centered around a cloud database designed to accelerate and simplify building with data (necessary for database connection in the project deployment);
  - **Cors:** a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options;
  - **Jsonwebtoken:** a library for working with JWTs in Node.js. It provides a set of methods for creating, signing, and verifying JWTs;
  - **Dotenv:** a zero-dependency module that loads environment variables from a .env file into process.env;
  - **Nodemon:** a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected;
  - **Bcrypt:** a library to password hashing;

  # Front-end:
  - **React:** a JavaScript-based UI development library;
  - **React router DOM:** contains bindings for using React Router in web applications;
  - **Vite:** build tool that provides a faster and leaner development experience for modern web projects;
  - **Axios:** a promise based HTTP client for the browser and node.js;
  - **Tailwind CSS:** a utility-first CSS framework for rapidly building modern websites;

# How to run the application:

After cloning the repository and installing de dependencies with `cd ./frontend && npm install` and `cd ./backend && npm install` (having node and npm already installed is required), you can run the back-end and front-end on diferent ports.

- To run the front-end: `npm run dev`
- To run the back-end: `npm run start`

# Thanks for your time. Feedbacks are always welcomed!




