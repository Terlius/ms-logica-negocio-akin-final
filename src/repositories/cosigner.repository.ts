import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {Cosigner, CosignerRelations, Contract} from '../models';
import {ContractRepository} from './contract.repository';

export class CosignerRepository extends DefaultCrudRepository<
  Cosigner,
  typeof Cosigner.prototype.id,
  CosignerRelations
> {

  public readonly contracts: HasManyRepositoryFactory<Contract, typeof Cosigner.prototype.id>;

  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource, @repository.getter('ContractRepository') protected contractRepositoryGetter: Getter<ContractRepository>,
  ) {
    super(Cosigner, dataSource);
    this.contracts = this.createHasManyRepositoryFactoryFor('contracts', contractRepositoryGetter,);
    this.registerInclusionResolver('contracts', this.contracts.inclusionResolver);
  }
}
