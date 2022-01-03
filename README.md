![Pipeline](https://github.com/AraujoGS/meu-amigo-cao-api/actions/workflows/pipeline.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/AraujoGS/meu-amigo-cao-api/badge.svg?branch=main)](https://coveralls.io/github/AraujoGS/meu-amigo-cao-api?branch=main)

# meu-amigo-cao-api
API para estudo de boas práticas de programação

## instalação
` npm i `

## rodar testes
` npm t `

## rodar aplicação com docker
` npm run up `
- OBS: É necessário criar o arquivo .env-docker ou alterar o arquivo 'docker-compose.yml' para utilizar algum outro .env que você desejar
- É necessário rodar dentro do container o script de carga para gerar a estrutura do banco de dados ` documentation > ddl-postgres.sql `

## instruções
- É necessário criar alguns arquivos para a correta execução do projeto, no repositório eles foram indicados utilizando o sufixo '-example' ao nome.
- OBS: o arquivo .coveralls.yml só se faz necessário caso você queira executar o comando ` npm run test:coveralls`, também será necessário um token válido gerado pelo coveralls.io
