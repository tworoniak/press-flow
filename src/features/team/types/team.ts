export type TeamRole = 'writer' | 'editor' | 'photographer' | 'admin';

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  email: string;
  avatar?: string;
}
