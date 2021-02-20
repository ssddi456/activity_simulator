import * as fs from 'fs-extra';
import * as path from 'path';
import * as _ from 'lodash';
import * as inquirer from 'inquirer';


const rootFolder = path.join(__dirname, '../src/');
const templateFolder = path.join(__dirname, './templates/');
function insertBefore(origin: string, delimiter: string, add: string) {
    const index = origin.indexOf(delimiter);
    return origin.slice(0, index) + add + origin.slice(index);
}

interface CreateOption {
    type: 'components' | 'systems' | 'entities',
    name: string,
    entity_type: 'default' | 'resource'
    need_new_component: boolean,
    formatedName: string,
    camelCaseName: string,
}

inquirer.prompt<CreateOption>([
    {
        name: 'type',
        type: 'list',
        message: 'choose type',
        choices: ['components', 'systems', 'entities']
    },
    {
        name: 'name',
        type: 'input',
        message: 'choose name',
        filter(name, answers) {
            if (fs.existsSync(path.join(rootFolder, answers.type, name + '.ts'))) {
                return false;
            }
            return name;
        }
    },
    {
        name: 'entity_type',
        options: ['default', 'resource'],
        message: 'which entity type you need?',
        when: (answers) => answers.type == 'entities',
    },
    {
        name: 'need_new_component',
        type: 'checkbox',
        message: 'should we create same name component?',
        when: (answers) => answers.type == 'systems'
    }
])
    .then((answers) => {
        const properties = {
            ...answers,
            formatedName: answers.name[0].toUpperCase() + _.camelCase(answers.name).slice(1),
            camelCaseName: _.camelCase(answers.name),
        };

        function createFileFromTemplate(properties: CreateOption) {
            if (properties.type == 'entities') {
                if (properties.entity_type != 'default') {
                    (properties as any).type = `${properties.type}_${properties.entity_type}`;
                }
            }
            fs.writeFileSync(path.join(rootFolder, properties.type, properties.name + '.ts'),
                _.template(fs.readFileSync(path.join(templateFolder, properties.type + '.ts'), 'utf8'))(properties)
            );
        }

        createFileFromTemplate(properties);

        if (properties.type == 'systems') {
            const defaultWorldFile = path.join(rootFolder, 'defaultWorld.ts');
            const importText = _.template(`import { <%= formatedName %>System } from './systems/<%= name %>';\n`)(properties);
            const useText = _.template(`world.addSystem(<%= formatedName %>System);\n`)(properties);
            const origin = fs.readFileSync(defaultWorldFile, 'utf8');
            const importDelimiter = '// </system-imports>';
            const useDelimiter = '// </system-list>';
            let modified = insertBefore(insertBefore(origin, importDelimiter, importText), useDelimiter, useText);
            fs.writeFileSync(defaultWorldFile, modified);

            if (properties.need_new_component) {
                createFileFromTemplate({ ...properties, type: 'components' });
            }
        }

    });
