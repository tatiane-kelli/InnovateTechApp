# InnovateTech App
Aplicação mobile desenvolvida com React Native e JavaScript, utilizando a Expo CLI. O InnovateTechApp exibe uma listagem de alunos consumindo uma API para ter acesso a esses dados.

## Como executar
#### 1. Instale o aplicativo Expo Go em seu celular:
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&pli=1
- IOS: https://apps.apple.com/us/app/expo-go/id982107779

#### 2. Com o projeto instalado na máquina, rode o comando `yarn install` para baixar todas as dependências e depois `yarn start` para iniciar o bundler.
#### 3. Escaneie o QR Code ou acesse a URL que serão exibidos no terminal utilizando o Expo Go para visualizar o projeto sendo executado no seu celular.
Observações: pode ser necessário limpar o cache da aplicação, para isso utilize o comando `yarn start --reset-cache`
#### 4. Uma alternativa também é baixar o apk gerado com a EAS Build através do link:
- Android: https://expo.dev/artifacts/eas/u3QfX1bh7ahiArFcRWnzPs.aab

## Stacks utilizadas 💻
- React Native (desenvolvimento)
- React (desenvolvimento)
- JavaScript (desenvolvimento)
- Expo CLI (execução e desenvolvimento do projeto)
- AsyncStorage (para armazenar os dados em cache)
- Axios (para consumir a API)

## Funcionalidades ⚙️
- Listagem de alunos;
- Visualização individual de alunos (utilizando modal);
- Armazenamento dos primeiros 20 alunos carregados em cache;
- Filtro por gênero;
- Pesquisa através do nome ou sobrenome.

## Paleta de cores 🎨
Considerando um app que lista estudantes, pensando num contexto mais formal/colegial a seguinte paleta de cores foi utilizada no layout: 
- Paleta: https://coolors.co/f5f5f4-415a77-778da9-cdd5e0
