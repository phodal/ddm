export class DDM {
  constructor() {
    this.objectForAddRemove = {};
  }

  from(originObject) {
    this.originObject = clone(originObject);
    return this;
  };

  get(keyArray) {
    if (keyArray) {
      this.newObjectKey = keyArray;
    } else {
      this.newObjectKey = [];
    }
    return this;
  };

  to(newObject) {
    function cloneObjectForAddRemove() {
      for (var prop in this.objectForAddRemove) {
        newObject[prop] = this.objectForAddRemove[prop];
      }
    }

    function cloneToNewObjectByKey() {
      for (var key of this.newObjectKey) {
        newObject[key] = this.originObject[key];
      }
    }

    function deepCloneObject() {
      // Clone each property.
      for (var prop in this.originObject) {
        newObject[prop] = clone(this.originObject[prop]);
      }
    }

    cloneObjectForAddRemove.call(this);
    if (this.newObjectKey.length > 0) {
      cloneToNewObjectByKey.call(this);
    } else {
      deepCloneObject.call(this);
    }
    return this;
  };

  handle(field, callback) {

  };

  add(field, value) {
    this.objectForAddRemove[field] = value;
    return this;
  };

  remove(field) {

  };
}

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
function clone(objectToBeCloned) {
  // Basis.
  if (!(objectToBeCloned instanceof Object)) {
    return objectToBeCloned;
  }

  var objectClone;

  // Filter out special objects.
  var Constructor = objectToBeCloned.constructor;
  switch (Constructor) {
    // Implement other special objects here.
    case RegExp:
      objectClone = new Constructor(objectToBeCloned);
      break;
    case Date:
      objectClone = new Constructor(objectToBeCloned.getTime());
      break;
    default:
      objectClone = new Constructor();
  }

  // Clone each property.
  for (var prop in objectToBeCloned) {
    objectClone[prop] = clone(objectToBeCloned[prop]);
  }

  return objectClone;
}
