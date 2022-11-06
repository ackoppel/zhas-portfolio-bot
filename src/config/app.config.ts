import { DatabaseConfig } from './database/database.config';

export const appConfig = () => ({
  app: {
    port: parseInt(process.env.PORT),
    basePath: process.env.BASE_PATH,
    password: process.env.PASSWORD,
  },
  bot: {
    api_url: process.env.BOT_API_URL,
    token: process.env.TOKEN,
    send_base_commands: process.env.SEND_BASE_COMMANDS === 'true',
    send_webhook: process.env.SEND_WEBHOOK === 'true',
  },
  bullBoard: {
    username: process.env.BULL_USERNAME,
    password: process.env.BULL_PASSWORD,
  },

  ...DatabaseConfig.getConfig(),
});
