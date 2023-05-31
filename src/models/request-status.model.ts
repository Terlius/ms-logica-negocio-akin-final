import {Entity, model, property, hasMany} from '@loopback/repository';
import {Request} from './request.model';
import {Comment} from './comment.model';

@model()
export class RequestStatus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  approved: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  rejected: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  revision: boolean;

  @hasMany(() => Request)
  requests: Request[];

  @hasMany(() => Comment)
  comments: Comment[];

  constructor(data?: Partial<RequestStatus>) {
    super(data);
  }
}

export interface RequestStatusRelations {
  // describe navigational properties here
}

export type RequestStatusWithRelations = RequestStatus & RequestStatusRelations;
