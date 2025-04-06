// import axios from "axios";
// import { showToastError } from "@/utils/toast";
// import router from "next/router"; // ou "next/navigation" se estiver usando app router

// const api = axios.create({
//   baseURL: "http://localhost:3000",
// });

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status === 401) {
//         // Token expirado ou inválido
//         showToastError("Sessão expirada. Faça login novamente.");

//         localStorage.removeItem("access_token"); // limpar token
//         router.push("/login"); // redirecionar
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
