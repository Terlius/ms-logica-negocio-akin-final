import {Entity, model, property, belongsTo} from '@loopback/repository';
import {RequestStatus} from './request-status.model';

@model(
  {
  settings: {
    foreignKeys:
    {
      fk_request_status_comment: {
        name: "fk_request_status_comment",
        entity: "RequestStatus",
        entityKey: "id",
        foreignKey: "requestStatusId"
      },
    },
  },
}
)
export class Comment extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @belongsTo(() => RequestStatus)
  requestStatusId: number;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
