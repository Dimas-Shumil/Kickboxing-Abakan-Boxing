require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const databaseUrl = process.env.DATABASE_URL || '';

if (!databaseUrl.startsWith('file:')) process.exit(0);

const rawPath = databaseUrl.slice('file:'.length).split('?')[0];
if (!rawPath) process.exit(0);

const prismaDir = path.join(__dirname, '..', 'prisma');
const databasePath = path.isAbsolute(rawPath) ? rawPath : path.join(prismaDir, rawPath);

const databaseDir = path.dirname(databasePath);
fs.mkdirSync(databaseDir, { recursive: true });
fs.closeSync(fs.openSync(databasePath, 'a'));

if (process.platform !== 'win32') {
  fs.chmodSync(databaseDir, 0o700);
  fs.chmodSync(databasePath, 0o600);
}
