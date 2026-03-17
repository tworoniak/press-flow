import { useQuery } from '@tanstack/react-query';
import { getTeamMembers } from '../api/teamApi';

export function useTeam() {
  return useQuery({
    queryKey: ['team'],
    queryFn: getTeamMembers,
  });
}
