// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.sourceExts.push('svg');
module.exports = defaultConfig;
