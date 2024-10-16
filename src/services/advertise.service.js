import api from "./api.service";

class AdvertiseService {
  async getAllAdverstise() {
    return await api.get("/ads/get-all");
  }

  async getTrendingAdverstise() {
    return await api.get("/ads/trending");
  }

  async getAdvertiseById(id) {
    return await api.get(`/ads/${id}`);
  }
}

export default new AdvertiseService();
