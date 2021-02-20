/**
 * <%= formatedName %> entity
 */

import { <%= formatedName %>Component } from '../components/<%= name %>';
import { ResourceComponent } from '../components/resource';

import { Entity } from '../lib/entity';

export class <%= formatedName %>Entity extends Entity {
    id = '<%= name %>';
    components = [
        new <%= formatedName %>Component,
        new ResourceComponent
    ]
}
