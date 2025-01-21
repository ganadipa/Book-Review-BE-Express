# Project Setup Guide

This guide will walk you through setting up the project from cloning the repository to configuring the database using PostgreSQL on your local machine.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **PostgreSQL** (v12 or later)

---

## Steps to Setup the Project

### 1. Clone the Repository

Start by cloning the repository from GitHub:

```bash
git clone <repository_url>
cd <repository_name>
```

---

### 2. Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

---

### 3. Setup PostgreSQL Database

#### a. Login to PostgreSQL

Log in to the PostgreSQL interactive terminal as a superuser (e.g., `postgres`):

```bash
psql -U postgres
```

#### b. Create the Database

Run the following command to create the database:

```sql
CREATE DATABASE db_book_reviews_express;
```

#### c. Create the User

Create a new user and assign a password:

```sql
CREATE USER user_book_reviews_express WITH PASSWORD 'password';
```

#### d. Grant Privileges

Grant all privileges on the database to the new user:

```sql
GRANT ALL PRIVILEGES ON DATABASE db_book_reviews_express TO user_book_reviews_express;
```

#### e. Exit psql

Exit the PostgreSQL terminal:

```bash
\q
```

---

### 4. Configure Environment Variables

Create a `.env` file in the root of the project and add the following content:

```env
DB_NAME=db_book_reviews_express
DB_USER=user_book_reviews_express
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
```

---

### 5. Start the Application

Start the development server:

```bash
npm start
```

If successful, the application will be running, and you should see a message like:

```text
Example app listening on port 8080
Connection has been established successfully.
```

---

## Troubleshooting

- **Database Connection Issues**:
  - Ensure PostgreSQL is running: `sudo service postgresql status`
  - Verify the `.env` file contains the correct credentials.
- **Dependencies Missing**:
  - Run `npm install` again to ensure all packages are installed.

---

Your application is now ready to use!
