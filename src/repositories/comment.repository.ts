import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {Comment, CommentRelations, RequestStatus} from '../models';
import {RequestStatusRepository} from './request-status.repository';

export class CommentRepository extends DefaultCrudRepository<
  Comment,
  typeof Comment.prototype.id,
  CommentRelations
> {

  public readonly requestStatus: BelongsToAccessor<RequestStatus, typeof Comment.prototype.id>;

  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource, @repository.getter('RequestStatusRepository') protected requestStatusRepositoryGetter: Getter<RequestStatusRepository>,
  ) {
    super(Comment, dataSource);
    this.requestStatus = this.createBelongsToAccessorFor('requestStatus', requestStatusRepositoryGetter,);
    this.registerInclusionResolver('requestStatus', this.requestStatus.inclusionResolver);
  }
}
