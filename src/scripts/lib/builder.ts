import { build, BuildOptions, context } from 'esbuild';
import path from 'path';

export const CLIENT_SOURCE_DIR = path.join(process.cwd(), 'src/client/');
export const OUT_DIR = path.join(process.cwd(), 'public/');
export const DEV_OUT_DIR = path.join(process.cwd(), 'dev/');

export const ENTRY_POINT = path.join(CLIENT_SOURCE_DIR, 'index.tsx');
export const DEV_ENTRY_POINT = path.join(CLIENT_SOURCE_DIR, 'dev.ts');
export const NOT_FOUND_ENTRY_POINT = path.join(CLIENT_SOURCE_DIR, '404.ts');

export const TSCONFIG_FILE = path.join(CLIENT_SOURCE_DIR, 'tsconfig.json');

export function createBuildOptions<T extends BuildOptions>(opitons: T): T {
  return opitons;
}

export const bundleOptions = createBuildOptions({
  entryPoints: [
    ENTRY_POINT,
    NOT_FOUND_ENTRY_POINT,
  ],
  minify: true,
  bundle: true,
  metafile: true,
  outdir: OUT_DIR,
  tsconfig: TSCONFIG_FILE,
  loader: {
    '.jpeg': 'file',
    '.jpg': 'file',
    '.png': 'file',
    '.ico': 'file',
    '.ttf': 'file',
  }
});

export const devBundleOptions = createBuildOptions({
  ...bundleOptions,
  minify: false,
  sourcemap: true,
  outdir: DEV_OUT_DIR,
  entryPoints: [
    DEV_ENTRY_POINT,
    NOT_FOUND_ENTRY_POINT,
  ],
});

export async function bundle() {
  return build(bundleOptions);
}

export async function startDevBundle() {
  const ctx = await context(devBundleOptions);

  await ctx.watch();
}