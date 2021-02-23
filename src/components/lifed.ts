import { Component } from '../lib/component';
import { Entity } from '../lib/entity';
import { DeadComponent } from './dead';

@Component.create('lifed')
export class LifedComponent extends Component {
    constructor(
        public maxAge = 60,
        public currentAge = 0,
        /** 是否计数 */
        public running = true,
        /** after dead */
        public transformTo: Entity | Entity[] | ((self: Entity) => Entity | Entity[]) = ((self) => (self.addComponent(new DeadComponent), self)),
        /** if should reset this lifed timer*/
        public reset = false,
    ) {
        super();
    }
}
