
# 🚗 Sistema Automotivo — Gestão de Estoque de Veículos

> Sistema web para gerenciamento de estoque de veículos em concessionárias, desenvolvido com Java + Spring Boot + MySQL.

---

## 📋 Sobre o Projeto

Sistema desenvolvido como trabalho acadêmico da disciplina de **Programação Orientada a Objetos**, simulando um ambiente real de gestão de estoque automotivo. A aplicação permite cadastrar, consultar, filtrar e gerenciar veículos, marcas e modelos por meio de uma API REST.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| Java | 17 (LTS) | Linguagem principal — robusta e orientada a objetos |
| Spring Boot | 3.5.0 | Framework para criação de APIs REST |
| Spring Data JPA | Incluído | Abstração do acesso ao banco de dados |
| MySQL | 8.x | Banco de dados para produção |
| H2 Database | 2.x | Banco em memória para desenvolvimento/testes |
| Maven | Wrapper 3.x | Gerenciador de dependências e build |
| HTML/CSS/JS | Vanilla | Frontend servido pelo próprio Spring Boot |

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC adaptado para REST**, dividido em camadas bem definidas:

```
src/
├── model/          # Entidades JPA (Marca, Modelo, Veiculo, StatusVeiculo)
├── repository/     # Interfaces Spring Data JPA
├── controller/     # Controllers REST (endpoints HTTP)
└── resources/
    └── static/     # Frontend HTML/CSS/JS
```

### Fluxo de uma Requisição

```
Browser → HTTP Request → Controller → Repository → JPA → MySQL/H2
                                                           ↓
Browser ← JSON (Jackson) ←←←←←←←←←←←←←←←←←←←←← Resultado
```

---

## 🗂️ Entidades do Sistema

### Hierarquia

```
Marca (1) ──────→ (N) Modelo (1) ──────→ (N) Veiculo
```

| Entidade | Atributos principais |
|---|---|
| **Marca** | id, nome |
| **Modelo** | id, nome, marca_id |
| **Veiculo** | id, modelo_id, ano, cor, preço, quilometragem, status |
| **StatusVeiculo** | `DISPONIVEL` \| `VENDIDO` \| `RESERVADO` |

---

## 🔌 Endpoints da API

### Marcas
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/marcas` | Lista todas as marcas |
| `POST` | `/api/marcas` | Cria nova marca |
| `PUT` | `/api/marcas/{id}` | Atualiza marca |
| `DELETE` | `/api/marcas/{id}` | Remove marca |

### Modelos
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/modelos` | Lista todos os modelos |
| `GET` | `/api/modelos/marca/{marcaId}` | Modelos de uma marca |
| `POST` | `/api/modelos` | Cria novo modelo |

### Veículos
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/veiculos` | Lista todos os veículos |
| `POST` | `/api/veiculos` | Cadastra novo veículo |
| `PUT` | `/api/veiculos/{id}` | Atualiza dados do veículo |
| `DELETE` | `/api/veiculos/{id}` | Remove veículo |
| `GET` | `/api/veiculos/filtrar` | Filtra por múltiplos critérios |

#### Parâmetros de filtro disponíveis:
```
GET /api/veiculos/filtrar?marcaId=&modeloId=&ano=&status=&precoMin=&precoMax=
```

---

## ✅ Requisitos Funcionais

- **RF01** — Cadastro de veículos com modelo, marca, ano, cor, preço, quilometragem e status
- **RF02** — Cadastro de marcas com nome único
- **RF03** — Cadastro de modelos associados a marcas
- **RF04** — Consulta e filtro por múltiplos critérios
- **RF05** — Atualização de preço, quilometragem, cor e status
- **RF06** — Remoção de veículos do estoque
- **RF07** — API REST com retorno JSON

---

## 🎯 Conceitos de POO Aplicados

| Conceito | Aplicação no Projeto |
|---|---|
| **Classes e Objetos** | `Marca`, `Modelo`, `Veiculo` como classes do domínio |
| **Encapsulamento** | Atributos `private` com getters/setters públicos |
| **Herança** | Repositories estendem `JpaRepository<T, Long>` |
| **Abstração** | Interfaces de Repository abstraem o acesso ao banco |
| **Polimorfismo** | Endpoint de filtro aceita parâmetros opcionais (`null`) |
| **Enumeração** | `StatusVeiculo` com estados tipados e seguros |
| **Annotations** | `@Entity`, `@ManyToOne`, `@NotNull`, `@RestController` |

---

## ⚙️ Como Executar

### Pré-requisitos
- Java 17+
- Maven (ou use o wrapper incluso `./mvnw`)
- MySQL 8.x (para produção)

### Desenvolvimento (H2 em memória)
```bash
./mvnw spring-boot:run
```
Acesse: `http://localhost:8080`

### Produção (MySQL)
1. Configure as credenciais no `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_automotivo
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```
2. Execute:
```bash
./mvnw spring-boot:run -Dspring.profiles.active=prod
```

---

## 📌 Observações

- O sistema é projetado para **uma única unidade** (sem suporte a múltiplas concessionárias nesta versão)
- Veículos vendidos **não são removidos**, apenas têm o status atualizado para `VENDIDO` (fins de histórico)
- A interface é **responsiva**, acessível em dispositivos móveis e tablets
- Consultas e filtros são otimizados para responder em **menos de 2 segundos**

---

## 👩‍💻 Autora: Thais Ribeiro de Aquino

Desenvolvido como projeto acadêmico — Disciplina de Programação Orientada a Objetos | Fevereiro de 2026
