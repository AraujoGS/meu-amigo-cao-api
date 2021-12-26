import components from './components'
import schemas from './schemas'
import paths from './paths'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Meu Amigo Cão API',
    description: 'API para o petshop meu amigo cão, através dela são feitas as modificações nos dados dos clientes',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Account'
  }],
  paths,
  schemas,
  components
}
