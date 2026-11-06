# Atualização de dependências — 2026-11-06

O projeto permanece em Next.js Pages Router, com os mesmos componentes, CSS e algoritmos.
Gerenciador preservado: Yarn Classic 1.22.22. O yarn.lock estava removido no estado inicial e foi regenerado. Ambiente validado: Node 24.13.0; usar Node 24 LTS.

| Dependência | Antes | Depois |
| --- | --- | --- |
| next | 10.1.3 | 16.4.5 |
| react / react-dom | 17.0.2 | 19.3.1 |
| react-icons | ^4.2.0 | 5.7.0 |
| typescript | ^4.2.4 | 6.0.3 |
| @types/node | ^14.14.41 | 24.19.2 (faixa ^24) |
| @types/react | ^17.0.4 | 19.3.0 |
| @types/react-dom | ausente | 19.3.0 |
| eslint | ^7.25.0 | 9.39.5 |
| eslint-config-prettier | ^8.3.0 | 10.1.8 |
| prettier | ^2.2.1 | 3.9.10 |
| eslint-config-next | ausente | 16.4.5 |

## Compatibilidade e alterações

- Links internos usam a API atual de next/link, mantendo classes, destinos e atributos nas âncoras renderizadas.
- Textos dinâmicos de title/desc do SVG passam a ser strings únicas, corrigindo divergência de hidratação detectada com React 19. Conteúdo e acessibilidade preservados.
- PropsWithChildren explicita children, removido do tipo implícito React.FC nas tipagens modernas.
- TypeScript usa moduleResolution bundler e JSX automático, exigidos pelo Next atual. Target ES2017 substitui ES5, depreciado no TS6; navegadores antigos fora do suporte do Next atual não são mais suportados.
- Configuração ESLint flat oficial do Next substitui a configuração antiga inválida (plugin ausente e entradas Prettier removidas). Airbnb limita peers a ESLint 7/8; os plugins React, Hooks, import, acessibilidade e parser passam a ser gerenciados pelo eslint-config-next.
- Removidos react-d3-tree e react-modal: nenhuma importação ou uso encontrado em todo o código atual. O desenho da árvore já usa SVG próprio.
- Removido eslint-plugin-prettier em favor de Prettier separado e eslint-config-prettier, evitando acoplar formatação ao lint. Corrigido singeQuote para singleQuote na configuração existente. Sem reformatação em massa.
- Exceção local documentada para react-hooks/set-state-in-effect no reset existente da seleção, preservando o comportamento e evitando uma refatoração fora do escopo.
- Scripts lint e typecheck adicionados; não havia comandos nem suíte de testes no projeto original.

## Limites e segurança

- ESLint 10.14.0 não foi instalado: eslint-plugin-react declara suporte somente até ESLint 9. O registro sinaliza ESLint 9.39.5 como fora de suporte; migrar quando os plugins declararem peers compatíveis. Nenhum conflito foi ignorado.
- TypeScript 7.0.2 não foi instalado: typescript-eslint aceita TypeScript <6.1.0. TS6.0.3 é a última versão compatível consultada.
- @types/node 26 não foi instalado: tipagem alinhada ao runtime Node 24.
- Auditoria Yarn: quatro caminhos para a mesma vulnerabilidade moderada GHSA-g3hv-75wg-m249 em minimatch 10.2.6, transitiva de typescript-eslint no tooling de desenvolvimento. Correção disponível em >=11.0.1, fora da faixa ^10.2.2 do consumidor. Não se aplicou resolução major forçada. Atualizar quando houver versão compatível do consumidor. Nenhuma vulnerabilidade alta ou crítica reportada.
- Yarn Classic emite aviso DEP0169 (url.parse) no Node 24. Não foi trocado o gerenciador para evitar outra migração independente.

## Validação

- yarn install e yarn install --frozen-lockfile: sucesso, sem conflitos de peers.
- yarn lint: sucesso com um aviso existente de img na página da equipe.
- yarn typecheck: sucesso.
- yarn build: sucesso com Turbopack, páginas /, /staff e /404 geradas.
- Chromium headless no build final: hidratação sem erros, geração de árvore com sete nós, quatro percursos, zoom, navegação / ↔ /staff e resposta 404 aprovados.
- Algoritmos conferidos com árvore fixa de sete nós: pré-ordem, em ordem, pós-ordem e BFS corretos.
- O build precisa executar subprocessos; a tentativa dentro do sandbox falhou ao ler tsc --showConfig, e a execução autorizada fora dele passou.

## Documentação oficial consultada

- [Next 12](https://nextjs.org/docs/pages/guides/upgrading/version-12), [13](https://nextjs.org/docs/pages/guides/upgrading/version-13), [14](https://nextjs.org/docs/pages/guides/upgrading/version-14), [15](https://nextjs.org/docs/pages/guides/upgrading/version-15) e [16](https://nextjs.org/docs/app/guides/upgrading/version-16).
- [React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).
- [ESLint no Next](https://nextjs.org/docs/app/api-reference/config/eslint) e [flat config](https://eslint.org/docs/latest/use/configure/migration-guide).
- [TypeScript 6](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html).
- [Advisory minimatch](https://github.com/advisories/GHSA-g3hv-75wg-m249).
