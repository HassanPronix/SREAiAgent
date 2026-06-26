import { BackendLogModel } from '../models/backendLog.model.js';

class LogRepository {
  async create(payload: any) {
    return BackendLogModel.create(payload);
  }
}

export const logRepository = new LogRepository();
