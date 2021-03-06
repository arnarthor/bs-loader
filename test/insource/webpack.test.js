const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const output = path.join(__dirname, 'output/webpack')
const loader = path.join(__dirname, '../')

const baseConfig = {
  entry: path.join(__dirname, 'fixtures/fib.ml'),
  module: {
    rules: [
      {
        test: /\.(re|ml)$/,
        use: {
          loader,
          options: {
            module: 'es6',
            inSource: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.re', '.ml', '.js'],
  },
  output: {
    path: output,
    libraryTarget: 'commonjs2',
  },
}

it('runs', done => {
  webpack(baseConfig, err => {
    expect(err).toBeNull()

    fs.readdir(output, (err, files) => {
      expect(err).toBeNull()
      expect(files.length).toBe(1)
      const result = require(path.resolve(output, files[0]))
      expect(result.fib(12)).toBe(233)

      done()
    })
  })
})
