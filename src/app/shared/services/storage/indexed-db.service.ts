import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  private dbName = environment.indexedDbName;
  private storeName = 'configuration';
  private dbVersion = 1;
  isBrowser: boolean = false;
  constructor() {
    this.isBrowser = typeof window !== 'undefined' && !!window.indexedDB;
    if (this.isBrowser) {
      this.initDB();
    }
  }

  /**
   * Initializes the Indexed DB configuration
   *
   * @private
   * @memberof IndexedDbService
   */
  private initDB() {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: 'id' });
      }
    };

    request.onerror = (event) => {
      console.error('Database error:', event);
    };
  }

  /**
   * Get Db Database
   *
   * @private
   * @return {*}  {Promise<IDBDatabase>}
   * @memberof IndexedDbService
   */
  private getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * Add item to the indexed DB Database Store.
   *
   * @param {{ id: string; name: string; description: string }} item
   * @return {*}
   * @memberof IndexedDbService
   */
  async addItem(item: { id: string; name: string; description: string }) {
    const db = await this.getDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    const request = store.add(item);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * Get Item from the database store.
   *
   * @param {string} id
   * @return {*}
   * @memberof IndexedDbService
   */
  async getItem(id: string) {
    const db = await this.getDB();
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.get(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * Get All the Items from the database store.
   *
   * @return {*}
   * @memberof IndexedDbService
   */
  async getAllItems() {
    const db = await this.getDB();
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * Delete a item from the database.
   *
   * @param {string} id
   * @return {*}
   * @memberof IndexedDbService
   */
  async deleteItem(id: string) {
    const db = await this.getDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    const request = store.delete(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = (event) => {
        reject(event);
      };
    });
  }
}
