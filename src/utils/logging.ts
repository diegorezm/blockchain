export const LOGGING = {
  debug: (message: string) => {
    console.log(`\x1b[36mDEBUG: ${message}\x1b[0m`);
  },
  info: (message: string) => {
    console.log(`\x1b[34mINFO: ${message}\x1b[0m`);
  },
  success: (message: string) => {
    console.log(`\x1b[32mSUCCESS: ${message}\x1b[0m`);
  },
  error: (message: string) => {
    console.log(`\x1b[31mERROR: ${message}\x1b[0m`);
  },
};
