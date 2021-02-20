import { FundComponent } from '../components/fund';
import { ResourceComponent } from '../components/resource';
import { Entity } from '../lib/entity';

export class fundEntity extends Entity {
    id = 'fund';
    components = [
        new ResourceComponent,
        new FundComponent,
    ]
}
