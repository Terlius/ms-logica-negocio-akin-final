import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cosigner} from '../models';
import {CosignerRepository} from '../repositories';

export class ConsignerController {
  constructor(
    @repository(CosignerRepository)
    public cosignerRepository : CosignerRepository,
  ) {}

  @post('/cosigners')
  @response(200, {
    description: 'Cosigner model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cosigner)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cosigner, {
            title: 'NewCosigner',
            exclude: ['id'],
          }),
        },
      },
    })
    cosigner: Omit<Cosigner, 'id'>,
  ): Promise<Cosigner> {
    return this.cosignerRepository.create(cosigner);
  }

  @get('/cosigners/count')
  @response(200, {
    description: 'Cosigner model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cosigner) where?: Where<Cosigner>,
  ): Promise<Count> {
    return this.cosignerRepository.count(where);
  }

  @get('/cosigners')
  @response(200, {
    description: 'Array of Cosigner model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cosigner, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cosigner) filter?: Filter<Cosigner>,
  ): Promise<Cosigner[]> {
    return this.cosignerRepository.find(filter);
  }

  @patch('/cosigners')
  @response(200, {
    description: 'Cosigner PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cosigner, {partial: true}),
        },
      },
    })
    cosigner: Cosigner,
    @param.where(Cosigner) where?: Where<Cosigner>,
  ): Promise<Count> {
    return this.cosignerRepository.updateAll(cosigner, where);
  }

  @get('/cosigners/{id}')
  @response(200, {
    description: 'Cosigner model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cosigner, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cosigner, {exclude: 'where'}) filter?: FilterExcludingWhere<Cosigner>
  ): Promise<Cosigner> {
    return this.cosignerRepository.findById(id, filter);
  }

  @patch('/cosigners/{id}')
  @response(204, {
    description: 'Cosigner PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cosigner, {partial: true}),
        },
      },
    })
    cosigner: Cosigner,
  ): Promise<void> {
    await this.cosignerRepository.updateById(id, cosigner);
  }

  @put('/cosigners/{id}')
  @response(204, {
    description: 'Cosigner PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cosigner: Cosigner,
  ): Promise<void> {
    await this.cosignerRepository.replaceById(id, cosigner);
  }

  @del('/cosigners/{id}')
  @response(204, {
    description: 'Cosigner DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cosignerRepository.deleteById(id);
  }
}
