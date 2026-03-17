import { mockTeam } from '../data/mockTeam';
import type { TeamMember } from '../types/team';

const SIMULATED_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const teamStore: TeamMember[] = [...mockTeam];

export async function getTeamMembers(): Promise<TeamMember[]> {
  await delay(SIMULATED_DELAY_MS);
  return [...teamStore];
}

export async function getTeamMemberById(
  id: string,
): Promise<TeamMember | undefined> {
  await delay(SIMULATED_DELAY_MS);
  return teamStore.find((member) => member.id === id);
}
