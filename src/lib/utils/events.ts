import { removeFromArray } from "./array";
import type { ICombatent } from "$lib/dnd";

class Event<Params extends unknown[]=[]> {
    private readonly callbacks: ((...params: Params) => void)[] = [];

    public subscribe(callback: (...params: Params) => void) {
        this.callbacks.push(callback);
    }

    public unsubscribe(callback: (...params: Params) => void) {
        removeFromArray(this.callbacks, callback);
    }

    public raise(...params: Params) {
        this.callbacks.forEach(callback => callback(...params));
    }
}

export type Submenus = "monsterList"|"addPlayer"|"combatentDetails";
export class EventManager {
    public static events = {
        openSubmenu: new Event<[Submenus, ICombatent|undefined]>(),
        closeSubmenu: new Event(),
        addCombatent: new Event<[ICombatent]>(),
    }
}

export function clickOutside(element: Element, callbackFunction: () => void) {
    const startTime = new Date().getSeconds();

    function onClick(event: any) {
        const currentTime = new Date().getSeconds();
        if (!element.contains(event.target) && currentTime - startTime > 0.5) {
            callbackFunction();
        }
    }
    
    document.body.addEventListener('click', onClick);
    
    return {
        update(newCallbackFunction: () => void) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick);
        }
    }
}