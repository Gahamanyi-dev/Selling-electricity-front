import http from "../http-common";

class MeterDataService {
  getAll() {
    return http.get("/meters");
  }

  get(id) {
    return http.get(`/meters/${id}`);
  }

  create(data) {
    return http.post("/meters", data);
  }

  update(id, data) {
    console.log({id,data})
    return http.put(`/meters/${id}`, data);
  }

  delete(id) {
    return http.delete(`/meters/${id}`);
  }

  deleteAll() {
    return http.delete(`/meters`);
  }
  getByToken() {
    return http.delete(`/meters/token/`);
  }
}

export default new MeterDataService();