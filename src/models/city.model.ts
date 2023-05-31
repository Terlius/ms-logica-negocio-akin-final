import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Department} from './department.model';
import {Property} from './property.model';

@model(
  {
  settings: {
    foreignKeys:
    {
      fk_departmentId_city: {
        name: "fk_departmentId_city",
        entity: "Department",
        entityKey: "id",
        foreignKey: "departmentId"
      },
    },
  },
}
)
export class City extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Department)
  departmentId: number;

  @hasMany(() => Property)
  properties: Property[];

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
