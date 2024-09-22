export type MonsterBehaviorType = "None"| "Trait"| "Action";

export type MonsterAttackType = "None"|"MeleeWeapon"|"RangedWeapon";

export type MonsterBehavior = {
    name: string;
    monsterBehaviorType: MonsterBehaviorType;
    description: string;
    descriptionWithLinks: string;
    attackType: MonsterAttackType;
    restrictions: any;
    attackBonus: number;
    range: string|null;
    numberOfTargets: string|null;
    damage: string|null;
    damageRoll: string|null;
    damageType: string;
}