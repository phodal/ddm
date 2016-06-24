export declare class DDM {
    constructor();
    from(originObject: any): this;
    get(keyArray: any): this;
    to(newObject: any): this;
    add(field: any, value: any): this;
    remove(field: any): this;
    handle(field: any, handle: any): this;
    replace(originField: any, newField: any): this;
    replaceWithHandle(originField: any, newField: any, handle: any): this;
}
