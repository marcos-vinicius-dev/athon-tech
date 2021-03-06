
#  Projeto de avaliação



Este é um projeto para o Athon Tech , ele consome dados de uma API REST que apresenta dados criminais para um agente da lei.



##  Arquitetura



O projeto é um SPA construído com [Quasar Framework](https://quasar.dev/) .

Sistemas de componentes utilizando a metodologia [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)



###  Estrutura de Pastas



- src/

	- assets `recursos dinâmicos (processado pelo webpack)`

	- boot `arquivos de inicialização`

	- components/ `componentes do aplicativo`

	- api `componentes responsaveis pela comunicação com a api`

	- atoms `Atomic Design`

	- molecules `Atomic Design`

	- organisms `Atomic Design`

	- css `definições de estilo (Scss)`

	- helpers `funções auxiliares`

	- layouts `elementos que envolvem o conteúdo da página`

	- mixins `funcionalidade reutilizável`

	- pages `paginas da aplicação`

	- router `Rotas da aplicação - Vue Router`





##  Configurações do Projeto

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


##  Guia de estilo



**Javascript** e **Vue.js**: são vinculado por [eslint](https://eslint.org/docs/user-guide/getting-started) com as regras de [estilo padrão de JavaScript](https://standardjs.com/) e [estilo padrão de Vue.js](https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention).

Utilizado **pré processador** de template **[Pugjs](https://github.com/pugjs/pug)** e **Scss** para o estilo

Os **commits** do **Git** seguem as [mensagens de commit semântico](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) .



###  Plugins utilizados e recursos

[VeeValidate](https://vee-validate.logaretm.com/v3) Estrutura de validação de formulário baseada em modelo para Vue.js

[Vue Clipboard2](https://github.com/Inndy/vue-clipboard2#readme) Copiar textos sem um botão específico



#  objetivos



- [x] Listar todos os crimes e realizar buscas (por texto ou por filtros)

- [x] Ver detalhes de um crime específico

- [x] Adicionar um novo crime

- [x] Remover um crime

- [x] Utilização do componente Intersection para otimização da página e da lista de crimes



#  Altercações Layout - Motivos de mudança



Remoção do **Neomorfismo** dos botões e dos cards. Por apresentar alguns problemas.

- **Visibilidade / Acessibilidade**

	- Botões não tem contraste suficiente na passagem dos estados (ex: hover), Telas com baixa qualidade ou baixo contraste esta diferença de estado não é visível.

	- Perde a capacidade da utilização de um **[Botão CTA — Call to Action](https://medium.com/tableless/botoes-em-ui-design-e8e8a7473747)**, que sua principal função é chamar atenção do usuário.

**Home**
- Search e filtros - Optei pela utilização de uma **Search Box Design**. Quando o usuário acessa a página sua atenção tende a se concentrar na caixa de pesquisa.

- Order By - Foi movido para próximo da lista. Ser apresentado junto aos outros campos obrigaria inconscientemente o usuário a clicar no botão search, desta forma essa mudança facilita a ação da filtragem imediata, utilizando apenas um campo isolado para isso.

**Detalhes do crime**

- Botão de delete é apresentado onde costuma ser apresentado o botão de fechar modal. [Best Practices for Modals / Overlays / Dialog Windows](https://uxplanet.org/best-practices-for-modals-overlays-dialog-windows-c00c66cddd8c)

- Avatar com tamanho muito superior aos elementos do modal

- Estrutura de dados não correspondente com a API. Segundo a API um criminoso, possui um crime atrelado a ele. No layout essa visualização não acontece. Desta forma foi criado um lista de criminosos, com seus respectivos nomes e crime cometido.

 - Uma arma não está relacionada a um criminoso em si e sim ao crime em geral. Desta forma foi criado uma lista para ser apresentas essas armas.



**Página novo crime**

- Reestruturação de campos, estrutura de dados não correspondente com a API. Deve ser claro ao usuário que um criminoso possui um tipo de crime atrelado a ele. Os campos devem estar no mesmo contexto. Campo de armas não faz parte da estrutura criminoso, ou seja, deve fazer parte de um contexto diferente.

- **Formulário com scroll horizontal** - a rolagem horizontal não é natural para os usuários, enquanto a rolagem vertical é o que o usuário espera. Desta forma optei por criar duas colunas para o melhor aproveitamento da página. Utilizei este material de apoio [Designing More Efficient Forms: Structure, Inputs, Labels and Actions](https://uxplanet.org/designing-more-efficient-forms-structure-inputs-labels-and-actions-e3a47007114f)