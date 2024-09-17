import type { MonsterDamageType } from "./monster";

export enum MonsterBehaviorType {
    "None",
    "Trait",
    "Action",
};

export enum MonsterAttackType {
    "None",
    "MeleeWeapon",
    "RangedWeapon",
};

interface BehaviorBase {
    name: string;
    monsterBehaviorType: MonsterBehaviorType;
    description: string;
    descriptionWithLinks: string;
    attackType: string;
    restrictions: any;
    attackBonus: number;
    range?: string;
    numberOfTargets?: string;
    damage?: string;
    damageRoll?: string;
    damageType: MonsterDamageType;
}