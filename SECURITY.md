# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅        |
| < 1.0   | ❌        |

## Reporting a Vulnerability

Se você identificar alguma falha de segurança ou comportamento suspeito em nosso sistema, siga as orientações abaixo:

- Envie um e-mail para [natanpedrodasilva@gmail.com](mailto:natanpedrodasilva@gmail.com) com o assunto `Security Vulnerability Report`.
- Inclua uma descrição clara da vulnerabilidade encontrada, com passos para reprodução.
- Se possível, envie evidências (prints, logs, ou código afetado).
- Não divulgue publicamente a falha antes de entrarmos em contato com você.

Nos comprometemos a responder em até **5 dias úteis** após o recebimento do relatório.

## Medidas de Segurança Aplicadas

Nosso projeto segue as seguintes práticas de segurança:

- Armazenamento de senhas usando hash seguro (ex: bcrypt, Argon2).
- Autenticação com tokens JWT e/ou sessões protegidas.
- Validação de entradas do usuário (contra XSS, SQL Injection, etc).
- Utilização de HTTPS para comunicação segura.
- Controle de permissões com base em papéis (RBAC, quando aplicável).
- Limitação de tentativas de login para mitigar ataques de força bruta.
- Dependências verificadas com ferramentas de auditoria (ex: `npm audit`, `Snyk`, etc).

## Atualizações e Patches

- Correções de segurança terão prioridade máxima.
- As vulnerabilidades serão corrigidas assim que possível e descritas no changelog.

## Contato

Caso tenha dúvidas ou sugestões relacionadas à segurança, entre em contato:
📧 Email: [natanpedrodasilva@gmail.com](mailto:natanpedrodasilva@gmail.com)  

---

*Este projeto está em ambiente acadêmico, e esta política visa principalmente promover boas práticas de segurança no desenvolvimento de software.*
