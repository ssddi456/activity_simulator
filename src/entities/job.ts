/**
 * Job entity
 */

import { CommonJobComponent } from '../components/common_job';
import { JobComponent } from '../components/job';
import { Entity } from '../lib/entity';

export class JobEntity extends Entity {
    id = 'job';
    desc = 'a common job';
    components = [
        new JobComponent,
        new CommonJobComponent,
    ]
}
