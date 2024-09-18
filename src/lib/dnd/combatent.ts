import type { Monster } from "./monster";

export interface ICombatent {
    id: string;
    entry: Monster;
    initiative: number;
}