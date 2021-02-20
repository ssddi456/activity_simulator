import { Component, ifComponent } from '../lib/component';
import { Entity } from '../lib/entity';

@Component.create('slot')
export class SlotComponent extends Component {
    constructor(
        public accept: ifComponent[],
        public current?: Entity,
        public optional: boolean = false,
    ) {
        super();
    }

    canPut(entity: Entity) {
        return entity.withComponents(this.accept);
    }

    fulFilled() {
        return this.optional ? true : !!this.current;
    }
}
