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
  Cosigner,
  Contract,
} from '../models';
import {CosignerRepository} from '../repositories';

export class CosignerContractController {
  constructor(
    @repository(CosignerRepository) protected cosignerRepository: CosignerRepository,
  ) { }

  @get('/cosigners/{id}/contracts', {
    responses: {
      '200': {
        description: 'Array of Cosigner has many Contract',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contract)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Contract>,
  ): Promise<Contract[]> {
    return this.cosignerRepository.contracts(id).find(filter);
  }

  @post('/cosigners/{id}/contracts', {
    responses: {
      '200': {
        description: 'Cosigner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contract)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cosigner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {
            title: 'NewContractInCosigner',
            exclude: ['id'],
            optional: ['cosignerId']
          }),
        },
      },
    }) contract: Omit<Contract, 'id'>,
  ): Promise<Contract> {
    return this.cosignerRepository.contracts(id).create(contract);
  }

  @patch('/cosigners/{id}/contracts', {
    responses: {
      '200': {
        description: 'Cosigner.Contract PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {partial: true}),
        },
      },
    })
    contract: Partial<Contract>,
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where<Contract>,
  ): Promise<Count> {
    return this.cosignerRepository.contracts(id).patch(contract, where);
  }

  @del('/cosigners/{id}/contracts', {
    responses: {
      '200': {
        description: 'Cosigner.Contract DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Contract)) where?: Where<Contract>,
  ): Promise<Count> {
    return this.cosignerRepository.contracts(id).delete(where);
  }
}
