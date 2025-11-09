// Centralise la configuration de ton backend API
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:9090/api/v1";
export default API_BASE_URL;