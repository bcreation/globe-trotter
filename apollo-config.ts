module.exports = {
  client: {
    service: {
      name: 'globe-trotter',
      // URL to the GraphQL API
      url: 'https://countries.trevorblades.com',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.ts'
    ],
  },
}