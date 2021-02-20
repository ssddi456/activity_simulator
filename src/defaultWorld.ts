import { World } from './lib/world';
// <system-import>
import { DeadSystem } from './systems/dead';
import { LifedSystem } from './systems/lifed';
import { SlotSystem } from './systems/slot';
import { ProcessorSystem } from './systems/processor';
// </system-imports>

const world = new World();
// <system-list>
world.addSystem(LifedSystem);
world.addSystem(SlotSystem);
world.addSystem(DeadSystem);
world.addSystem(ProcessorSystem);
// </system-list>


export default world;
