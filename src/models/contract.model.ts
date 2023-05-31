import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Request} from './request.model';
import {Cosigner} from './cosigner.model';

@model(
  {
  settings: {
    foreignKeys:
    {
      fk_contract_request: {
        name: "fk_contract_request",
        entity: "Request",
        entityKey: "id",
        foreignKey: "requestId"
      },
      fk_contract_consigner: {
        name: "fk_contract_consigner",
        entity: "Cosigner",
        entityKey: "id",
        foreignKey: "cosignerId"
      },
    },
  },
}
)
export class Contract extends Entity {
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
  content: string;

  @property({
    type: 'string',
    required: true,
  })
  file: string;

  @belongsTo(() => Request)
  requestId: number;

  @belongsTo(() => Cosigner)
  cosignerId: number;

  constructor(data?: Partial<Contract>) {
    super(data);
  }
}

export interface ContractRelations {
  // describe navigational properties here
}

export type ContractWithRelations = Contract & ContractRelations;
