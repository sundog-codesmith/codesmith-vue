'use strict';

function notEmpty(name) {
    return v => {
        if (!v || v.trim === '') {
            return `${name} is required`
        } else {
            return true
        }
    }
}

module.exports = function (codesmith) {
    codesmith, setGenerator('component', {
        description: 'generate a component',
        questions: [{
            type: 'input',
            name: 'name',
            message: 'vue component name please',
            validate: notEmpty('name')
        },
        {
            type: 'directory',
            name: 'basePath',
            message: 'Where you like to put this component?',
            basePath: ".",
        },
        {
            type: 'checkbox',
            name: 'blocks',
            message: 'Blocks:',
            choices: [{
                name: '<template>',
                value: 'template',
                checked: true
            },
            {
                name: '<script>',
                value: 'script',
                checked: true
            },
            {
                name: 'style',
                value: 'style',
                checked: true
            }
            ],
            validate(value) {
                if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
                    return 'View require at least a <script> or <template> tag.'
                }
                return true
            }
        }
        ],
        actions: [
            data => {
                const name = '{{name}}'
                const actions = [{
                    type: 'add',
                    path: `{{basePath}}/${name}/index.vue`,
                    templateFile: 'generators/component/component.vue',
                    data: {
                        name: name,
                        template: data.blocks.includes('template'),
                        script: data.blocks.includes('script'),
                        style: data.blocks.includes('style')
                    }
                }]
                return actions
            }, 
        ]
    });
    codesmith.setGenerator('functional-component-ts', {
        description: 'Add a new functional component(ts)',
        questions: [
            {
                type: 'directory',
                name: 'basePath',
                message: 'Where you like to put this component?',
                basePath: ".",
            },
            {
                type: 'input',
                name: 'name',
                message: "What's your component class name?"
            }
        ],
        actions: [
            {
                type: 'add',
                path: '{{basePath}}/{{dashCase name}}.tsx',
                templateFile: 'generators/functional-component-ts/templates/component.tsx',
                abortOnFail: true
            }
        ]
    });
};
