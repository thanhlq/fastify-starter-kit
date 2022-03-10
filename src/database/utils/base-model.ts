import { Model } from 'objection';
import EnhancedQueryBuilder from './enhanced-query-builder.js'


export default class BaseModel extends Model {
  // id!: string;

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
