import { Instant } from './Instant';
import { UserDetail } from './UserDetail';

export interface MapTestplay {
  createdAt: Instant;
  feedback: string;
  feedbackAt: Instant;
  user: UserDetail;
  video: string;
}
