import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'es.marynotebook.app',
  appName: 'Mary Memories',
  webDir: 'www',
  server: {
    url: 'https://marymemories.es',
    cleartext: false
  }
};

export default config;
