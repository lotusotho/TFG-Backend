import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { cloudflareSecurity, developmentValues } from '../config';

export const registrationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { username, email, password, type } = req.body;

  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

  if (!regex.test(email)) {
    return res.status(500).send({ error: 'Introduce un email válido' });
  }

  if (!developmentValues.development) {
    try {
      const response = await axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareSecurity.zone_id}/dns_records`,
        {
          comment: `Subdomain created for ${username}`,
          content: 'cname.vercel-dns.com',
          name: `${username}.mapach.es`,
          proxied: true,
          ttl: 3600,
          type: 'CNAME',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Email': cloudflareSecurity.email as string,
            Authorization: `Bearer ${cloudflareSecurity.api_key}`,
          },
        }
      );

      console.log('Cloudflare response:', response.data);
      return next();
    } catch (error: any) {
      console.error(
        'Error calling Cloudflare API:',
        error.response?.data || error.message
      );
      return res.status(500).send({ error: 'Error calling Cloudflare API' });
    }
  } else {
    return next();
  }
};
