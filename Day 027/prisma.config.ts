import { defineConfig } from '@prisma/config';

export default defineConfig({
  // @ts-ignore: Suppressing experimental config type error
  migrate: {
    url: process.env.DIRECT_URL,
  },
});