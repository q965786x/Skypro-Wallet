
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import axios from "axios";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>      
);

// Убираем старые перехватчики и ставим новые
axios.interceptors.request.use(request => {
  console.log('🔄 Запрос:', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data
  });
  return request;
});

axios.interceptors.response.use(response => {
  console.log('✅ Ответ:', {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    data: response.data
  });
  return response;
}, error => {
  console.error('❌ Ошибка ответа:', {
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    message: error.message,
    config: error.config
  });
  return Promise.reject(error);
});

// Добавляем обработку CORS если нужно
axios.defaults.headers.common['Accept'] = 'application/json';