/**
 * Pool System
 */

import { Component } from '../lib/component';
import { Entity } from '../lib/entity';

@Component.create('pool')
export class PoolComponent extends Component {
    constructor(
        public pool: Entity[] = [],
        public picked: Entity[] = [],
        public always: Entity,
    ) {
        super();
    }
}
