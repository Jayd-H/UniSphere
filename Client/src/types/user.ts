import { Society } from './society';

export interface User {
  id: number;
  userName?: string;
  displayName: string;
  societies?: Society[];
}