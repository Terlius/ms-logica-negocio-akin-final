import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comment,
  RequestStatus,
} from '../models';
import {CommentRepository} from '../repositories';

export class CommentRequestStatusController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
  ) { }

  @get('/comments/{id}/request-status', {
    responses: {
      '200': {
        description: 'RequestStatus belonging to Comment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RequestStatus),
          },
        },
      },
    },
  })
  async getRequestStatus(
    @param.path.number('id') id: typeof Comment.prototype.id,
  ): Promise<RequestStatus> {
    return this.commentRepository.requestStatus(id);
  }
}
