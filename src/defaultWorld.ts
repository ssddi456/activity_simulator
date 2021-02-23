import { World } from './lib/world';
// <system-import>
import { DeadSystem } from './systems/dead';
import { LifedSystem } from './systems/lifed';
import { ProcessorSystem } from './systems/processor';
import { LifedEndSystem } from './systems/lifed_end';
// </system-imports>

const world = new World();
// <system-list>
world.addSystem(LifedSystem);
world.addSystem(ProcessorSystem);
world.addSystem(LifedEndSystem);
world.addSystem(DeadSystem);
// </system-list>


export default world;
