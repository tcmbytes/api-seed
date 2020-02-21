module.exports = {
  displayName: 'unit',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test/reports/unit',
        filename: 'index.html',
        expand: true,
        theme: 'darkTheme'
      }
    ]
  ]
}
