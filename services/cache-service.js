const { client } = require('../config/redis');

class CacheService {
  async set(key, value, ttl = 3600) {
    try {
      await client.set(key, JSON.stringify(value), { EX: ttl });
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async get(key) {
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async del(key) {
    try {
      await client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async setUser(userId, userData) {
    await this.set(`users:${userId}`, userData, 1800);
  }

  async getUser(userId) {
    return await this.get(`users:${userId}`);
  }

  async setBook(bookId, bookData) {
    await this.set(`books:${bookId}`, bookData, 3600);
  }

  async getBook(bookId) {
    return await this.get(`books:${bookId}`);
  }

  async setSearchResults(query, results) {
    await this.set(`search:${query}`, results, 600);
  }

  async getSearchResults(query) {
    return await this.get(`search:${query}`);
  }
}

module.exports = new CacheService();