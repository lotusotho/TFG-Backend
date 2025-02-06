import expressLoader from './express';

export default async function (server: any) {
  await expressLoader(server);
}
