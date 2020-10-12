import axios, { AxiosResponse } from 'axios'
import Request from '@/model/request'

class ApiAdapter {
  async get<T = any>(endpoint: string, request: Request): Promise<AxiosResponse<T>> {
    const params = request.toSendParams()
    return axios.get(endpoint, params);
  }
  async post<T = any>(endpoint: string, request: Request): Promise<AxiosResponse<T>> {
    const params = request.toSendParams()
    return axios.post(endpoint, params);
  }
}

export default new ApiAdapter() 