import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { cipher, decipher } from '../../../core/encryption/cipher';

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
  async addItem(item: { id: string; value: any; description ?: string;  datatype ?: string;  encryption ?: boolean; created_at ?: Date;}) {
    item['datatype'] = typeof item.value;
    item['created_at'] = new Date();
    if (item.encryption) {
      const cipherEncryptFn = cipher(environment.cipherEncryptionKey);
      item.value = cipherEncryptFn( typeof item.value === 'string' ? item.value : JSON.stringify(item.value))
    }
    const db = await this.getDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    const request = store.put(item);
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
    if ( this.isBrowser) {
      const db = await this.getDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);
      return new Promise((resolve, reject) => {
        request.onsuccess = (event: any) => {
          let item = event.target.result;
          if (item) {
            if (item.encryption) {
              const cipherEncryptFn = decipher(environment.cipherEncryptionKey);
              item.value = cipherEncryptFn(item.value)
              if (item.datatype == 'object') {
                item.value = JSON.parse(item.value)
              }
            }
            resolve(item);
          } else {
            reject(false);
          }

        };

        request.onerror = (event) => {
          console.log("Im in Error");
          reject(event);
        };
      });
    }
    return new Promise((resolve, reject) => { reject(false)});
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
