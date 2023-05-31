import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Adviser} from './adviser.model';
import {PropertyType} from './property-type.model';
import {City} from './city.model';
import {Request} from './request.model';

@model(
  {
  settings: {
    foreignKeys:
    {
      fk_property_adviser: {
        name: "fk_property_adviser",
        entity: "Adviser",
        entityKey: "id",
        foreignKey: "adviserId"
      },
      fk_property_property_type: {
        name: "fk_property_property_type",
        entity: "PropertyType",
        entityKey: "id",
        foreignKey: "propertyTypeId"
      },
      fk_property_city: {
        name: "fk_property_city",
        entity: "City",
        entityKey: "id",
        foreignKey: "cityId"
      },
    },
  },
}
)
export class Property extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    default: 0,
  })
  rental_value?: number;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    default: 0,
  })
  sale_value?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  for_sale: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  for_rent: boolean;

  @belongsTo(() => Adviser)
  adviserId: number;

  @belongsTo(() => PropertyType)
  propertyTypeId: number;

  @belongsTo(() => City)
  cityId: number;

  @hasMany(() => Request)
  requests: Request[];

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
