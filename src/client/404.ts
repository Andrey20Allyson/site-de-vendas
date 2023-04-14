import { REDIRECT_PATH } from './utils/storage-keys';

const path = location.pathname;
sessionStorage.setItem(REDIRECT_PATH, path);
location.assign('/');