import '.';
import { ACTUAL_HREF, IS_DEV } from './utils/storage-keys';

const eventSource = new EventSource('/events');

sessionStorage.setItem(IS_DEV, 'true');

let reloaded = false;
eventSource.onmessage = (ev: MessageEvent<string>) => {
  const { data } = ev;

  const args = data.split(' ');

  if (args[0] === 'reload') {
    if (reloaded) return;
    reloaded = true;

    sessionStorage.setItem(ACTUAL_HREF, location.pathname);

    if (location.pathname === '/') {
      location.reload()  
    } else {
      location.href = '/'
    }
  }
}