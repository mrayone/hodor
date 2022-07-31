declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      APP_PORT: number;
      APP_URL: string;
    }
  }
}

export {};
