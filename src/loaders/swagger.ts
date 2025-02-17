import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

export default (app: Express): void => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger docs available at http://localhost:3000/swagger');
};
