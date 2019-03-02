import http from "./httpService";
import { apiUrl } from "../config.json";

export function getEmployees() {
  return http.get(`${apiUrl}employees`);
}

export function saveEmployee(data) {
  return http.post(`${apiUrl}employees`, data)
}

export function updateEmployee(data) {
  return http.put(`${apiUrl}employees/${data.id}`, data)
}
