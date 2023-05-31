import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  RequestStatus,
  Comment,
} from '../models';
import {RequestStatusRepository} from '../repositories';

export class RequestStatusCommentController {
  constructor(
    @repository(RequestStatusRepository) protected requestStatusRepository: RequestStatusRepository,
  ) { }

  @get('/request-statuses/{id}/comments', {
    responses: {
      '200': {
        description: 'Array of RequestStatus has many Comment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comment>,
  ): Promise<Comment[]> {
    return this.requestStatusRepository.comments(id).find(filter);
  }

  @post('/request-statuses/{id}/comments', {
    responses: {
      '200': {
        description: 'RequestStatus model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof RequestStatus.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewCommentInRequestStatus',
            exclude: ['id'],
            optional: ['requestStatusId']
          }),
        },
      },
    }) comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.requestStatusRepository.comments(id).create(comment);
  }

  @patch('/request-statuses/{id}/comments', {
    responses: {
      '200': {
        description: 'RequestStatus.Comment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Partial<Comment>,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.requestStatusRepository.comments(id).patch(comment, where);
  }

  @del('/request-statuses/{id}/comments', {
    responses: {
      '200': {
        description: 'RequestStatus.Comment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.requestStatusRepository.comments(id).delete(where);
  }
}
