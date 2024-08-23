
const AuditLog = require('../models/AuditLog.model');

class AuditLogService {
  async logAction(user, action, details = '') {
    const auditLog = new AuditLog({
      user,
      action,
      details,
    });
    await auditLog.save();
  }

  async getAuditLogs(filters) {
    const query = {};

    if (filters.user) query.user = filters.user;
    if (filters.action) query.action = filters.action;
    if (filters.startDate || filters.endDate) {
      query.timestamp = {};
      if (filters.startDate) query.timestamp.$gte = filters.startDate;
      if (filters.endDate) query.timestamp.$lte = filters.endDate;
    }

    return await AuditLog.find(query).populate('user');
  }
}

module.exports = new AuditLogService();
