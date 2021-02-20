/**
 * Choice System
 */

import { Component } from '../lib/component';
import { Entity } from '../lib/entity';

@Component.create('choice')
export class ChoiceComponent extends Component {
    constructor(
        public choices: Entity[] = [],
        public chooseFromCount = 3,
        public canChooseCount = 1,
    ) {
        super();
    }
}
