import * as fs from 'fs-extra';
import * as path from 'path';
import * as _ from 'lodash';
import * as inquirer from 'inquirer';


const rootFolder = path.join(__dirname, '../src/');
const templateFolder = path.join(__dirname, './templates/');
function insertBefore( origin: string, delimiter: string, add: string) {
    const index = origin.indexOf(delimiter);
    return origin.slice(0, index) + add + origin.slice(index);
}
inquirer.prompt<{ type: 'components' | 'systems' | 'entities', name: string }>([
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
])
    .then((answers) => {
        const properties = {
            ...answers,
            formatedName: answers.name[0].toUpperCase() + _.camelCase(answers.name).slice(1),
            camelCaseName: _.camelCase(answers.name),
        };
        fs.writeFileSync(path.join(rootFolder, answers.type, answers.name + '.ts'),
            _.template(fs.readFileSync(path.join(templateFolder, answers.type + '.ts'), 'utf8'))(properties)
        );

        if (properties.type == 'systems') {
            const defaultWorldFile  = path.join(rootFolder, 'defaultWorld.ts');
            const importText = _.template(`import { <%= formatedName %>System } from './systems/<%= name %>';\n`)(properties);
            const useText = _.template(`world.addSystem(<%= formatedName %>System);\n`)(properties);
            const origin = fs.readFileSync(defaultWorldFile, 'utf8');
            const importDelimiter = '// </system-imports>';
            const useDelimiter = '// </system-list>';
            let modified  = insertBefore(insertBefore(origin, importDelimiter, importText), useDelimiter, useText);
            fs.writeFileSync(defaultWorldFile, modified);
        }

    });
