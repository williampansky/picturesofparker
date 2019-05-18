/**
 * @namespace ESLint
 * @see [Github]{@link https://github.com/vuejs/eslint-plugin-vue/tree/v4.7.1}
 */
module.exports = {
 root: true,

 env: {
     node: true
 },

 'extends': [
     'plugin:vue/essential',
     '@vue/standard'
 ],

 rules: {
     /**
      * @summary Control errors revolving around the use of curly braces.
      * @method curly
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/curly}
      */
     'curly': ['error', 'multi-or-nest', 'consistent'],


     /**
      * @summary This rule enforces consistent use of
      * trailing commas in object and array literals.
      * @method comma-dangle
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/comma-dangle#rule-details}
      */
     'comma-dangle': 'off',


     /**
      * @summary This rule enforces a consistent indentation style.
      * @method indent
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/indent}
      */
     'indent': ['error', 4],


     /**
      * @summary This rule enforces consistent spacing between keys and
      * values in object literal properties. In the case of long lines,
      * it is acceptable to add a new line wherever whitespace is allowed.
      * @method key-spacing
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/key-spacing}
      */
     'key-spacing': ['error', {
         // align: 'value',
         mode: 'minimum'
     }],


     /**
      * @summary This rule disallows calls to methods of the console object.
      * @method no-console
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/no-console}
      */
     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',


     /**
      * @summary This rule disallows debugger statements.
      * @method no-debugger
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/no-debugger}
      */
     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',


     /**
      * @summary This rule aims to reduce the scrolling required
      * when reading through your code. It will warn when the
      * maximum amount of empty lines has been exceeded.
      * @method no-multiple-empty-lines
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/no-multiple-empty-lines}
      */
     'no-multiple-empty-lines': 'off',


     /**
      * @summary This rule aims to disallow multiple whitespace around
      * logical expressions, conditional expressions, declarations,
      * array elements, object properties, sequences & function parameters.
      * @method no-multi-spaces
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/no-multi-spaces}
      */
     'no-multi-spaces': ['error', { exceptions: {
         'ImportDeclaration': true,
         'VariableDeclarator': true,
     }}],


     /**
      * @summary This rule disallows trailing whitespace (spaces, tabs,
      * and other Unicode whitespace characters) at the end of lines.
      * @method no-trailing-spaces
      * @memberof ESLint
      * @see [Docs]{@link https://eslint.org/docs/rules/no-trailing-spaces}
      */
     'no-trailing-spaces': ['error', {
         'skipBlankLines': true,
         'ignoreComments': true
     }],


     /**
      * @summary This rule enforces consistent use of semicolons.
      * @method semi
      * @memberof ESLint
      * @see [Github]{@link https://eslint.org/docs/rules/semi#rule-details}
      */
     'semi': [2, 'always'],


     /**
      * @summary This rule aims to enforce consistent spacing before
      * function parentheses and as such, will warn whenever whitespace
      * doesn’t match the preferences specified.
      * @method space-before-function-paren
      * @memberof ESLint
      * @see [Github]{@link https://eslint.org/docs/rules/space-before-function-paren#rule-details}
      */
     'space-before-function-paren': ['error', 'never'],


     /**
      * @summary Require or disallow spaces before/after unary operators.
      * @method space-unary-ops
      * @memberof ESLint
      * @see [Github]{@link https://eslint.org/docs/rules/space-unary-ops}
      */
     'space-unary-ops': [
         2, {
           "words": true,
           "nonwords": false,
           "overrides": {
             "typeof": false
           }
     }],


     /**
      * @summary This rule enforces consistent spacing style
      * before closing brackets `>` of tags.
      * @method vue/html-closing-bracket-spacing
      * @memberof ESLint
      * @see [Github]{@link https://github.com/vuejs/eslint-plugin-vue/blob/v4.7.1/docs/rules/html-closing-bracket-spacing.md}
      */
     'vue/html-closing-bracket-spacing': ['error', {
         'startTag': 'never',
         'endTag': 'never',
         'selfClosingTag': 'always'
     }],


     /**
      * @summary This rule enforces the quotes style of HTML attributes.
      * @method vue/html-quotes
      * @memberof ESLint
      * @see [Github]{@link https://github.com/vuejs/eslint-plugin-vue/blob/v4.7.1/docs/rules/html-quotes.md}
      */
     'vue/html-quotes': ['error', 'double'],


     /**
      * @summary This rule enforces a consistent
      * indentation style in `<template>` tags.
      * @method vue/html-indent
      * @memberof ESLint
      * @see [Github]{@link https://github.com/vuejs/eslint-plugin-vue/blob/v4.7.1/docs/rules/html-indent.md}
      */
     'vue/html-indent': ['error', 4, {
         'attribute': 0,
         'closeBracket': 0,
         'alignAttributesVertically': true,
         'ignores': []
     }],


     /**
      * @summary Limits the maximum number of attributes/properties
      * per line to improve readability.
      * @method vue/max-attributes-per-line
      * @memberof ESLint
      * @see [Github]{@link https://github.com/vuejs/eslint-plugin-vue/blob/v4.7.1/docs/rules/max-attributes-per-line.md}
      */
     'vue/max-attributes-per-line': [2, {
         'singleline': 1,
         'multiline': {
             'max': 1,
             'allowFirstLine': false
         }
     }],


     /**
      * @summary Attribute sorted order enforcement.
      * @method vue/attribute-order
      * @memberof ESLint
      * @see [Github]{@link https://github.com/vuejs/eslint-plugin-vue/blob/v4.7.1/docs/rules/attributes-order.md}
      */
     'vue/attributes-order': [2, {
         order: [
             'DEFINITION',
             'LIST_RENDERING',
             'CONDITIONALS',
             'RENDER_MODIFIERS',
             'GLOBAL',
             'UNIQUE',
             'BINDING',
             'OTHER_ATTR',
             'EVENTS',
             'CONTENT',
         ]
     }]
 },

 overrides: [
     {
         /**
          * For VUE files only, turn off the core indent rule and enable the vue/script-indent rule
          * This avoids complications with eslint running in code editors.
          */
         files: ['*.vue'],
         rules: {
             'indent': 'off',
             /**
              * @summary This rule is similar to core indent rule,
              * but it has an option for inside of `<script>` tag.
              * @method vue/script-indent
              * @memberof ESLint
              * @see [Github]{@link https://github.com/vuejs/eslint-plugin-vue/blob/v4.7.1/docs/rules/script-`indent`.md}
              */
             'vue/script-indent': ['error', 4, {
                 'baseIndent': 0,
                 'switchCase': 1,
                 'ignores': []
             }],
         }
     }
 ],

 parserOptions: {
     parser: 'babel-eslint'
 },

 globals: {
   UIkit: true
 }
};
