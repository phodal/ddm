// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
function clone(objectToBeCloned) {
  // Basis.
  if (!(objectToBeCloned instanceof Object)) {
    return objectToBeCloned;
  }

  var objectClone;

  // Filter out special objects.
  var Constructor = objectToBeCloned.constructor;
  objectClone = new Constructor();

  // Clone each property.
  for (var prop in objectToBeCloned) {
    objectClone[prop] = clone(objectToBeCloned[prop]);
  }

  return objectClone;
}

export class DDM {
  constructor() {
    this.objectForAdd = {};
    this.objectKeyForRemove = [];
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
    function cloneObjectForAdd() {
      for (var prop in this.objectForAdd) {
        newObject[prop] = this.objectForAdd[prop];
      }
    }

    function cloneToNewObjectByKey() {
      for (var key of this.newObjectKey) {
        if (this.originObject[key] !== undefined) {
          newObject[key] = this.originObject[key];
        } else {
          newObject[key] = "";
        }
      }
    }

    function deepCloneObject() {
      // Clone each property.
      for (var prop in this.originObject) {
        newObject[prop] = clone(this.originObject[prop]);
      }
    }

    function removeObject() {
      for (var i = 0; i < this.objectKeyForRemove.length; i++) {
        delete newObject[this.objectKeyForRemove[i]];
      }
    }

    cloneObjectForAdd.call(this);
    var haveAddingObject = this.newObjectKey.length > 0;
    var hasRemovingObject = this.objectKeyForRemove.length > 0;

    if (haveAddingObject) {
      cloneToNewObjectByKey.call(this);
    } else {
      deepCloneObject.call(this);
    }

    if (hasRemovingObject) {
      removeObject.call(this);
    }

    return this;
  };

  handle() {

    return this;
  };

  add(field, value) {
    this.objectForAdd[field] = value;
    return this;
  };

  remove(field) {
    this.objectKeyForRemove.push(field);
    return this;
  };
}
