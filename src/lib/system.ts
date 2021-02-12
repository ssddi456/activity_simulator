/**
 * basic system 
 */

import { Entity } from './entity';
import { World } from './world';

export interface System {
    filter(entities: Entity[]): Entity[];
    update(entities: Entity[], world: World): void;
}
