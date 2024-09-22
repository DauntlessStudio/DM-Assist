import type { PageLoad } from './$types';
import { base } from '$app/paths';
import type { IMonster } from '$lib/dnd/monster';

export const load: PageLoad = async ({ fetch }): Promise<{ monsters: IMonster[] }> => {
  const response = await fetch(`${base}/data/monsters.json`);
  const monsters: IMonster[] = await response.json();
  
  return { monsters };
};