import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {Adviser, AdviserRelations, Property} from '../models';
import {PropertyRepository} from './property.repository';

export class AdviserRepository extends DefaultCrudRepository<
  Adviser,
  typeof Adviser.prototype.id,
  AdviserRelations
> {

  public readonly properties: HasManyRepositoryFactory<Property, typeof Adviser.prototype.id>;

  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(Adviser, dataSource);
    this.properties = this.createHasManyRepositoryFactoryFor('properties', propertyRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
