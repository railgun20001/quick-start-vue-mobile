module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/strongly-recommended',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "indent": ["error", 4],
        "vue/script-indent": ["error", 4],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "closeBracket": 0,
            "alignAttributesVertically": false,
            "ignores": []
        }],
        "vue/order-in-components": ["error", {
            "order": [
                "el",
                "name",
                "parent",
                "functional",
                ["delimiters", "comments"],
                ["components", "directives", "filters"],
                "extends",
                "mixins",
                "inheritAttrs",
                "model",
                ["props", "propsData"],
                "data",
                "computed",
                "watch",
                "LIFECYCLE_HOOKS",
                "methods",
                ["template", "render"],
                "renderError"
            ]
        }],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "never",
                "normal": "never",
                "component": "never"
            },
            "svg": "never",
            "math": "never"
        }],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}