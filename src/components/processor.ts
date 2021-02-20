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
            mainMaterial: ifComponent[] | ifComponent[][],
            recipt: ReciptComponent
        }[] = [],
        public slot: Entity,
    ) {
        super();
    }

}
