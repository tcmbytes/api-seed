module.exports = {
  displayName: 'unit',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['jest-date-mock'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test/reports/unit',
        filename: 'index.html',
        expand: true,
        theme: 'darkTheme',
      },
    ],
  ],
}
