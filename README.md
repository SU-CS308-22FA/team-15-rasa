# RASA, a referee assignment and surveying app

## Link for the app
[https://rasa-0jba.onrender.com](https://rasa-0jba.onrender.com)

## Description

RASA is a full stack web application that uses match data from the Turkish Football Super League and ranks referees according to their performance score calculated by our proprietary algorithm. The bias score is determined by surveying users on the site and taking into account their opinions on the importance of certain statistics of referees.

## Table of Contents

- [User Documentation](#user-documentation)
  - [Installation](#installation)
  - [Usage](#usage)
- [Developer Documentation](#developer-documentation)
  - [How to Obtain the Source Code](#how-to-obtain-the-source-code)
  - [The Project Structure](#the-project-structure)
  - [How to Build and Deploy the Project](#how-to-build-and-deploy-the-project)
- [Credits](#credits)
- [License](#license)

## User Documentation

### Installation

To install the project, clone the repository and run the following commands:

```bash
npm install-client
npm-install
```

or alternatively

```bash
npm heroku-postbuild
npm install
```

for a production build.

### How to run the project

To run the project,

- if you have installed the project using the first method:

    ```bash
    npm run dev
    ```

- if you have installed the project using the second method:

    ```bash
    npm start
    ```

### How to report a bug

There are 2 ways to report a bug:

- You can open an issue on the [issues page](https://github.com/SU-CS308-22FA/team-15-rasa/issues) of the repository.
- You can send an email to [tff.rasa@gmail.com](mailto:tff.rasa@gmail.com)

### Known bugs

- The night mode does not work properly on the survey page.
- The close button on the referee details page does not work.
- In the comments section of the referee page, if you add a comment, and try to add a new one without leaving the page; the old comment gets overwritten.
- In the comments section of the referee page, if 2 users add a comment at the same time, the comment of the second user gets overwritten by the first user's comment.

## Developer Documentation

### How to Obtain the Source Code

To obtain the source code, clone the repository using the following command:

```bash
git clone [Repository URL]
```

### The Project Structure

- root
  - client directory that contains the frontend code
    - public directory that contains the static files
    - src directory that contains the source code
      - account settings
      - admin panel
      - auth
      - components
      - CSS
      - fixture and standings
      - home
      - profile
      - referee
      - team panel
      - user menu
      - misc
  - server related files including the database api


### How to Build and Deploy the Project

To build the project, run the following command:

```bash
npm run heroku-postbuild
npm install
```

To deploy the project on render:

- Add the following environment variables to the render dashboard:
  - `USERS_DB_URI = mongodb://<username>:<password>@<host>`
  - `NODE_ENV = production`

- Add the following build command to the render dashboard:
  - `npm install && npm run heroku-postbuild`

- Add the following start command to the render dashboard:
  - `npm start`
