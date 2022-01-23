import { UserStats } from './UserStats';

export interface UserDetail {
  avatar: string;
  curator: boolean;
  email: string;
  hash: string;
  id: number;
  name: string;
  stats: UserStats;
  testplay: boolean;
  type: string;
  uniqueSet: boolean;
  uploadLimit: number;
}
