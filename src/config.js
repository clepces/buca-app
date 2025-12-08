/**
 * Central Configuration
 * All hardcoded values, API URLs, and environment specific settings should be accessed from here.
 */

const config = {
    api: {
        createBusinessUser: import.meta.env.VITE_API_CREATE_BUSINESS_USER || "https://us-central1-buca-scdbs.cloudfunctions.net/createBusinessUser",
        createBusinessAndOwner: import.meta.env.VITE_API_CREATE_BUSINESS_OWNER || "https://us-central1-buca-scdbs.cloudfunctions.net/createBusinessAndOwner",
        exchangeRateCurrent: import.meta.env.VITE_API_EXCHANGE_RATE_CURRENT || 'https://api.dolarvzla.com/public/exchange-rate',
        exchangeRateHistory: import.meta.env.VITE_API_EXCHANGE_RATE_HISTORY || 'https://api.dolarvzla.com/public/exchange-rate/list',
    },
    logging: {
        level: import.meta.env.MODE === 'development' ? 'debug' : 'error', // 'debug', 'info', 'warn', 'error'
    }
};

export default config;
