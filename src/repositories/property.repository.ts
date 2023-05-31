import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldbDataSource} from '../datasources';
import {Property, PropertyRelations, Adviser, PropertyType, City, Request} from '../models';
import {AdviserRepository} from './adviser.repository';
import {PropertyTypeRepository} from './property-type.repository';
import {CityRepository} from './city.repository';
import {RequestRepository} from './request.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {

  public readonly adviser: BelongsToAccessor<Adviser, typeof Property.prototype.id>;

  public readonly propertyType: BelongsToAccessor<PropertyType, typeof Property.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Property.prototype.id>;

  public readonly requests: HasManyRepositoryFactory<Request, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.mysqldb') dataSource: MysqldbDataSource, @repository.getter('AdviserRepository') protected adviserRepositoryGetter: Getter<AdviserRepository>, @repository.getter('PropertyTypeRepository') protected propertyTypeRepositoryGetter: Getter<PropertyTypeRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>,
  ) {
    super(Property, dataSource);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.propertyType = this.createBelongsToAccessorFor('propertyType', propertyTypeRepositoryGetter,);
    this.registerInclusionResolver('propertyType', this.propertyType.inclusionResolver);
    this.adviser = this.createBelongsToAccessorFor('adviser', adviserRepositoryGetter,);
    this.registerInclusionResolver('adviser', this.adviser.inclusionResolver);
  }
}
