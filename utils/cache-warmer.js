const cacheService = require('../services/cache-service');

class CacheWarmer {
  async warmPopularBooks(books) {
    for (const book of books) {
      await cacheService.setBook(book.id, book);
    }
    console.log(`Warmed cache for ${books.length} popular books`);
  }

  async warmUserSessions(users) {
    for (const user of users) {
      await cacheService.setUser(user.id, user);
    }
    console.log(`Warmed cache for ${users.length} user sessions`);
  }

  async invalidateUserCache(userId) {
    await cacheService.del(`users:${userId}`);
  }

  async invalidateBookCache(bookId) {
    await cacheService.del(`books:${bookId}`);
  }
}

module.exports = new CacheWarmer();