## 🚀 Natural Disasters: Previsão e Proteção Inteligente contra Catástrofes

O Natural Disasters é um sistema de alerta antecipado global que transforma dados abertos da NASA em segurança personalizada. Ele utiliza Inteligência Artificial (IA) para prever riscos de catástrofes naturais (inundações, secas, incêndios, etc.) e fornece instruções de proteção geo-referenciadas no nível de Continente, País e Estado/Província para usuários autenticados.

Desenvolvido para o NASA International Space Apps Challenge 2025.

## 💡 A Solução e o Desafio da NASA

#### O Problema

Comunidades carecem de informações em tempo hábil e de orientações de proteção personalizadas durante eventos climáticos extremos. Sistemas genéricos falham em oferecer alertas e checklists específicos para a localização do cidadão.

#### Nossa Solução

O Natural Disasters resolve essa lacuna através de três pilares:

1. Autenticação e Localização: Usuários se registram e têm suas preferências de localização salvas, permitindo alertas personalizados e protegidos (via JWT).

2. Motor de Previsão (Backend com IA): Analisa séries temporais de dados de satélite da NASA em um backend de alta performance para calcular a probabilidade de risco em tempo quase real.

3. Agente de Proteção (Frontend): Um chatbot interativo (Agente de IA) que fornece checklists de emergência, rotas de fuga e informações de abrigo específicas para a localização e o tipo de desastre detectado.

#### 🛰️ Uso Essencial de Dados Abertos da NASA

- Nosso projeto depende fundamentalmente do uso e do pré-processamento de múltiplos conjuntos de dados abertos da NASA (e agências parceiras), que alimentam o nosso Motor de Previsão:

- Earth Data / SERVIR / MODIS/VIIRS: Utilizados para monitoramento de condições da superfície da Terra (temperatura, umidade do solo, vegetação) essenciais para prever secas e incêndios.

- GOES/TEMPO: Dados em tempo real sobre padrões climáticos e precipitação para alerta de inundações e tempestades.

- JPL/ASTER GDEM: Utilizado para dados de elevação e topografia para mapear áreas de alto risco de inundação e deslizamentos de terra.
