import {Entity, model, property, hasMany} from '@loopback/repository';
import {Property} from './property.model';

@model()
export class Adviser extends Entity {
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
  identification: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
   
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstSurname: string;

  @property({
    type: 'string',
    
  })
  secondSurname?: string;

  @property({
    type: 'string',
  })
  email: string;

 
  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @hasMany(() => Property)
  properties: Property[];

  constructor(data?: Partial<Adviser>) {
    super(data);
  }
}

export interface AdviserRelations {
  // describe navigational properties here
}

export type AdviserWithRelations = Adviser & AdviserRelations;
