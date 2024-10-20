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

  async updateImpression(id) {
    return await api.post(`/ads/${id}/impressions`);
  }

  async updateClicks(id) {
    return await api.post(`/ads/${id}/clicks`);
  }
}

export default new AdvertiseService();
