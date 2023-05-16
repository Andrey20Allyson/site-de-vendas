import { ACTUAL_HREF, IS_DEV } from './utils/storage-keys';

export interface ReloaderOptions {
  isTest?: boolean;
}

export function startReloader(options: ReloaderOptions = {}) {
  const { isTest } = options;
  const eventSource = new EventSource('/events');

  sessionStorage.setItem(IS_DEV, 'true');

  let reloaded = false;
  eventSource.onmessage = (ev: MessageEvent<string>) => {
    const { data } = ev;

    const args = data.split(' ');

    if (args[0] === 'reload') {
      if (reloaded) return;
      reloaded = true;

      if (isTest) {
        location.reload();
        return;
      }
      
      sessionStorage.setItem(ACTUAL_HREF, location.pathname + location.search);

      if (location.pathname === '/') {
        location.reload()
      } else {
        location.href = '/'
      }
    }
  }
}
