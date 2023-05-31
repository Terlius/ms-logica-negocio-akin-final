import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contract,
  Request,
} from '../models';
import {ContractRepository} from '../repositories';

export class ContractRequestController {
  constructor(
    @repository(ContractRepository)
    public contractRepository: ContractRepository,
  ) { }

  @get('/contracts/{id}/request', {
    responses: {
      '200': {
        description: 'Request belonging to Contract',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async getRequest(
    @param.path.number('id') id: typeof Contract.prototype.id,
  ): Promise<Request> {
    return this.contractRepository.request(id);
  }
}
