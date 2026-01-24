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

  // Handle Buffers (e.g., societyId: {buffer: ...})
  if (data.constructor && data.constructor.name === 'Buffer') {
    return "[Buffer]";
  }

  // Handle Dates
  if (data instanceof Date) {
    return data.toISOString();
  }

  // Handle objects
  if (typeof data === 'object') {
    // If it's not a plain object, try to convert it
    const serialized: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        // Skip internal Mongoose keys if they somehow leak
        if (key.startsWith('$') || key.startsWith('__')) continue;
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
