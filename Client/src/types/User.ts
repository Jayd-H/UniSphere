import { Society } from './Society';

export interface User {
  id: number;
  username: string;
  displayName: string;
  societies: Society[];
}