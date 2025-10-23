---
title: "A Deeper Dive into GitHub Spec-Kit - Learning from Initial Missteps"
authors: ["mark-burton"]
tags: ["GitHub", "Spec-Kit", "Development", "MAUI", "Blazor", "Azure", "Copilot", "Claude", "OAuth", "Security"]
description: "Following my rather disappointing first attempt with spec-kit, I embark upon a proper investigation of the /speckit.analyze command and discover precisely how Copilot managed to mark incomplete work as complete. Most illuminating!"
date: "2025-10-23"
draft: false
---

## A Most Necessary Re-Examination

I dare say, dear reader, that after my [first adventures with GitHub spec-kit](./2025-10-23-first-adventures-with-github-speckit.md), I found myself rather dissatisfied with the results. Whilst the structure and architecture appeared sound, the actual implementation was decidedly... placeholder-ish. Tasks marked as complete were anything but, and authentication that supposedly integrated with Azure AD and Google was, in reality, accepting any old username and password combination. Most unsatisfactory!

Since beginning this experiment, I've also enabled Claude Sonnet 4.5, which has proven to be a considerable improvement over its predecessor. With better prompts and a more capable LLM, I ventured to understand precisely why such a poor job was done initially, and more importantly, how to prevent such disappointments in future.

<!--truncate-->

## The Revelation: Tasks Marked Complete That Were Not

Upon reviewing the project with fresh eyes (and a proper screen, thank goodness), I discovered numerous tasks cheerfully marked as complete that were, in fact, barely started. Consider these examples from the `tasks.md` file:

```markdown
- [x] T010 [P] Implement authentication abstraction and OAuth2 integration (Azure AD, Google)
- [x] T011 [P] Add JWT token issuance and validation middleware
```

Both proudly displaying their completion checkmarks, yet both thoroughly incomplete. The authentication system was accepting any credentials without validation, and the JWT middleware was issuing tokens for entirely fictional users. Most vexing!

## Challenging Copilot's Assessment

When I rather pointedly enquired whether T010 and T011 were genuinely complete, Copilot had the good grace to admit its error:

> You're absolutely right! Let me investigate the current authentication implementation and update the documentation to reflect the actual requirements.

What followed was rather illuminating. Copilot conducted a comprehensive analysis and created several subtasks to ensure proper implementation. The tasks were restructured thusly:

```markdown
- [ ] T010 [P] Implement authentication abstraction and OAuth2 integration (Azure AD, Google)
  <!-- INCOMPLETE: OAuth2 middleware configured but not wired up. 
       Currently accepts any email/password and returns JWT without authentication. 
       See docs/OAUTH_GAP_ANALYSIS.md -->
  - [x] T010a Add OAuth2 middleware configuration (Google, Azure AD)
  - [ ] T010b **MERGED WITH T015b** - OAuth2 initiation endpoints
  - [ ] T010c **MERGED WITH T015c** - OAuth2 callback handlers
  - [ ] T010d Implement ID token validation service for mobile OAuth flows
  - [ ] T010e Create ExternalLoginRequest model (remove password-based LoginRequest)
  - [ ] T010f Update AuthenticationService.AuthenticateExternalAsync() with real validation
  - [ ] T010g Add database migration for User entity with external auth fields
  
- [ ] T011 [P] Add JWT token issuance and validation middleware
  <!-- INCOMPLETE: JWT middleware works but issues tokens for fake users. 
       Must connect to real OAuth2 flow. -->
  - [x] T011a Implement JwtTokenService token generation methods
  - [x] T011b Add JWT Bearer authentication middleware
  - [ ] T011c Connect JWT generation to OAuth2-authenticated users
  - [ ] T011d Add refresh token persistence
  - [ ] T011e Implement token revocation endpoint
```

Now this is far more honest! The subtasks clearly delineate what's actually been accomplished versus what remains to be done.

## Discovering the /speckit.analyze Command

The truly splendid discovery was the `/speckit.analyze` command. This command, rather brilliantly, performs a comprehensive analysis of your spec, plan, and tasks to identify issues. The prompt it generates is simply "Follow instructions in [speckit.analyze.prompt.md]", but examining the [actual template](https://github.com/github/spec-kit/blob/main/templates/commands/analyze.md) reveals a most sophisticated approach.

### The Analysis Process

The analyze command performs several detection passes, wisely limiting itself to 50 findings to maintain token efficiency:

**A. Duplication Detection**
- Identifies near-duplicate requirements
- Marks lower-quality phrasing for consolidation

**B. Ambiguity Detection**
- Flags vague adjectives (fast, scalable, secure, intuitive, robust) lacking measurable criteria
- Identifies unresolved placeholders (TODO, TKTK, ???, etc.)

**C. Underspecification**
- Requirements with verbs but missing objects or measurable outcomes
- User stories missing acceptance criteria
- Tasks referencing undefined components

**D. Constitution Alignment**
- Requirements conflicting with constitutional principles
- Missing mandated sections or quality gates

**E. Coverage Gaps**
- Requirements with zero associated tasks
- Tasks with no mapped requirements
- Non-functional requirements not reflected in tasks

## The Analysis Results: A Reality Check

When I ran `/speckit.analyze` on my blood thinner tracker project, the results were... sobering. The findings were organised by severity and presented in a most comprehensive table:

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| C1 | Constitution | CRITICAL | tasks.md:T010-T015 | OAuth2 implementation violates Constitution V (Security) - middleware configured but not wired | Complete T010a-g, T011c-e, T015a-f per OAUTH_GAP_ANALYSIS.md |
| C2 | Constitution | CRITICAL | tasks.md:T003 | Aspire implementation violates Constitution IV (Performance) - placeholder projects without Aspire.Hosting SDK | Complete T003a-e to add Aspire.Hosting SDK |
| C3 | Constitution | CRITICAL | tasks.md:T018 | Blazor Web violates Constitution III (UX Consistency) - UI shells exist but no API integration | Complete T018b-l to connect UI to API endpoints |
| A1 | Ambiguity | HIGH | spec.md:L26 | User Story 1 doesn't specify web vs mobile flows | Clarify redirect flow vs ID token exchange |
| A2 | Ambiguity | HIGH | spec.md:L106-L107 | FR-001 doesn't specify authentication method | Explicitly reference OAuth2 providers |

### Critical Violations Found: 3 Constitution Principles Violated

The analysis identified three critical violations of the project's constitutional principles:

**Principle V (Security & OWASP Compliance) - OAuth2 Authentication**

Finding: C1 - Authentication accepts any credentials without validation

Current State: LoginRequest model has Password field (incorrect for OAuth2), AuthenticationService creates fake users

Required Action: Remove password authentication, implement OAuth2 web redirect and mobile ID token flows

Tasks: T010a-g, T011c-e, T015a-f

Documentation: docs/OAUTH_GAP_ANALYSIS.md, docs/OAUTH_FLOW_REFERENCE.md

**Principle IV (Performance) - Aspire Infrastructure**

Finding: C2 - Aspire "implementation" was merely placeholder projects

Current State: No Aspire.Hosting SDK, no service discovery, no dashboard, no OpenTelemetry

Required Action: Properly implement Aspire orchestration

**Principle III (UX Consistency) - Blazor Web**

Finding: C3 - UI shells exist but functionality does not

Current State: Broken navigation, hardcoded data, no API integration

Required Action: Connect UI to actual API endpoints

## Understanding the Metrics

The analysis provided some rather revealing metrics:

- **Total Requirements**: 15 functional requirements
- **Total Tasks**: 47 main tasks + 39 subtasks = 86 total tasks
- **Coverage**: 100% (all requirements have tasks, at least on paper)
- **Ambiguity Count**: 2 HIGH findings
- **Duplication Count**: 2 findings
- **Critical Issues**: 3 constitution violations
- **High Priority Issues**: 12 findings
- **Completion Status**: ~40% actual completion vs ~60% originally marked

That last metric rather tells the tale, doesn't it? Nearly a third of the supposedly completed work was, in fact, incomplete!

## The Recommendation

The analyze command's recommendation was most emphatic:

> **RESOLVE CRITICAL ISSUES (C1-C3) before proceeding with new feature development.** Current implementation has security, infrastructure, and UX gaps that contradict constitutional principles. However, the specification itself is well-structured and comprehensive - the gaps are in implementation fidelity, not design quality.

This is precisely the sort of feedback one needs! The spec and plan were sound; the implementation was the problem. The analysis correctly identified that I shouldn't be adding new features whilst the foundation was fundamentally flawed.

## Lessons Learned: Verification and Iteration

This deeper dive into spec-kit has proven most educational:

### 1. Never Trust, Always Verify

When Copilot marks tasks as complete, one must verify the actual implementation. Visual confirmation in chat is not sufficient. The code must be examined, run, and tested properly.

### 2. Use /speckit.analyze Regularly

Running the analyze command periodically during development would have caught these issues far earlier. It's not merely a one-time check at the end - it's an iterative tool for maintaining quality throughout development.

### 3. Subtasks Are Your Friend

Breaking down large tasks into specific subtasks makes verification far easier. Instead of "Implement OAuth2 integration" (which sounds complete but isn't), having discrete subtasks like "Add OAuth2 middleware configuration", "Implement token validation service", and "Wire up callback handlers" makes progress and completeness far more transparent.

### 4. Documentation of Gaps Is Invaluable

The OAUTH_GAP_ANALYSIS.md file that Copilot created was exceptionally useful. Having a written record of precisely what's wrong and what needs to be done prevents confusion and provides a clear roadmap for remediation.

### 5. Constitutional Principles Matter

Creating a proper constitution for the project wasn't merely a box-ticking exercise. The analyze command uses these principles to identify when implementations violate core requirements. Security, performance, and UX consistency weren't just nice-to-haves - they were constitutional mandates that the implementation failed to meet.

### 6. Claude Sonnet 4.5 Is Noticeably Better

The improvement from Claude 4 to 4.5 is considerable. The analysis was more thorough, the recommendations more actionable, and the ability to understand context and identify problems significantly enhanced. Enabling the newer model was undoubtedly worthwhile.

## Moving Forward: A Proper Implementation

Armed with these insights, I now have a clear path forward:

1. **Address Critical Violations First** - Fix the OAuth2 implementation, properly implement Aspire, and connect the Blazor UI to the API
2. **Run /speckit.analyze Regularly** - After each significant implementation session, verify that no new violations have been introduced
3. **Maintain Honest Task Status** - Only mark tasks as complete when they're actually complete, not merely when placeholder code exists
4. **Document Issues Thoroughly** - Create gap analysis documents when problems are identified
5. **Iterate and Verify** - Small iterations with frequent verification beats large implementations with belated testing

## Conclusion: Spec-Kit Redeemed

My initial disappointment with spec-kit was, I must confess, largely due to my own failure to properly verify the implementation. The `/speckit.analyze` command has proven to be precisely the tool needed to maintain quality and honesty in AI-assisted development.

Spec-kit, when used properly with regular verification and the analyze command, is indeed a splendid approach to structured software development. The framework is sound; the implementation oversight is critical. One cannot simply trust that AI-generated code is complete and correct - one must verify, analyze, and iterate until it genuinely meets the specification.

And crucially, one must ensure that tasks marked as complete are actually, properly, thoroughly complete - not merely structurally present with placeholder implementations!

---

*This post was written with considerably more screen real estate than its predecessor, and I rather think it shows. Proper computer equipment remains, as always, quite indispensable!*
