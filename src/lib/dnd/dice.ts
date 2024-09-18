import { getRandomInteger } from "$lib/utils";

type Range = {
    amount: number;
    min: number;
    max: number;
}

export class Dice {
    private readonly value: (number|Range)[];

    constructor(rollString: string) {
        this.value = Dice.parse(rollString);
    }

    public roll() {
        return Dice.rollValue(this.value);
    }

    private static parse(roll: string) {
        const parts: (number|Range)[] = [];
        const components = roll.match(/\d(d\d+)?|\+|\-/g);

        if (components) {
            let sign = 1;

            for (const comp of components) {
                if (comp.toLowerCase().includes("d")) {
                    const split = comp.toLowerCase().split("d");
                    if (split.length === 2) {
                        parts.push({amount: Number(split[0]), min: 1 * sign, max: Number(split[1]) * sign});
                    }
                } else if (comp === "+") {
                    sign = 1;
                } else if (comp === "-") {
                    sign = -1;
                } else {
                    parts.push(Number(comp) * sign);
                }
            }
        }

        return parts;
    }

    private static rollValue(values: (number|Range)[]) {
        let total: number = 0;

        for (const val of values) {
            if (typeof val === "number") {
                total += val;
                console.log(`Modified ${val}`);
            } else {
                for (let index = 0; index < val.amount; index++) {
                    const roll = getRandomInteger(val.min, val.max);
                    total += roll;
                    console.log(`Rolled ${roll}`);
                }
            }
        }

        return total;
    }

    public static rollString(rollString: string) {
        return this.rollValue(this.parse(rollString));
    }
}