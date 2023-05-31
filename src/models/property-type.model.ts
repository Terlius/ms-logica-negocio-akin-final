import {Entity, model, property, hasMany} from '@loopback/repository';
import {Property} from './property.model';

@model()
export class PropertyType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    default: false,
  })
  apartment?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  house?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  farm?: boolean;

  @property({
    type: 'string',
  })
  other?: string;

  @hasMany(() => Property)
  properties: Property[];

  constructor(data?: Partial<PropertyType>) {
    super(data);
  }
}

export interface PropertyTypeRelations {
  // describe navigational properties here
}

export type PropertyTypeWithRelations = PropertyType & PropertyTypeRelations;
