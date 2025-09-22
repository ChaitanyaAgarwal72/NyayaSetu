// NyayaSetu Configuration
const CONFIG = {
    // Backend API Configuration
    API_BASE_URL: 'http://localhost:3000',
    CHATBOT_API_BASE_URL: 'http://localhost:5000',
    API_ENDPOINTS: {
        CASES: '/nyayasetu/api/cases/',
        CLIENTS: '/nyayasetu/api/clients',
        HEARINGS: '/nyayasetu/api/hearings/',
        HEARINGS_ADD: '/nyayasetu/api/hearings/add',
        RAG_QUERY: '/nyayasetu/api/rag/query',
        LOGIN: '/nyayasetu/api/admin/login',
        GET_SUMMARY: '/nyayasetu/summary/getSummary'
    },
    
    // Storage Configuration
    STORAGE_KEYS: {
        AUTH_TOKEN: 'nyayasetu_token',
        USER_DATA: 'nyayasetu_user',
        CHAT_MESSAGES: 'nyayasetu_chat_messages',
        SELECTED_CASE: 'nyayasetu_selected_case'
    },
    
    // App Configuration
    APP_NAME: 'NyayaSetu',
    CHATBOT_NAME: 'Sevak',
    MAX_CHAT_HISTORY: 50,
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    
    // UI Configuration
    DEFAULT_CASE_VALUE: '1',
    NOTIFICATION_DURATION: 3000,
    TYPING_DELAY: 1500
};

// Export for use in other files
window.CONFIG = CONFIG;