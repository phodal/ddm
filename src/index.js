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
    this.handleFunction = [];
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

    function addExtendHandle() {
      for (var i = 0; i < this.handleFunction.length; i++) {
        var field = this.handleFunction[i].field;
        newObject[field] = this.handleFunction[i].handle(newObject[field])
      }
    }

    var haveAddingObject = this.newObjectKey.length > 0;
    var hasRemovingObject = this.objectKeyForRemove.length > 0;
    var hasExtendHandle = this.handleFunction.length > 0;

    cloneObjectForAdd.call(this);
    if (haveAddingObject) {
      cloneToNewObjectByKey.call(this);
    } else {
      deepCloneObject.call(this);
    }

    if (hasRemovingObject) {
      removeObject.call(this);
    }

    if (hasExtendHandle) {
      addExtendHandle.call(this);
    }

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

  handle(field, handle) {
    this.handleFunction.push({
      field: field,
      handle: handle
    });
    return this;
  }

  replace(originField, newField) {
    this.objectForAdd[newField] = this.originObject[originField];
    this.objectKeyForRemove.push(originField);
    return this;
  }

  replaceWithHandle(originField, newField, handle) {
    this.objectForAdd[newField] = this.originObject[originField];
    this.objectKeyForRemove.push(originField);
    this.handleFunction.push({
      field: newField,
      handle: handle
    });
    return this;
  }
}
