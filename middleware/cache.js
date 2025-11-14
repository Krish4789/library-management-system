const cacheService = require('../services/cache-service');

const cacheMiddleware = (keyGenerator, ttl = 3600) => {
  return async (req, res, next) => {
    try {
      const key = typeof keyGenerator === 'function' ? keyGenerator(req) : keyGenerator;
      const cached = await cacheService.get(key);
      
      if (cached) {
        return res.json(cached);
      }

      const originalSend = res.json;
      res.json = function(data) {
        cacheService.set(key, data, ttl);
        originalSend.call(this, data);
      };

      next();
    } catch (error) {
      next();
    }
  };
};

module.exports = cacheMiddleware;