import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {RequestStatus, RequestStatusRelations, Request, Comment} from '../models';
import {RequestRepository} from './request.repository';
import {CommentRepository} from './comment.repository';

export class RequestStatusRepository extends DefaultCrudRepository<
  RequestStatus,
  typeof RequestStatus.prototype.id,
  RequestStatusRelations
> {

  public readonly requests: HasManyRepositoryFactory<Request, typeof RequestStatus.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<Comment, typeof RequestStatus.prototype.id>;

  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(RequestStatus, dataSource);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', commentRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
  }
}
