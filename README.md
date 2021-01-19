# Projeto de avaliação

Este é um projeto para o Athon Tech , ele consome dados de uma API REST que apresenta dados criminais para um agente da lei.

## Arquitetura

O projeto é um SPA construído com [Quasar Framework](https://quasar.dev/) .
Sistemas de componentes utilizando a metodologia [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

### Estrutura de Pastas

 - src/
	 - assets         `recursos dinâmicos (processado pelo webpack)`
	 - boot            `arquivos de inicialização`
	 - components/ `componentes do aplicativo`
		 - api `componentes responsaveis pela comunicação com a api`
		 - atoms `Atomic Design`
		 - molecules `Atomic Design`
		 - organisms `Atomic Design`
	 - css              `definições de estilo (Scss)`
	 - helpers	   `funções auxiliares`
	 - layouts  `elementos que envolvem o conteúdo da página`
	 - mixins   `funcionalidade reutilizável`
	 - pages    `paginas da aplicação`
	 - router        `Rotas da aplicação - Vue Router`



## Configurações do Projeto
```bash
# Install the dependencies
yarn install

#Start the app in development mode (hot-code reloading, error reporting, etc.)
quasar dev

# Lint the files
yarn run lint

# Build the app for production
quasar build
```
[Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Guia de estilo

**Javascript** e **Vue.js**: são vinculado por [eslint](https://eslint.org/docs/user-guide/getting-started) com as regras de [estilo padrão de JavaScript](https://standardjs.com/) e [estilo padrão de Vue.js](https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention).
Utilizado **pré processador** de template **[Pugjs](https://github.com/pugjs/pug)** e **Scss** para o estilo
Os **commits** do **Git** seguem as [mensagens de commit semântico](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) .

### Plugins utilizados e recursos
[VeeValidate](https://vee-validate.logaretm.com/v3) Estrutura de validação de formulário baseada em modelo para Vue.js
[Vue Clipboard2](https://github.com/Inndy/vue-clipboard2#readme) Copiar textos sem um botão específico

# objetivos

 - [x] Listar todos os crimes e realizar buscas (por texto ou por filtros)
 - [x] Ver detalhes de um crime específico
 - [x] Adicionar um novo crime
 - [x] Remover um crime
 - [x] Utilização do componente Intersection para otimização da página e da lista de crimes
