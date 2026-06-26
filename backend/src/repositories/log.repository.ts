import { LogModel } from '../models/log.model.js';

class LogRepository {
  async create(payload: any) {
    return LogModel.create(payload);
  }
}

export const logRepository = new LogRepository();
