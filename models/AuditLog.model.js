
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., "BORROW_BOOK", "RETURN_BOOK"
  details: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const AuditM = mongoose.model('AuditLog', auditLogSchema);

module.exports = {AuditM};
