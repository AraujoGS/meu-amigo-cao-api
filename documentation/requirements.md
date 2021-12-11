# **_Aplicação WEB para petshop_**

## **Funcionalidades:**

-Cadastro de cliente (deslogado)
- [ ] inputs: nome, email, telefone, data de nascimento, senha e confirmação de senha
- [ ] validar inputs e retornar 400 caso algum campo esteja faltando
- [ ] validar se o telefone é um celular válido, se não retornar 400
- [ ] validar se o email é válido, se não retornar 400
- [ ] validar se o e-mail está em uso, caso esteja retornar 412
- [ ] validar se o telefone está em uso, caso esteja retornar 412
- [ ] validar se a conta foi de fato criada, caso não tenha sido retornar 412
- [ ] em caso de erro inesperado retornar 500
- [ ] inserir a nova conta, retornar 201 e o usuário logado

-Login de cliente (deslogado)
- [ ] inputs: email e senha
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando
- [ ] tentar login e em caso de problema com os dados retornar 401
- [ ] em caso de erro inesperado retornar 500
- [ ] tentar login e em caso de sucesso retornar 200 com o usuário logado 

-Esqueci minha senha (deslogado)
- [ ] inputs: email e telefone
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando
- [ ] validar se o telefone é um celular válido, se não retornar 400
- [ ] validar se o email é válido, se não retornar 400
- [ ] em caso de erro inesperado retornar 500
- [ ] envia um email para o cliente com uma senha temporária e retorna 200

-Consultar cadastro de cliente (logado)
- [ ] inputs: uuid do usuário
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] em caso de erro inesperado retornar 500
- [ ] tentar consultar, caso não encontre retornar 204
- [ ] tentar consultar, caso encontre retornar 200

-Cadastro de endereço (logado)
- [ ] inputs: uuid do cliente, cep, logradouro, numero, bairro, cidade, uf e complemento
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar inputs e retornar 400 caso algum campo esteja faltando. OBS: complemento é opcional
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] validar se é um cep válido e retornar 400 caso não seja
- [ ] validar se o usuário existe e retornar 412 caso não
- [ ] em caso de erro inesperado retornar 500
- [ ] inserir o endereço do cliente, retornar 201 e os dados

-Alterar cliente (logado)
- [ ] inputs: uuid do cliente, nome, email, telefone, data de nascimento, senha e confirmação de senha
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar inputs e retornar 400 caso algum campo esteja faltando
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] se o telefone for informado, validar se é um celular válido, se não retornar 400
- [ ] se o email for informado, validar se é válido, se não retornar 400
- [ ] validar se algum outro campo além do uuid foi informado, caso não retornar 412
- [ ] se o email for informado, validar se está em uso, caso esteja retornar 412 
- [ ] em caso de erro inesperado retornar 500
- [ ] alterar os dados, retornar 200 e os dados

-Alterar endereço (logado)
- [ ] inputs: uuid do usuário, cep, logradouro, numero, bairro, cidade, uf e complemento
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: complemento é opcional
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] validar se é um cep válido e retornar 400 caso não seja
- [ ] validar se o usuário existe e retornar 412 caso não
- [ ] validar se o usuário tem endereço cadastrado e retornar 412 caso não
- [ ] em caso de erro inesperado retornar 500
- [ ] alterar os dados, retornar 200 e os dados

-Cadastro de pets (logado)
- [ ] inputs: uuid do cliente, nome, raça, cor, porte e considerações
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: considerações é opcional
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] validar se o usuário existe e retornar 412 caso não
- [ ] em caso de erro inesperado retornar 500
- [ ] inserir o pet, retornar 201 e uma lista de pets do cliente

-alterar pet (logado)
- [ ] inputs: uuid do cliente, uuid do pet, nome, raça, cor, porte e considerações
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: considerações é opcional
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] validar se o usuário existe e retornar 412 caso não
- [ ] validar se o pet existe, se é desse usuário e retornar 412 caso não
- [ ] em caso de erro inesperado retornar 500
- [ ] alterar o pet, retornar 200 e uma lista de pets do cliente

-remover pet (logado)
- [ ] inputs: uuid do cliente, uuid do pet
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: considerações é opcional
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] validar se o usuário existe e retornar 412 caso não
- [ ] validar se o pet existe, se é desse usuário e retornar 412 caso não
- [ ] em caso de erro inesperado retornar 500
- [ ] deletar o pet e retornar 204

-Agendar banho ou tosa (logado)
- [ ] inputs: serviço (banho, tosa ou banho e tosa), data, pet, observações
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar os inputs e retornar 400 caso algum campo esteja faltando. OBS: observações é opcional
- [ ] em caso de erro inesperado retornar 500
- [ ] em caso de sucesso retornar 201 e os dados do agendamento

-Consultar seus agendamentos(logado)
- [ ] inputs: uuid do cliente, offset e limit
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] em caso de erro inesperado retornar 500
- [ ] caso não tenha agendamentos, retornar 200 e uma lista vazia
- [ ] em caso de sucesso retornar 200 e uma lista

-Consultar detalhes do agendamento (logado)
- [ ] inputs: uuid do cliente, uuid do agendamento
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar se uuid válido e retornar 400 caso não seja
- [ ] em caso de erro inesperado retornar 500
- [ ] caso o agendamento não exista, retornar 204
- [ ] em caso de sucesso retornar 200 e os dados

-Cancelar um agendamento (logado)
- [ ] inputs: uuid do cliente, uuid do agendamento
- [ ] validar se token de acesso válido, caso não retornar 401
- [ ] validar se pelo token de acesso o usuário tem acesso a essa funcionalidade, caso não retornar 403
- [ ] validar se uuid válido e retornar 400 caso não seja
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