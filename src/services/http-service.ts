import type { ApiResponse } from '../models';
import { apiResponse } from '../constants';

export class HttpService {
  private static instance: HttpService;
  private constructor() { }

  public static getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  getAll(timeout = 2000): Promise<ApiResponse> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(apiResponse);
      }, timeout);
    })

  }
}
