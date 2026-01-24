/**
 * Recursively converts non-plain objects (like Mongoose ObjectIDs) into plain strings
 * so they can be passed from Server Components to Client Components.
 */
export function serializeData(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => serializeData(item));
  }

  // Handle MongoDB ObjectIDs (they have a toHexString method)
  if (data._bsontype === 'ObjectID' || (data.constructor && data.constructor.name === 'ObjectId')) {
    return data.toString();
  }

  // Handle Dates
  if (data instanceof Date) {
    return data.toISOString();
  }

  // Handle objects
  if (typeof data === 'object') {
    const serialized: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        serialized[key] = serializeData(data[key]);
      }
    }
    return serialized;
  }

  return data;
}

/**
 * A simpler, more robust way to ensure an object is serializable by Next.js.
 */
export function forceSerializable<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
