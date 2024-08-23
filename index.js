
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Server Started");
});
//////////////////////////////////////

    // async function startServer() {
    //     try {
    //       await connection;
    //       console.log("Database connection Established");
    //     } catch {
    //       console.log("Database connection Failed");
    //     }
      
    //     app.listen(PORT,() => {
    //       console.log(`Server is running at http://localhost:${PORT}`);
    //       console.log("Server Started");
    //     });
    //   }
      
    //   startServer();