import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export function getSessionServer() {
  return getServerSession(authOptions);
}
