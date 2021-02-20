import { JobComponent } from '../components/job';
import { ProcessorComponent } from '../components/processor';
import { ReciptComponent } from '../components/recipt';
import { SlotComponent } from '../components/slot';
import { Entity } from '../lib/entity';
import { fundEntity } from './fund';

export class workEntity extends Entity {
    id = 'work';
    components = [
        new ProcessorComponent(
            [{
                mainMaterial: [JobComponent],
                recipt: new ReciptComponent(
                    [
                        new SlotComponent(
                            [JobComponent],
                        )
                    ],
                    10,
                    (entities: Entity[]) => {
                        return [entities[0], new fundEntity];
                    }
                ),
            }],
            undefined,
        )
    ]
}
