import PocketBase from 'pocketbase';

const addr = '127.0.0.1';
const port = '8090';
const db = new PocketBase(`http://${addr}:${port}`);

export { db };