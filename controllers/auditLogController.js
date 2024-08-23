const {AuditM} = require('../models/AuditLog.model'); 

// Controller to get all audit logs
const getAllAuditLogs = async (req, res) => {
    try {
        const logs = await AuditM.find(); // Retrieve all audit logs from the database
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving audit logs', error });
    }
};

// Controller to filter audit logs based on criteria
const filterAuditLogs = async (req, res) => {
    const { userId, action, dateRange } = req.query; // Example filtering criteria

    try {
        const query = {};

        // Add filtering conditions based on request query
        if (userId) query.userId = userId;
        if (action) query.action = action;
        if (dateRange) query.date = { $gte: dateRange.start, $lte: dateRange.end };

        const logs = await AuditM.find(query);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering audit logs', error });
    }
};

// Controller to get a specific audit log by ID
const getAuditLogById = async (req, res) => {
    const { id } = req.params;

    try {
        const log = await AuditM.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Audit log not found' });
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving audit log', error });
    }
};

module.exports = {
    getAllAuditLogs,
    filterAuditLogs,
    getAuditLogById,
};
