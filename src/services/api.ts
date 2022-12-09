import axios, { AxiosInstance } from "axios";

export class Api {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3002",
    });
  }

  async get(path: string, params?: Record<string, string | number>) {
    const { data } = await this.api.get(path, { params });
    return data
  }

  async post(path: string, body: Record<string, string | any>) {
    return await this.api.post(path, body);
  }

  async put(path: string, body: Record<string, string | any>) {
    return await this.api.put(path, body);
  }

  async delete(path: string) {
    return await this.api.delete(path);
  }
}
