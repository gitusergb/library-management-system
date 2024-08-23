const role = (allowedRoles) => {
  return (req, res, next) => {
    console.log('Allowed roles:', allowedRoles);
    console.log('User role:',req.body.role);

    if (!allowedRoles.includes(req.body.role)) {
      return res.status(403).json({ msg: 'Access denied. You do not have the required role.' });
    }

    next();
  };
};

module.exports = { role };
