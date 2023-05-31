import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {Request, RequestRelations, Property, Client, RequestStatus, Contract} from '../models';
import {PropertyRepository} from './property.repository';
import {ClientRepository} from './client.repository';
import {RequestStatusRepository} from './request-status.repository';
import {ContractRepository} from './contract.repository';

export class RequestRepository extends DefaultCrudRepository<
  Request,
  typeof Request.prototype.id,
  RequestRelations
> {

  public readonly property: BelongsToAccessor<Property, typeof Request.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof Request.prototype.id>;

  public readonly requestStatus: BelongsToAccessor<RequestStatus, typeof Request.prototype.id>;

  public readonly contract: HasOneRepositoryFactory<Contract, typeof Request.prototype.id>;

  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('RequestStatusRepository') protected requestStatusRepositoryGetter: Getter<RequestStatusRepository>, @repository.getter('ContractRepository') protected contractRepositoryGetter: Getter<ContractRepository>,
  ) {
    super(Request, dataSource);
    this.contract = this.createHasOneRepositoryFactoryFor('contract', contractRepositoryGetter);
    this.registerInclusionResolver('contract', this.contract.inclusionResolver);
    this.requestStatus = this.createBelongsToAccessorFor('requestStatus', requestStatusRepositoryGetter,);
    this.registerInclusionResolver('requestStatus', this.requestStatus.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.property = this.createBelongsToAccessorFor('property', propertyRepositoryGetter,);
    this.registerInclusionResolver('property', this.property.inclusionResolver);
  }
}
