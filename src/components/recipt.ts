/**
 * Recipt System
 */

import { type } from 'os';
import { Component } from '../lib/component';
import { Entity } from '../lib/entity';
import { ChoiceComponent } from './choice';
import { PoolComponent } from './pool';
import { SlotComponent } from './slot';
/**
 * 
 */
@Component.create('recipt')
export class ReciptComponent extends Component {
    constructor(
        public slots: SlotComponent[] = [],
        public age: number | ((entities: Entity[]) => number),
        public generate: (entities: Entity[]) => (Entity | [Entity, Entity])[],
    ) {
        super();
    }

    getItems() {
        return this.slots.map(slot => slot.current).filter(Boolean);
    }
    getAge() {
        if (typeof this.age == 'function') {
            return this.age(this.getItems());
        }
        return this.age
    }
    fulFilled() {
        return this.slots.every(slot => slot.fulFilled());
    }
}
