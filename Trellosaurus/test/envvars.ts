import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env');
const envFile = fs.readFileSync(envPath, 'utf8');

// Convertir en objet JavaScript
export const envVars: Record<string, string> = envFile
  .split('\n')
  .filter(line => line.includes('='))
  .reduce((acc, line) => {
    const [key, value] = line.split('=');
    acc[key.trim()] = value.trim();
    return acc;
}, {} as Record<string, string>);
