# ipreguica-tv

# Sobre

Projeto de automação e controle remoto de uma máquina.

Utilizando NodeJS, o controle do teclado e do mouse pode ser feito remotamente através de uma página html servida pelo servidor.

### Pacotes utilizados
> ###### [`express`](https://www.npmjs.com/package/express, "express")
> ###### [`robotjs`](https://www.npmjs.com/package/robotjs, "robotjs")
> ###### [`screenshot-desktop`](https://www.npmjs.com/package/screenshot-desktop, "screenshot-desktop")
> ###### [`socket.io`](https://www.npmjs.com/package/socket.io, "socket.io")

# Instalação
> ## `npm install`

> ## `yarn install`

Os pacotes necessários incluídos no `package.json` serão instalados.

### Observação

Para que o pacote **Robot.JS** funcione corretamente é necessário ter _[Python](https://www.python.org/, "python.org")_ instalado na máquina, e também o _[pacote de desenvolvimento desktop com C++](https://visualstudio.microsoft.com/vs/features/cplusplus/, "visualstudio.microsoft.com/vs/features/cplusplus/")_ da Microsoft.

# Utilização
> ## `npm start`

> ## `yarn start`

Quando iniciado, o servidor servirá uma página no endereço raíz `localhost:5000/`, que pode ser acessada por qualquer dispositivo da mesma rede.