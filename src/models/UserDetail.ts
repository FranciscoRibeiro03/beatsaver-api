import { UserStats } from './UserStats';

export interface UserDetail {
  avatar: string;
  curator: boolean;
  email: string;
  following: boolean;
  hash: string;
  id: number;
  name: string;
  stats: UserStats;
  testplay: boolean;
  type: string;
  uniqueSet: boolean;
  uploadLimit: number;
  verifiedMapper: boolean;
}
