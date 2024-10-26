import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../dirname.js"

const swaggerOptions =  {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
        title: "DOCUMENTACION API E-COMMERCE",
        version: "1.0.0",
        description: "api e-commerce"
    }
  },
  apis:[`${__dirname}/src/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions);
