/**
 * Processor System
 */

import { Component, ifComponent } from '../lib/component';
import { Entity } from '../lib/entity';
import { ReciptComponent } from './recipt';

@Component.create('processor')
export class ProcessorComponent extends Component {
    constructor(
        public recipts: {
            mainMaterial: ifComponent[],
            recipt: ReciptComponent
        }[] = [],
        public slot: Entity = undefined,
        public current_recipt: ReciptComponent = undefined,
        public running: boolean = false,
    ) {
        super();
    }

    findRecipt(entity: Entity) {
        const recipt = this.recipts.filter(recipt => Entity.withComponents(entity, recipt.mainMaterial))[0];
        return recipt.recipt;
    }

    selectRecipt(entity: Entity) {
        this.slot = entity;
        this.current_recipt = this.findRecipt(entity);
    }

}
