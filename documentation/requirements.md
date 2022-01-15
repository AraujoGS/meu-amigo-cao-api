# **_Aplicação WEB para petshop_**

## **Funcionalidades:**

-Cadastro de cliente (deslogado)
- [X] inputs: nome, email, telefone, data de nascimento, senha e confirmação de senha
- [X] validar inputs e retornar 400 caso algum campo esteja faltando
- [X] validar se o telefone é um celular válido, se não retornar 400
- [X] validar se o email é válido, se não retornar 400
- [X] validar data de nascimento no formato yyyy-mm-dd, caso não esteja retornar 400
- [X] validar se o e-mail está em uso, caso esteja retornar 412
- [X] validar se o telefone está em uso, caso esteja retornar 412
- [X] validar se a conta foi de fato criada, caso não tenha sido retornar 412
- [X] em caso de erro inesperado retornar 500
- [X] inserir a nova conta, retornar 201 e o usuário logado

-Login de cliente (deslogado)
- [X] inputs: email e senha
- [X] validar os inputs e retornar 400 caso algum campo esteja faltando
- [X] tentar login e em caso de problema com os dados retornar 401
- [X] em caso de erro inesperado retornar 500
- [X] tentar login e em caso de sucesso retornar 200 com o usuário logado 

-Esqueci minha senha (deslogado)
- [X] inputs: email e telefone
- [X] validar os inputs e retornar 400 caso algum campo esteja faltando
- [X] validar se o telefone é um celular válido, se não retornar 400
- [X] validar se o email é válido, se não retornar 400
- [X] validar se o usuário existe, caso não retornar 412
- [X] em caso de erro inesperado retornar 500
- [X] envia um email para o cliente com uma senha temporária e retorna 200

-Alterar senha (logado)
- [X] inputs: nova senha, confirmação de nova senha e senha antiga
- [X] validar se token de acesso válido, caso não retornar 401
- [X] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [X] validar os inputs e retornar 400 caso algum campo esteja faltando
- [X] validar se a senha antiga e a nova são iguais, se são retornar 400
- [X] validar se o usuário existe, caso não retornar 412
- [X] validar se a senha antiga está correta, caso não retornar 412
- [X] em caso de erro inesperado retornar 500
- [X] altera a senha e retorna 200

-Cadastro de endereço (logado)
- [X] inputs: uuid do cliente, cep, logradouro, numero, bairro, cidade, uf e complemento
- [X] validar se token de acesso válido, caso não retornar 401
- [X] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [X] validar inputs e retornar 400 caso algum campo esteja faltando. OBS: complemento é opcional
- [X] validar se é um cep válido e retornar 400 caso não seja
- [X] em caso de erro inesperado retornar 500
- [X] inserir o endereço do cliente, retornar 201

-Cadastro de pets (logado)
- [X] inputs: uuid do cliente, nome, raça, cor, porte e considerações
- [X] validar se token de acesso válido, caso não retornar 401
- [X] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [X] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: considerações é opcional
- [X] validar se é uma raça válida e retornar 412 caso não
- [X] validar se é um porte válido e retornar 412 caso não
- [X] em caso de erro inesperado retornar 500
- [X] inserir o pet, retornar 201

-Consultar cliente (logado)
- [X] inputs: uuid do usuário
- [X] validar se token de acesso válido, caso não retornar 401
- [X] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [X] em caso de erro inesperado retornar 500
- [X] consultar e retornar 200 com os dados

-Alterar cliente (logado)
- [X] inputs: uuid do cliente, nome, email, telefone, data de nascimento
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [X] validar inputs e retornar 400 caso algum campo esteja faltando
- [X] validar se é um telefone válido, se não retornar 400
- [X] validar se é um email válido, se não retornar 400
- [ ] validar se o email está em uso, caso esteja retornar 412 
- [ ] validar se o telefone está em uso, caso esteja retornar 412 
- [ ] em caso de erro inesperado retornar 500
- [ ] alterar os dados, retornar 200 e os dados

-Alterar endereço (logado)
- [ ] inputs: uuid do usuário, uuid do endereço, cep, logradouro, numero, bairro, cidade, uf e complemento
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: complemento é opcional
- [ ] validar se é um cep válido e retornar 400 caso não seja
- [ ] validar se o usuário tem endereço cadastrado e retornar 412 caso não
- [ ] em caso de erro inesperado retornar 500
- [ ] alterar os dados, retornar 200

-alterar pet (logado)
- [ ] inputs: uuid do cliente, uuid do pet, nome, raça, cor, porte e considerações
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: considerações é opcional
- [ ] validar se o pet existe, se é desse usuário e retornar 412 caso não
- [ ] em caso de erro inesperado retornar 500
- [ ] alterar o pet, retornar 200

-remover pet (logado)
- [ ] inputs: uuid do cliente, uuid do pet
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando.
- [ ] validar se o pet existe, se é desse usuário e retornar 412 caso não
- [ ] em caso de erro inesperado retornar 500
- [ ] deletar o pet e retornar 204

-Agendar banho ou tosa (logado)
- [ ] inputs: uuid do cliente, serviço (banho, tosa ou banho e tosa), data, pet, observações
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: observações é opcional
- [ ] em caso de erro inesperado retornar 500
- [ ] em caso de sucesso retornar 201 e os dados do agendamento

-Consultar seus agendamentos(logado)
- [ ] inputs: uuid do cliente, offset e limit
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] em caso de erro inesperado retornar 500
- [ ] caso não tenha agendamentos, retornar 200 e uma lista vazia
- [ ] em caso de sucesso retornar 200 e uma lista

-Cancelar um agendamento (logado)
- [ ] inputs: uuid do cliente, uuid do agendamento
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] em caso de erro inesperado retornar 500
- [ ] caso o agendamento não exista, retornar 204
- [ ] em caso de sucesso retornar 200

-Alterar um agendamento (logado)
- [ ] inputs: uuid do cliente, uuid do agendamento, serviço (banho, tosa ou banho e tosa), data, pet, observações
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: observações é opcional
- [ ] em caso de erro inesperado retornar 500
- [ ] em caso de sucesso retornar 200 e os dados atualizados