// https://eslint.org/docs/user-guide/configuring
// https://github.com/standard/standard/blob/master/docs/RULES-en.md
let eslint =
{ root: true
, parser: 'babel-eslint'
, parserOptions:
  { sourceType: 'module'
  }
, env:
  { browser: true
  }
, extends: 'standard' // SEE: link at top of page
, plugins:
  [ 'html' // Required to lint *.vue files
  ]
, 'rules':
  { 'arrow-parens': 0 // Allow paren-less arrow functions
  , 'brace-style': ['error', 'stroustrup']
  , 'comma-style': [1, 'first'] // Require commas at the begining of declarations
  , 'generator-star-spacing': 0 // Allow async-await
  , 'indent': 'off' // Turn off for formatting arrays and objects the way we want
  , 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0 // Allow debugger during development
  , 'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }] // Using 2 empty lines can meaningfully break up blocks of code
  }
}

module.exports = eslint
