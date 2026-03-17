import 'next/dist/server/config-shared';

declare module 'next/dist/server/config-shared' {
  interface ExperimentalConfig {
    /**
     * Temporary development helper documented in Next.js docs to allow any dev origin.
     */
    allowedDevOrigins?: string[];
  }
}
