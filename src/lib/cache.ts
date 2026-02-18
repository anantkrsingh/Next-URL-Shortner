// In-memory cache implementation to replace Redis
class InMemoryCache {
  private cache: Map<string, string>;

  constructor() {
    this.cache = new Map();
  }

  async get(key: string): Promise<string | null> {
    return this.cache.get(key) || null;
  }

  async set(key: string, value: string): Promise<void> {
    this.cache.set(key, value);
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

const cache = new InMemoryCache();

export default cache;
