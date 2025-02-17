import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

export default (app: Express): void => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger docs available at http://localhost:3000/swagger');
};
