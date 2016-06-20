export class DLM {
  constructor() {

  }

  from(originObject) {
    this.originObject = originObject;
    return this;
  };

  get(array) {
    this.newObjectKey = array;
    return this;
  };

  to(newObject) {
    for (var key of this.newObjectKey) {
      newObject[key] = this.originObject[key];
    }
    return this;
  };

  handle(field, callback) {

  };

  add(field, value) {

  };

  remove(field) {

  };
}
