
const borrowService = require('../services/borrowService');
const auditLogService = require('../services/auditLogService');

class DependencyInjector {
  static init() {
    return {
      borrowService,
      auditLogService,
    };
  }
}

module.exports = DependencyInjector;
