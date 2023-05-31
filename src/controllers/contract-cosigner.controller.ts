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
  Cosigner,
} from '../models';
import {ContractRepository} from '../repositories';

export class ContractCosignerController {
  constructor(
    @repository(ContractRepository)
    public contractRepository: ContractRepository,
  ) { }

  @get('/contracts/{id}/cosigner', {
    responses: {
      '200': {
        description: 'Cosigner belonging to Contract',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cosigner),
          },
        },
      },
    },
  })
  async getCosigner(
    @param.path.number('id') id: typeof Contract.prototype.id,
  ): Promise<Cosigner> {
    return this.contractRepository.cosigner(id);
  }
}
