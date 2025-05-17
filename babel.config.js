module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@utils': './src/utils',
          '@common': './src/common',
          //'@constants': './src/constants',
          '@screens': './src/screens',
          //'@hooks': './src/hooks',
          '@context': './src/context',
          '@navigation': './src/navigation',
          '@Auth': './src/Auth',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
