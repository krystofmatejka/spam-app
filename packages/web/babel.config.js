const presets = {
  web: [
    'next/babel'
  ]
}

const plugins = [
  'transform-class-properties',
  [
    'babel-plugin-styled-components',
    {
      preprocess: false
    }
  ],
  'babel-plugin-idx'
]

const production = {
  presets: [
    ...presets.web,
    [
      '@babel/env',
      {
        targets: {
          'node': '10'
        }
      }
    ]
  ],
  plugins
}

module.exports = {
  env: {
    development: {
      presets: presets.web,
      plugins
    },
    nightly: production,
    production: production,
    test: {}
  }
}
