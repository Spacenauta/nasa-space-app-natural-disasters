## Requisitos Funcionais (RF)

- [ ] RF01 - API de Dados da NASA:
  O backend deve ser capaz de realizar requisições e consumir dados brutos de, no mínimo, duas APIs de dados abertos da NASA (e/ou agências parceiras, ex: GOES, MODIS, JPL).

- [ ] RF02 - Pré-processamento de Dados:
  O backend deve pré-processar e normalizar os dados brutos da NASA (ex: filtrar, converter unidades, agregar) antes de passá-los para o motor de IA ou para o frontend.

- [ ] RF03 - Motor de Previsão:
  O backend deve executar o modelo de Inteligência Artificial (ou a lógica de simulação do modelo) que recebe os dados pré-processados e retorna uma probabilidade de risco (ex: Risco Baixo, Médio, Alto) para uma coordenada geográfica específica.

- [ ] RF04 - API de Risco Geo-referenciado:
  Deve existir um endpoint (rota) que aceita uma coordenada ou local (Estado/Província) e retorna o status de risco de catástrofe atualizado (RF03).

- [ ] RF05 - Agente de Proteção API: 
  Deve existir um endpoint para o Agente de IA (chatbot) que aceita a localização do usuário e o tipo de risco (ex: Inundação) e retorna instruções de proteção específicas.

- [ ] RF06 - Cache de Dados:
  O backend deve implementar um mecanismo de cache para armazenar dados estáticos ou acessados frequentemente, evitando requisições repetidas às APIs externas da NASA.

## Requisitos Não Funcionais (RNF)

- [ ] RNF01 - Disponibilidade (24/7):
  O backend deve estar disponível e funcional durante todo o período de 48 horas do hackathon e, idealmente, após o deploy (publicação).

- [ ] RNF02	- Segurança da API Key:
  A(s) chave(s) de API da NASA devem ser armazenadas de forma segura (usando .env) e nunca expostas ao frontend.

- [ ] RNF03	- Tempo de Resposta:
  A API de Previsão (RF04) deve responder em menos de 3 segundos para fornecer alertas em tempo hábil.

## Regras de Negócio (RN)

- [ ] RN01 - Limites de Dados	/ Filtragem
- [ ] RN02 - Priorização de Risco	/ Lógica de IA
- [ ] RN03 - Mapeamento Geográfico / Geo-referenciamento
- [ ] RN04 - Resposta Padrão / Usabilidade
- [ ] RN05 - Formatos de Dados / Integração
