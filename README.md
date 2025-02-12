# Sapt Janam

Sapt Janam is a full-stack web application developed using Next.js and TypeScript. It offers user authentication via email/password and Google Login, and displays dummy data from a PostgreSQL database hosted on NeonDB. The application utilizes Prisma ORM for database interactions and employs Shadcn UI alongside Tailwind CSS for styling.

## Features

- **User Authentication:**
  - Email and password registration and login.
  - Google Login integration using NextAuth.js.
- **Data Display:**
  - Fetches and displays dummy data from the PostgreSQL database.
- **Responsive Design:**
  - Styled with Shadcn UI components and Tailwind CSS for a seamless user experience across devices.

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) (version 7 or later)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sagnik-datta-02/sapt-janam.git
   cd sapt-janam
   ```

2. **Install Dependencies:**

   Use the following command to install the necessary packages:

   ```bash
   npm install --legacy-peer-deps
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your_neondb_database_url
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_SECRET=your_auth_secret
```

- **DATABASE_URL:** The connection string for your NeonDB PostgreSQL database.
- **AUTH_GOOGLE_ID:** Your Google OAuth Client ID.
- **AUTH_GOOGLE_SECRET:** Your Google OAuth Client Secret.
- **AUTH_SECRET:** A secret key for NextAuth.js.

**Note:** Replace `your_neondb_database_url`, `your_google_client_id`, `your_google_client_secret`, and `your_auth_secret` with your actual credentials.

### Database Setup

1. **Initialize Prisma:**

   ```bash
   npx prisma generate
   ```

2. **Run Migrations:**

   Apply the database migrations to set up the schema:

   ```bash
   npx prisma migrate dev
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Design Approach and Technologies Used

### Design Approach

The application is designed with a focus on user authentication and data presentation. It provides a simple interface for users to sign up, log in, and view data fetched from the database. The use of Shadcn UI components ensures a consistent and responsive design, while Tailwind CSS allows for efficient styling.

### Technologies Used

- **Next.js:** A React framework for building server-side rendered applications.
- **TypeScript:** Enhances code quality and maintainability with static typing.
- **Prisma ORM:** Simplifies database interactions and migrations.
- **PostgreSQL (NeonDB):** A serverless PostgreSQL database hosting service.
- **NextAuth.js:** Manages authentication, supporting both email/password and Google OAuth.
- **Shadcn UI:** Provides pre-built UI components for a consistent design.
- **Tailwind CSS:** A utility-first CSS framework for efficient styling.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NeonDB Documentation](https://neon.tech/docs/introduction)

