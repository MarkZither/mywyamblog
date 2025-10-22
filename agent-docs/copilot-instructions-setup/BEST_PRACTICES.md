# GitHub Copilot Best Practices Reference

This document provides a comprehensive reference for GitHub Copilot best practices as implemented in this repository.

## Official GitHub Recommendations

Based on GitHub's official documentation and best practices guides, here are the key recommendations for Copilot coding agent:

### 1. Repository Instructions Files

#### `.github/copilot-instructions.md` ✅ IMPLEMENTED
**Purpose:** Repository-wide development instructions

**What to Include:**
- Repository structure and architecture
- Technology stack and dependencies
- Development workflow and commands
- Build and test procedures
- Code standards and conventions
- Security guidelines
- Common tasks and troubleshooting

**Our Implementation:**
- Comprehensive 366-line guide (enhanced from 324)
- Covers all recommended areas
- Includes Docusaurus + Statiq architecture
- Clear development workflows
- Security best practices
- Testing strategy

#### `.copilot-instructions.md` (Optional) ✅ IMPLEMENTED
**Purpose:** Project-specific or content-specific instructions

**What to Include:**
- Writing style and voice
- Content guidelines
- Project-specific conventions
- Special requirements

**Our Implementation:**
- 82-line writing style guide
- British English conventions
- Refined gentleman's voice
- Content approach guidelines

### 2. Security Best Practices

#### Never Commit Secrets ✅ IMPLEMENTED
```markdown
- No passwords, API keys, or tokens in code
- Use environment variables for sensitive config
- Configure secrets in GitHub Secrets/Netlify
```

#### Dependency Security ✅ IMPLEMENTED
```markdown
- Review packages before adding
- Check for known vulnerabilities
- Use trusted, maintained packages
- Document dependency choices
```

#### Input Validation ✅ IMPLEMENTED
```markdown
- Validate all external input
- Sanitize user data
- Use HTTPS for all external resources
```

### 3. Code Quality Standards

#### Linting and Type Checking ✅ IMPLEMENTED
```markdown
TypeScript:
- Must pass: npm run typecheck
- Zero errors required

.NET:
- Must compile without errors
- Follow standard conventions
```

#### Code Formatting ✅ IMPLEMENTED
```markdown
- Follow existing patterns
- Consistent style throughout
- Respect project conventions
```

#### Documentation ✅ IMPLEMENTED
```markdown
- Update docs with code changes
- Keep documentation synchronized
- Document complex logic
```

### 4. Testing Strategy

#### Pre-Commit Checklist ✅ IMPLEMENTED
```markdown
1. Typecheck (TypeScript)
2. Build (both Docusaurus and .NET if modified)
3. Visual verification
4. Link validation
5. Security review
```

#### CI/CD Validation ✅ IMPLEMENTED
```markdown
- Automated builds on every push
- Both systems validated
- Security scanning (npm audit)
- Deployment only on success
```

#### Quality Standards ✅ IMPLEMENTED
```markdown
- TypeScript: No errors
- Build: Must complete successfully
- Links: No new broken links
- Formatting: Follow conventions
- Documentation: Keep updated
```

### 5. Dependency Management

#### Adding New Dependencies ✅ IMPLEMENTED
```markdown
Process:
1. Verify package source is trusted
2. Review maintenance and activity
3. Check for security vulnerabilities
4. Prefer established packages
5. Document why dependency is needed

Tools:
- npm audit (Node.js)
- NuGet package manager (.NET)
- GitHub Advisory Database
```

## Implementation Checklist

Use this checklist to verify Copilot instructions are properly configured:

### Essential Files
- [x] `.github/copilot-instructions.md` exists
- [x] Contains repository overview
- [x] Documents technology stack
- [x] Includes development workflow
- [x] Defines code standards
- [x] Covers security practices
- [x] Details testing strategy

### Optional Enhancements
- [x] `.copilot-instructions.md` for style/content
- [ ] `.github/instructions/*.md` for directory-specific rules (future consideration)
- [x] Agent documentation (`agent-docs/`)
- [x] Security guidelines
- [x] Testing requirements

### Content Quality
- [x] Clear and comprehensive
- [x] Project-specific examples
- [x] Actionable guidelines
- [x] Up-to-date information
- [x] Well-organized structure

### Validation
- [x] Build passes with instructions
- [x] Tests pass
- [x] No contradictory guidance
- [x] Links work correctly

## Copilot Instruction Patterns

### Good Practices

#### ✅ Be Specific
```markdown
❌ Bad: "Follow best practices"
✅ Good: "Run `npm run typecheck` before committing. Zero errors required."
```

#### ✅ Provide Examples
```markdown
❌ Bad: "Use proper frontmatter"
✅ Good:
```yaml
---
title: "Post Title"
authors: ["mark-burton"]
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
---
```
```

#### ✅ Include Commands
```markdown
❌ Bad: "Build the project"
✅ Good: "cd src/docs && npm run build"
```

#### ✅ Explain Why
```markdown
❌ Bad: "Don't remove Statiq"
✅ Good: "Keep Statiq as backup at `/statiq-backup/` for comparison with Docusaurus"
```

### Common Pitfalls to Avoid

#### ❌ Vague Guidelines
```markdown
Don't say: "Write good code"
Instead: "Code must pass TypeScript typecheck with zero errors"
```

#### ❌ Missing Context
```markdown
Don't say: "Run tests"
Instead: "Run `npm run build` in src/docs/ to test Docusaurus build"
```

#### ❌ Outdated Information
```markdown
Keep instructions current with actual project state
Review and update when technologies change
```

#### ❌ Contradictory Instructions
```markdown
Ensure all instructions align
Don't have conflicting requirements
```

## Advanced Patterns

### Directory-Specific Instructions (Future Enhancement)

For more granular control, consider:

```
.github/instructions/
├── src-docs.md          # Docusaurus-specific
├── src-blog.md          # Statiq-specific
└── agent-docs.md        # Documentation guidelines
```

With YAML frontmatter:
```yaml
---
applies_to:
  - "src/docs/**/*.ts"
  - "src/docs/**/*.tsx"
---

# TypeScript-specific instructions here
```

### Security-Focused Instructions

```markdown
## Security Checklist

Before committing:
- [ ] No secrets in code
- [ ] No console.log with sensitive data
- [ ] Dependencies reviewed
- [ ] HTTPS for all external resources
- [ ] Input validation added
```

### Testing-Focused Instructions

```markdown
## Test Requirements

New code must include:
- [ ] Unit tests (if applicable)
- [ ] Integration tests (if applicable)
- [ ] Build verification
- [ ] Link validation
```

## Monitoring and Improvement

### Track Effectiveness

Monitor these indicators:
1. **Code Quality:** Are Copilot suggestions following guidelines?
2. **Security:** Are security practices being applied?
3. **Consistency:** Is style consistent across contributions?
4. **Accuracy:** Are suggestions contextually appropriate?

### Continuous Improvement

1. **Review Quarterly**
   - Update for new tools/frameworks
   - Add clarifications where needed
   - Remove outdated guidance

2. **Gather Feedback**
   - Note where Copilot misunderstands
   - Clarify ambiguous instructions
   - Add examples for complex cases

3. **Measure Impact**
   - Code review comments
   - Build failure rates
   - Security issues found
   - Developer satisfaction

## Resources

### Official Documentation
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Custom Repository Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [Best Practices for Coding Agent](https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results)

### Community Resources
- [GitHub Copilot Blog](https://github.blog/ai-and-ml/)
- [Copilot Community Discussions](https://github.com/orgs/community/discussions/categories/copilot)

### Security Resources
- [GitHub Security Advisories](https://github.com/advisories)
- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

## Summary

This repository implements comprehensive Copilot instructions following GitHub's best practices:

✅ **Complete Coverage:** Development, security, testing, and style  
✅ **Clear Guidelines:** Specific commands and examples  
✅ **Security First:** Comprehensive security best practices  
✅ **Quality Standards:** Explicit testing and code quality requirements  
✅ **Well Documented:** Extensive documentation for maintenance  

The instructions provide Copilot with the context it needs to generate appropriate, secure, and high-quality code suggestions that align with the project's goals and conventions.

---

**Last Updated:** 2025-10-21
