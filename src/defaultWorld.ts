import { World } from './lib/world';
// <system-import>
import { DeadSystem } from './systems/dead';
import { LifedSystem } from './systems/lifed';
import { SlotSystem } from './systems/slot';
// </system-imports>

const world = new World();
// <system-list>
world.addSystem(LifedSystem);
world.addSystem(SlotSystem);
world.addSystem(DeadSystem);
// </system-list>


export default world;
