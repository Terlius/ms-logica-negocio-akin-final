import {Entity, model, property, hasMany} from '@loopback/repository';
import {Contract} from './contract.model';

@model()
export class Cosigner extends Entity {
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
    required: true,
  })
  laborCharter: string;

  @hasMany(() => Contract)
  contracts: Contract[];

  constructor(data?: Partial<Cosigner>) {
    super(data);
  }
}

export interface CosignerRelations {
  // describe navigational properties here
}

export type CosignerWithRelations = Cosigner & CosignerRelations;
