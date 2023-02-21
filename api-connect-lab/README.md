<p align="center"><a href="https://imgur.com/vqDdexu"><img src="https://i.imgur.com/vqDdexu.png" title="source: imgur.com" /></a></p>

## Índice

- [Índice](#índice)
- [Descrição do Projeto](#-descrição-do-projeto)
- [Resquisitos da aplicação](#-requisitos-da-aplicação)
- [Estrutura](#-estrutura)
- [Instalação](#-instalação)

## 💾 Descrição do projeto

Este projeto consiste em uma aplicação back-end onde o usuário poderá gerenciar e integrar os seus dispositivos smart.

## 🌐 Requisitos da aplicação

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)

## 🏗️ Estrutura

```bash
connect-lab/
 ┣ src
 ┃ ┣ config
 ┃ ┃ ┗ ormconfig.ts
 ┃ ┣ controllers
 ┃ ┃ ┣ authentication.controller.ts
 ┃ ┃ ┣ devices.controller.ts
 ┃ ┃ ┗ users.controller.ts
 ┃ ┣ dto
 ┃ ┃ ┣ chage-password.dto.ts
 ┃ ┃ ┣ create-device.dto.ts
 ┃ ┃ ┣ create-user.dto.ts
 ┃ ┃ ┣ link-device.dto.ts
 ┃ ┃ ┗ login.dto.ts
 ┃ ┣ entities
 ┃ ┃ ┣ device-info.entity.ts
 ┃ ┃ ┣ device.entity.ts
 ┃ ┃ ┣ user-address.entity.ts
 ┃ ┃ ┣ user-devices.entity.ts
 ┃ ┃ ┗ user.entity.ts
 ┃ ┣ migrations
 ┃ ┃ ┣ 1673569649288-CreateUserTable.ts
 ┃ ┃ ┗ 1673588893301-CreateDevicesTable.ts
 ┃ ┣ module
 ┃ ┃ ┣ auth-login.module.ts
 ┃ ┃ ┣ devices.module.ts
 ┃ ┃ ┗ users.module.ts
 ┃ ┣ services
 ┃ ┃ ┣ authentication.service.ts
 ┃ ┃ ┣ devices.service.ts
 ┃ ┃ ┗ users.service.ts
 ┃ ┣ strategies
 ┃ ┃ ┗ jwt.strategy.ts
 ┃ ┣ app.controller.spec.ts
 ┃ ┣ app.controller.ts
 ┃ ┣ app.module.ts
 ┃ ┣ app.service.ts
 ┃ ┗ main.ts
 ┣ test
 ┃ ┣ app.e2e-spec.ts
 ┃ ┗ jest-e2e.json
 ┣ .eslintrc.js
 ┣ .example.env
 ┣ .gitignore
 ┣ .prettierrc
 ┣ nest-cli.json
 ┣ package-lock.json
 ┣ package.json
 ┣ README.md
 ┣ tsconfig.build.json
 ┗ tsconfig.json

```

## 💻 Instalação

- Acesse a pasta `./connect-lab`;
- Instalar a aplicação utilizando o comando `npm install`;
- O processo não deve retornar erros. `Warns` _(Avisos)_ não impedem seu funcionamento;
- Rodar a aplicação com `npm run start:dev`;
- Esse aplicativo requer, **excepcionalmente**, um arquivo `.env`, que deve ser inserido na raiz do projeto (`./connect-lab`);
- Existe um aquivo de exemplo na raiz do projeto nomeado de `.example.env`, que deve ser levado como base para a criação do arquivo .env utilizado na aplicação;
- Para injetar a lista de dispositivos, utilize o postman ou insomnia. Realize uma requisição `POST` no endpoint `localhost:3000/devices` e passar no corpo da requisição o conteúdo arquivo `devices.json`. Dessa forma todos os dispositivos serão criados e estarão acessíveis no front-end do projeto.

## 💻 Endpoints Disponíveis

### Criar um usuário:

```
POST: http://localhost:3000/users

Body: {
  "fullName": "John Doe",
  "email": "johndoe@email.com",
  "password": "john12345",
  "confirmPassword":"john12345",
  "zipCode":"12341234",
  "street":"Endereco da rua",
  "number":"123",
  "neighborhood":"Bairro",
  "city":"Cidade",
  "state":"UF"
}
```

### Efetuar Login:

```
POST: http://localhost:3000/auth/login

Body: {
	"email": "johndoe@email.com",
	"password": "john12345"
}
```

### Alterar Senha:

```
POST: localhost:3000/users/change-password

Header: Authorization Bearer token

Body: {
	"email": "johndoe@email.com",
	"oldPassword": "john12345",
	"newPassword": "john1234",
	"newPasswordConfirm": "john1234"
}
```

### Perfil do usuário:

```
GET: http://localhost:3000/users/profile

Header: Authorization Bearer token
```

**Resultado:**

```
{
	"id": 5,
	"fullName": "Huany Godeiro",
	"photoUrl": "default.jpg",
	"email": "huany@email.com",
	"phone": "N/A",
	"address": {
		"id": 4,
		"zipCode": "12341234",
		"street": "Endereco da rua",
		"number": "123",
		"neighborhood": "Bairro",
		"city": "Cidade",
		"state": "UF",
		"complement": null
	}
}
```

### Buscar lista de dispositivos:

```
GET: http://localhost:3000/devices

```

**Resultado:**

```
[
	{
		"name": "Interruptor conector inteligente",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/161376-1000-1000/ews_301_front_cima.jpg?v=637581675693070000",
		"info": {
			"virtual_id": 1,
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-40dBm"
		}
	},
	{
		"name": "Lâmpada LED",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/160115-1000-1000/ews_407_front_cor.jpg?v=637564221001370000",
		"info": {
			"virtual_id": 2,
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-70dBm"
		}
	},
	{
		"name": "Interruptor conector inteligente",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/161376-1000-1000/ews_301_front_cima.jpg?v=637581675693070000",
		"info": {
			"virtual_id": 3,
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-40dBm"
		}
	},
]
```

### Buscar dispositivo por ID:

```
GET: http://localhost:3000/devices/:id

```

**Resultado:**

```
{
	"name": "Hub de automação",
	"type": "Segurança eletrônica",
	"madeBy": "Intelbras",
	"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/165090-800-800/ICA_1001_pers_esq.png?v=637910746484730000",
	"info": {
		"virtual_id": 10,
		"ip_address": "127.0.0.1",
		"mac_address": "127.0.0.1",
		"signal": "-40dBm"
	}
}
```

### Adicionar dispositivo ao usuário:

```
POST: http://localhost:3000/devices/link

Header: Authorization Bearer token

Body:  {
    "deviceId": 21,
    "userId": 5,
    "location": "Sala",
    "status": "Ligado"
}
```

### Buscar dispositivos vinculados ao usuário:

```
GET: http://localhost:3000/users/devices

Header: Authorization Bearer token
```

**Resultado:**

```
[
	{
		"id": 6,
		"location": "Corredor",
		"status": "Ligado",
		"device": {
			"name": "Interruptor conector inteligente",
			"type": "Energia",
			"madeBy": "Intelbras",
			"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/161376-1000-1000/ews_301_front_cima.jpg?v=637581675693070000",
			"info": {
				"virtual_id": 1,
				"ip_address": "127.0.0.1",
				"mac_address": "127.0.0.1",
				"signal": "-40dBm"
			}
		}
	},
	{
		"id": 7,
		"location": "Corredor",
		"status": "Ligado",
		"device": {
			"name": "Interruptor inteligente soquete",
			"type": "Energia",
			"madeBy": "Intelbras",
			"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/160121-800-800/ews_400_front2.jpg?v=637564240561700000",
			"info": {
				"virtual_id": 4,
				"ip_address": "127.0.0.1",
				"mac_address": "127.0.0.1",
				"signal": "-80dBm"
			}
		}
	},
]
```

### Buscar dispositivo do usuário:

```
GET: http://localhost:3000/users/device/:id

Header: Authorization Bearer token
```

**Resultado:**

```
{
	"id": 6,
	"location": "Corredor",
	"status": "Ligado",
	"device": {
		"name": "Interruptor conector inteligente",
		"type": "Energia",
		"madeBy": "Intelbras",
		"photoUrl": "https://intelbras.vteximg.com.br/arquivos/ids/161376-1000-1000/ews_301_front_cima.jpg?v=637581675693070000",
		"info": {
			"virtual_id": 1,
			"ip_address": "127.0.0.1",
			"mac_address": "127.0.0.1",
			"signal": "-40dBm"
		}
	}
}
```
