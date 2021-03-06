import { Model } from 'objection';
import EnhancedQueryBuilder from './enhanced-query-builder.js'

/**
 * @deprecated Currently, issue: if inherite from this class then objection does not see the static property*.
 *
 * @todo to find solution later.
 */
export default class BaseModel extends Model {
  // id!: string;

  // static tableName: string;

  /**
   * A simple helper function to instantiate a new Model without needing new.
   * @ref https://bookshelfjs.org/api.html#Model-static-forge

   * @param attributes  Initial value
   * @param opts
   * @example
   *
   *    const user = await User.forge({email: 'thanhlq@gmail.com', name: 'Thanh Le'}).save()
   * @returns
   */
  static forge(attrs?: any) {
    return new EnhancedQueryBuilder<BaseModel>(BaseModel.query(), attrs)
  }

}
