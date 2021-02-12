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
        public transformTo: Component | Component[] | ((self: Entity) => Entity) = new DeadComponent(),
        /** if should remove this component */
        public remove = false,
        /** if should reset this lifed timer*/
        public reset = false,
    ) {
        super();
    }
}
