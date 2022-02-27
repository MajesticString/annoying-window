import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.js'],
  format: ['cjs'],
  clean: true,
  dts: false,
  bundle: false,
  target: 'esnext',
  skipNodeModulesBundle: true,
});
