# CRUD-Angular-.Net-API

## Project Overview
This project consists of two parts:

### Frontend:
- Built with Angular, allowing users to manage customer profiles through a web interface.

### Backend:
- Built with .NET Core Web API, which handles data storage and CRUD operations on customer profiles.

## Prerequisites
Before running the project, ensure that you have the following installed:

- **Node.js** (LTS version recommended) – [Download Node.js](https://nodejs.org)
- **.NET SDK** (version 6.0 or higher) – [Download .NET SDK](https://dotnet.microsoft.com/download)
- **SQL Server** (for database management, or use a local instance)

---

## Running the Backend (ASP.NET Core Web API)

### Steps to Run the Backend:

1. Open a terminal or command prompt.

2. Navigate to the backend project folder:
    ```bash
    cd path/to/your/backend
    ```

3. Configure the Database Connection:
    - Open the `appsettings.json` file.
    - Ensure the connection string points to your SQL Server instance:
    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=CustomerDb;Trusted_Connection=True;"
      }
    }
    ```
    - Update `Server`, `Database`, and authentication details according to your setup.

4. Restore Dependencies and Run the Backend Server:
    ```bash
    dotnet restore
    dotnet run
    ```
    - The backend API will start on `https://localhost:7238` by default.

5. **Optional** - View API Documentation:
    - Navigate to `https://localhost:7238/` to view the Swagger UI for API documentation and testing.

### API Endpoints
- `GET /api/customerprofiles` - Fetch all customer profiles.
- `GET /api/customerprofiles/{id}` - Fetch a customer profile by ID.
- `POST /api/customerprofiles` - Add a new customer profile.
- `PUT /api/customerprofiles/{id}` - Update an existing customer profile.
- `DELETE /api/customerprofiles/{id}` - Delete a customer profile.

---

## Running the Frontend (Angular)

### Steps to Run the Frontend:

1. Open a terminal or command prompt.

2. Navigate to the frontend project folder:
    ```bash
    cd path/to/your/frontend
    ```

3. Install Dependencies:
    ```bash
    npm install
    ```

4. Start the Frontend Application:
    ```bash
    npm run start
    ```
    - The Angular app will start on `http://localhost:4200`.

### Accessing the Application
- Open your browser and navigate to `http://localhost:4200`.
- You can now manage customer profiles:
  - Add new customers.
  - Edit existing customers.
  - Delete customers.
  - View all customer profiles.

---

## Additional Information

### Database Setup:
- The backend uses Entity Framework Core. On the first run, it will create the necessary database and tables.
- Ensure your SQL Server instance is running and accessible.

### CORS Configuration:
- If the frontend and backend are on different domains or ports, configure CORS in the backend.
- In `Program.cs`, add:
    ```csharp
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins",
            builder => builder.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader());
    });

    app.UseCors("AllowAllOrigins");
    ```

### API Documentation:
- Swagger UI is available at `https://localhost:7238/`.
- Use it to test API endpoints and view documentation.

### Troubleshooting:
- If you encounter issues connecting to the database, verify your connection string and SQL Server status.
- Ensure that both frontend and backend servers are running simultaneously.
