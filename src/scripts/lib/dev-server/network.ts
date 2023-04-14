import { networkInterfaces } from 'node:os';

export function getFirstExternalIP() {
  return Object.values(networkInterfaces()).find(v => !v?.[1].internal)?.[1].address;
}