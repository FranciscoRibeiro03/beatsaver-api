import { AuthRequest } from './AuthRequest';

export interface VoteRequest {
  auth: AuthRequest;
  direction: boolean;
  hash: string;
}
