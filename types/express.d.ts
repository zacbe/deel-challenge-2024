import 'express';
import { Profile } from '../src/models/profile';

declare module 'express-serve-static-core' {
  interface Request {
    profile?: Profile;
  }
}