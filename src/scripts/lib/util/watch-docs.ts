import fs from 'fs/promises';

export async function* watch(filename: string) {
  const fileChangedTimes = new Map<string, number>();

  for await (const info of fs.watch(filename)) {
    const changedTime = fileChangedTimes.get(info.filename);
    const now = Date.now();

    if (!changedTime || now - changedTime > 1000) {
      fileChangedTimes.set(info.filename, now);
      continue;
    }
    
    yield info;
  }
}