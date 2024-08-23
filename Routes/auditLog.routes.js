const express = require('express');
const auditRouter = express.Router();
const auditLogController = require('../controllers/auditLogController');

// Route to get all audit logs
auditRouter.get('/', auditLogController.getAllAuditLogs);
// Route to filter audit logs by some criteria
auditRouter.get('/filter', auditLogController.filterAuditLogs);
// Route to get a specific audit log by ID
auditRouter.get('/:id', auditLogController.getAuditLogById);


module.exports = {auditRouter};