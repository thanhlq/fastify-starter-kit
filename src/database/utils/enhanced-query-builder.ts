//Thanh LE

import { QueryBuilderType } from "objection";
import BaseModel from "./base-model.js";

/**
 * Why? for encapsulation of lower level api.
 */
export default class EnhancedQueryBuilder<M extends BaseModel> {

  _delegate: QueryBuilderType<M>;
  _attrs: any

  constructor(delegate: QueryBuilderType<M>, attrs?: any) {
    this._delegate = delegate;
    if (attrs) {
      this.setAtributes(attrs)
    }
  }

  setAtributes(attrs: any): EnhancedQueryBuilder<M> {
    this._attrs = attrs
    return this;
  }

  get $q(): QueryBuilderType<M> {
    return this._delegate
  }

  public buildAttributes(newAttrs?: any) {
    if (!newAttrs && !this._attrs) {
      throw new Error('No any attributes provided to build');
    }

    if (newAttrs && this._attrs) {
      return {
        ...this._attrs,
        ...newAttrs
      }
    } else {
      return newAttrs || this._attrs
    }
  }

  /**
   * Insert a new record into database.
   *
   * @param newAttrs
   * @returns
   */
  public save(newAttrs?: any) {
    const toSaveAttrs = this.buildAttributes(newAttrs)
    return this._delegate.insert(toSaveAttrs);
  }

  /**
   * Partially update attributes of a record.
   *
   * @param updateAttrs To be updated attributes
   * @returns
   */
  public patch(updateAttrs) {
    return this._delegate.patch(updateAttrs)
  }

  batchInsert(rows: []) {
    if (this.isPostgres()) {
      return BaseModel.query().insert(rows)
    } else {
      // const k = BaseModel.knex();
      // const chunkSize = 30;
      // return k.batchInsert(rows)
    }
  }

  isPostgres() {
    return false; // todo
  }

}

export { EnhancedQueryBuilder }