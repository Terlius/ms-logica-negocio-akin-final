import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Property} from './property.model';
import {Client} from './client.model';
import {RequestStatus} from './request-status.model';
import {Contract} from './contract.model';

@model(
  {
  settings: {
    foreignKeys:
    {
      fk_property_request: {
        name: "fk_property_request",
        entity: "Property",
        entityKey: "id",
        foreignKey: "propertyId"
      },
      fk_client_request: {
        name: "fk_client_request",
        entity: "Client",
        entityKey: "id",
        foreignKey: "clientId"
      },
      fk_request_status_request: {
        name: "fk_request_status_request",
        entity: "RequestStatus",
        entityKey: "id",
        foreignKey: "requestStatusId"
      },
    },
  },
}
)
export class Request extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @belongsTo(() => Property)
  propertyId: number;

  @belongsTo(() => Client)
  clientId: number;

  @belongsTo(() => RequestStatus)
  requestStatusId: number;

  @hasOne(() => Contract)
  contract: Contract;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
