import { Component, ComponentConstructor } from '../lib/component';
import { Entity } from '../lib/entity';

@Component.create('slot')
export class SlotComponent extends Component {
    constructor(
        public accept: ComponentConstructor, 
        public current: Entity
    ) {
        super();
    }
}
