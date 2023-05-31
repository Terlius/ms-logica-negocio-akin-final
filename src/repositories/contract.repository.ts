import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {Contract, ContractRelations, Request, Cosigner} from '../models';
import {RequestRepository} from './request.repository';
import {CosignerRepository} from './cosigner.repository';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.id,
  ContractRelations
> {

  public readonly request: BelongsToAccessor<Request, typeof Contract.prototype.id>;

  public readonly cosigner: BelongsToAccessor<Cosigner, typeof Contract.prototype.id>;

  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('CosignerRepository') protected cosignerRepositoryGetter: Getter<CosignerRepository>,
  ) {
    super(Contract, dataSource);
    this.cosigner = this.createBelongsToAccessorFor('cosigner', cosignerRepositoryGetter,);
    this.registerInclusionResolver('cosigner', this.cosigner.inclusionResolver);
    this.request = this.createBelongsToAccessorFor('request', requestRepositoryGetter,);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
  }
}
