import axios from "axios";

class PrometheusService {
    
  private baseUrl = process.env.PROMETHEUS_URL ||"http://localhost:9090";

  async query(query: string) {
    const response = await axios.get(
      `${this.baseUrl}/api/v1/query`,
      {
        params: { query },
      }
    );

    return response.data.data.result;
  }
}

export const prometheusService =
  new PrometheusService();