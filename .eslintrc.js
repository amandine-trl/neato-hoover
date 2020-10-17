module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'vue/no-multiple-template-root':'off',
        'no-console': 'warn',
        'no-debugger': 'warn',
        'vue/no-unused-vars': 'warn',
        'no-unused-vars': 'warn',
        'vue/require-v-for-key': 'warn',
        'vue/no-use-v-if-with-v-for': 'warn',
        "semi": "warn"
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
