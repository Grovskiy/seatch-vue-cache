interface CacheItem<T> {
  data: T
  expiry: number
}

export class CacheService {
  private static cache = new Map<string, CacheItem<any>>()

  static set<T>(key: string, data: T, ttlMinutes: number = 60): void {
    const expiry = Date.now() + (ttlMinutes * 60 * 1000)
    this.cache.set(key, { data, expiry })
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  static has(key: string): boolean {
    const item = this.cache.get(key)

    if (!item) {
      return false
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  static clear(): void {
    this.cache.clear()
  }

  static delete(key: string): void {
    this.cache.delete(key)
  }
}