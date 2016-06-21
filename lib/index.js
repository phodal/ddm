// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var DDM = (function () {
  function DDM() {
    _classCallCheck(this, DDM);

    this.objectForAdd = {};
    this.objectKeyForRemove = [];
    this.handleFunction = [];
  }

  _createClass(DDM, [{
    key: "from",
    value: function from(originObject) {
      this.originObject = clone(originObject);
      return this;
    }
  }, {
    key: "get",
    value: function get(keyArray) {
      if (keyArray) {
        this.newObjectKey = keyArray;
      } else {
        this.newObjectKey = [];
      }
      return this;
    }
  }, {
    key: "to",
    value: function to(newObject) {
      function cloneObjectForAdd() {
        for (var prop in this.objectForAdd) {
          newObject[prop] = this.objectForAdd[prop];
        }
      }

      function cloneToNewObjectByKey() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.newObjectKey[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (this.originObject[key] !== undefined) {
              newObject[key] = this.originObject[key];
            } else {
              newObject[key] = "";
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
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
          newObject[field] = this.handleFunction[i].handle(newObject[field]);
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
    }
  }, {
    key: "add",
    value: function add(field, value) {
      this.objectForAdd[field] = value;
      return this;
    }
  }, {
    key: "remove",
    value: function remove(field) {
      this.objectKeyForRemove.push(field);
      return this;
    }
  }, {
    key: "handle",
    value: function handle(field, _handle) {
      this.handleFunction.push({
        field: field,
        handle: _handle
      });
      return this;
    }
  }]);

  return DDM;
})();

exports.DDM = DDM;