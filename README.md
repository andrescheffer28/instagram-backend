# App

Instagram Ct Junior.

## RFs (Requisitos funcionais)

- [X] Deve ser possível fazer login;
- [X] Deve ser possível criar um novo usuário;
- [ ] Deve ser possível retornar posts;
- [x] Deve ser possível editar o próprio perfil;
- [X] Deve ser possível editar o próprio post;
- [ ] Deve ser possível deletar o próprio post;
- [X] Deve ser possível criar o próprio post;
- [ ] Deve ser possível retornar os próprios posts;

## RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não deve poder se cadastrar com um username duplicado;

- [ ] O usuário não deve poder retornar posts com um token inválido;

- [X] O usuário não deve poder trocar a foto de perfil de outro usuário;

## RNFs (Requisitos não-funcionais)

- [X] O usuário deve ser identificado por um JWT (JSON Web Token);
- [X] A senha do usuário deve ser encriptografada usando o bcrypt
- [ ] O Post mais recente deve estar na posição 0
 
