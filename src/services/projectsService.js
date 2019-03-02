import http from "./httpService";
import { apiUrl } from "../config.json";

export function getProjects() {
  return http.get(`${apiUrl}projects`);
}


export function getProjectsDetails(id) {

  return http.get(`${apiUrl}projects/${id}`);
}

export function saveProject(data) {
  return http.post(`${apiUrl}projects`, data)
}

export function updateProject(data) {
  return http.put(`${apiUrl}projects/${data.id}`, data)
}


