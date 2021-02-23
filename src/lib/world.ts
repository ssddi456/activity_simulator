// ecs pattern

import { Entity } from './entity';
import { System } from './system';

export class World {
    systems: System[] = [];
    entities: Entity[] = [];

    running: boolean = false;
    interval = 1000 / 24;

    startTime = 0;
    nowTime = 0;
    lastRunTime = 0;
    pastTime = 0;

    addSystem(system: System) {
        this.systems.push(system);
    }

    addEntity(entity: Entity | Entity[], replace?: Entity) {
        const entities = Array.isArray(entity) ? entity : [entity];
        if (replace) {
            this.entities.splice(this.entities.indexOf(replace), 1, ...entities);
        } else {
            this.entities.push(...entities);
        }
    }

    removeEntity(entity: Entity) {
        this.entities.splice(this.entities.indexOf(entity), 1,);
    }

    update() {
        for (let i = 0; i < this.systems.length; i++) {
            const system = this.systems[i];
            const entities = system.filter(this.entities);
            system.update(entities, this);
        }
    }

    start() {
        if (!this.startTime) {
            this.startTime = Date.now();
        }
        this.nowTime = Date.now();
        this.running = true;
        this.update();
        const tick = () => {
            if (this.running) {
                this.update();
                setTimeout(tick, this.interval);
                this.pastTime += this.nowTime - this.lastRunTime;
                this.lastRunTime = this.nowTime;
            }
        }
        tick();
    }

    pause() {
        this.running = false;
    }
    resume() {
        this.lastRunTime = Date.now();
        this.start();
    }
    stop() {
        this.running = false;
    }
    save() {

    }
    load() {

    }
}
