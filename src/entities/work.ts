import { CommonJobComponent } from '../components/common_job';
import { JobComponent } from '../components/job';
import { LifedComponent } from '../components/lifed';
import { ProcessorComponent } from '../components/processor';
import { ReciptComponent } from '../components/recipt';
import { SlotComponent } from '../components/slot';
import { Entity } from '../lib/entity';
import { fundEntity } from './fund';

export class workEntity extends Entity {
    id = 'work';
    desc = 'work work';
    components = [
        new ProcessorComponent(
            [{
                mainMaterial: [JobComponent, CommonJobComponent],
                recipt: new ReciptComponent(
                    [
                        new SlotComponent(
                            [JobComponent, CommonJobComponent],
                        )
                    ],
                    10,
                    (entities: Entity[]) => {
                        return [entities[0], new fundEntity];
                    }
                ),
            }],
        ),
        new LifedComponent()
    ]
}
