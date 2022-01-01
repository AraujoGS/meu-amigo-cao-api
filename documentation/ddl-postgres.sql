CREATE TABLE IF NOT EXISTS CLIENTES (
  id_cliente  UUID CONSTRAINT PK_ID_CLIENTE PRIMARY KEY,
  nome_cliente VARCHAR(100) NOT NULL,
  senha_cliente VARCHAR(150) NOT NULL,
  email_cliente VARCHAR(120) CONSTRAINT UK_EMAIL_CLIENTE UNIQUE NOT NULL,
  telefone_cliente VARCHAR(11) CONSTRAINT UK_TELEFONE_CLIENTE UNIQUE NOT NULL,
  data_nascimento_cliente DATE NOT NULL,
  token_acesso VARCHAR(250),
  permissao VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS ENDERECOS (
  id_endereco UUID CONSTRAINT PK_ID_ENDERECO PRIMARY KEY,
  cep VARCHAR(8) NOT NULL,
  logradouro  VARCHAR(100) NOT NULL,
  numero INTEGER NOT NULL,
  bairro VARCHAR(60) NOT NULL,
  complemento VARCHAR(80),
  cidade  VARCHAR(100) NOT NULL,
  uf VARCHAR(2) NOT NULL,
  id_cliente UUID,
  CONSTRAINT FK_ID_CLIENTE_ENDERECOS
    FOREIGN KEY (id_cliente)
     REFERENCES CLIENTES (id_cliente)
);

CREATE TABLE IF NOT EXISTS PORTE_PET (
  id_porte  SMALLINT CONSTRAINT PK_ID_PORTE PRIMARY KEY,
  titulo_porte  VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS RACA_PET (
  id_raca  SMALLINT CONSTRAINT PK_ID_RACA PRIMARY KEY,
  nome_raca  VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS SERVICOS (
  id_servico  SMALLINT CONSTRAINT PK_ID_SERVICO PRIMARY KEY,
  titulo_servico  VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS PETS (
  id_pet  UUID CONSTRAINT PK_ID_PET PRIMARY KEY,
  nome_pet  VARCHAR(100) NOT NULL,
  cor_pet   VARCHAR(120) NOT NULL,
  consideracoes VARCHAR(300),
  id_cliente UUID,
  id_raca SMALLINT,
  id_porte SMALLINT,
  CONSTRAINT FK_ID_CLIENTE_PETS
    FOREIGN KEY (id_cliente)
      REFERENCES CLIENTES (id_cliente),
  CONSTRAINT FK_ID_RACA_PETS
    FOREIGN KEY (id_raca)
      REFERENCES RACA_PET (id_raca),
  CONSTRAINT FK_ID_PORTE_PETS
    FOREIGN KEY (id_porte)
      REFERENCES PORTE_PET(id_porte)
);

CREATE TABLE IF NOT EXISTS AGENDAMENTOS (
  id_agendamento  UUID CONSTRAINT PK_ID_AGENDAMENTO PRIMARY KEY,
  data_agendamento  DATE NOT NULL,
  observacoes VARCHAR(300),
  id_pet UUID,
  id_servico SMALLINT,
  CONSTRAINT FK_ID_PET_AGENDAMENTOS
    FOREIGN KEY (id_pet)
      REFERENCES PETS (id_pet),
  CONSTRAINT FK_ID_SERVICO_AGENDAMENTOS
    FOREIGN KEY (id_servico)
      REFERENCES SERVICOS (id_servico)
);

INSERT INTO PORTE_PET (id_porte, titulo_porte)
VALUES (1, 'MINI'),
  (2, 'PEQUENO'),
  (3, 'MEDIO'),
  (4, 'GRANDE')
ON CONFLICT (id_porte) DO UPDATE SET titulo_porte = EXCLUDED.titulo_porte;

INSERT INTO SERVICOS (id_servico, titulo_servico)
VALUES (1, 'BANHO'),
  (2, 'TOSA'),
  (3, 'BANHO E TOSA')
ON CONFLICT (id_servico) DO UPDATE SET titulo_servico = EXCLUDED.titulo_servico;

INSERT INTO RACA_PET (id_raca, nome_raca)
VALUES (1, 'Akita'),
  (2, 'Basset hound'),
  (3, 'Beagle'),
  (4, 'Bichon frisé'),
  (5, 'Boiadeiro australiano'),
  (6, 'Border collie'),
  (7, 'Boston terrier'),
  (8, 'Boxer'),
  (9, 'Buldogue francês'),
  (10, 'Buldogue inglês'),
  (11, 'Bull terrier'),
  (12, 'Cane corso'),
  (13, 'Cavalier king charles spaniel'),
  (14, 'Chihuahua'),
  (15, 'Chow chow'),
  (16, 'Cocker spaniel inglês'),
  (17, 'Dachshund'),
  (18, 'Dálmata'),
  (19, 'Doberman'),
  (20, 'Dogo argentino'),
  (21, 'Dogue alemão'),
  (22, 'Fila brasileiro'),
  (23, 'Golden retriever'),
  (24, 'Husky siberiano'),
  (25, 'Jack russell terrier'),
  (26, 'Labrador retriever'),
  (27, 'Lhasa apso'),
  (28, 'Lulu da pomerânia'),
  (29, 'Maltês'),
  (30, 'Mastiff inglês'),
  (31, 'Mastim tibetano'),
  (32, 'Pastor alemão'),
  (33, 'Pastor australiano'),
  (34, 'Pastor de Shetland'),
  (35, 'Pequinês'),
  (36, 'Pinscher'),
  (37, 'Pit bull'),
  (38, 'Poodle'),
  (39, 'Pug'),
  (40, 'Rottweiler'),
  (41, 'Schnauzer'),
  (42, 'Shar-pei'),
  (43, 'Shiba'),
  (44, 'Shih tzu'),
  (45, 'Staffordshire bull terrier'),
  (46, 'Weimaraner'),
  (47, 'Yorkshire'),
  (48, 'Outro')
ON CONFLICT (id_raca) DO UPDATE SET nome_raca = EXCLUDED.nome_raca