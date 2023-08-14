const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EDU API",
      description: "EDU API endpoints documented on swagger",
      contact: {
        name: "Joshua Adesanya",
        email: "adesanyajoshua@ymail.com",
        url: "https://github.com/Josh4324/edu-md",
      },
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:1000/",
        description: "Local server",
      },
      {
        url: "https://app.stacademy.io",
        description: "Live server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app, port) => {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
