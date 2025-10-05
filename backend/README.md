## Requisitos Funcionais (RF)

- [x] RF01 - O backend deve consumir dados brutos de, no mínimo, duas APIs de dados abertos da NASA (ex: GOES, MODIS) para alimentar o motor de previsão.

- [x] RF02 - O backend deve pré-processar e normalizar os dados brutos da NASA (filtrar, agregar) antes de serem usados pela IA ou retornados.

- [x] RF03 - O backend deve executar a lógica de previsão de risco (IA ou simulação) que recebe os dados processados e retorna uma probabilidade de risco (Baixo, Médio, Alto).

- [x] RF04 - Deve existir uma rota protegida (RF08) que aceita uma coordenada (Lat/Lon) e retorna o status de risco de catástrofe atualizado (RF03).

- [x] RF05 - Deve existir uma rota protegida (RF08) para o chatbot que aceita localização e tipo de risco e retorna instruções de proteção específicas.

- [x] RF06 - Implementar cache simples para dados da NASA acessados frequentemente (evitando o limite de requisições do hackathon).

- [x] RF07 - O sistema deve permitir que novos usuários se registrem e realizem login, validando credenciais.

- [x] RF08 - O backend deve emitir e validar tokens JWT. As rotas de dados (RF04 e RF05) devem ser protegidas, exigindo um token válido.

## Requisitos Não Funcionais (RNF)

- [x] RNF01 - Operacionalidade O backend deve estar funcional durante as 48h do hackathon.

- [x] RNF02 - A(s) chave(s) de API da NASA e a chave secreta JWT (JWT_SECRET) devem ser armazenadas de forma segura (usando .env).

- [x] RNF03 - A API de Previsão (RF04) deve responder em menos de 3 segundos, aproveitando a velocidade do Fastify.

- [x] RNF04 - A lógica central (RF02, RF03) deve ser modular, facilitando testes rápidos e debugging sob pressão.

## Regras de Negócio (RN)

- [x] RN01 - O sistema só deve processar dados da NASA que se enquadrem dentro de um limite de tempo pré-definido (ex: últimas 72 horas).

- [x] RN02 - Se múltiplos riscos estiverem ativos para uma localização, o sistema deve sempre reportar o risco de nível mais alto.

- [x] RN03 - A previsão de risco deve ser mapeada para o nível de Estado/Província com base nas coordenadas fornecidas.

- [x] RN04 - Se o backend não conseguir processar a previsão (ex: dados da NASA indisponíveis), a API deve retornar uma mensagem de "Dados Indisponíveis" (e não uma falha 500 ou um risco falso).

- [x] RN05 - Todos os dados retornados ao frontend devem aderir rigorosamente ao formato JSON (use a validação de esquema do Fastify).

- [x] RN06 - Após o login, o backend deve usar a localização preferida do usuário (RF10) como padrão para consultas de risco.
