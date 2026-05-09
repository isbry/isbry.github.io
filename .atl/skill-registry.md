# Skill Registry — isbry

Generated: 2026-05-09
Project: isbry (/Users/isbry/Repositories/isbry)

## User-Level Skills

### branch-pr
**Trigger**: creating, opening, or preparing PRs for review
**Location**: `~/.config/opencode/skills/branch-pr/SKILL.md`
**Rules**:
- Check for existing issue before opening PR
- Use conventional commit format for PR titles
- Include summary, test plan, and risk sections in PR body

### chained-pr
**Trigger**: PRs over 400 lines, stacked PRs, review slices
**Location**: `~/.config/opencode/skills/chained-pr/SKILL.md`
**Rules**:
- Split changes >400 lines into chained PRs
- Each PR must be independently reviewable and mergeable
- Include base/chain context in each PR description

### cognitive-doc-design
**Trigger**: writing guides, READMEs, RFCs, onboarding, architecture, or review-facing docs
**Location**: `~/.config/opencode/skills/cognitive-doc-design/SKILL.md`
**Rules**:
- Lead with the reader's question, not the author's structure
- Use progressive disclosure: summary → details
- Every section must answer a specific reader need

### comment-writer
**Trigger**: PR feedback, issue replies, reviews, Slack messages, or GitHub comments
**Location**: `~/.config/opencode/skills/comment-writer/SKILL.md`
**Rules**:
- Warm and direct; lead with the intent, not the critique
- Separate observation from suggestion
- End with a clear ask or next step

### docx
**Trigger**: Word doc, .docx, professional documents with ToC/headings/letterheads
**Location**: `~/.config/opencode/skills/docx/SKILL.md`
**Rules**:
- Use python-docx for all .docx operations
- Never output raw XML; always use the library API
- Validate output by reopening and checking structure

### go-testing
**Trigger**: Go tests, go test coverage, Bubbletea teatest, golden files
**Location**: `~/.config/opencode/skills/go-testing/SKILL.md`
**Rules**:
- Use table-driven tests with subtests
- Golden files for complex output; update with `-update` flag
- Use teatest for Bubbletea TUI testing

### issue-creation
**Trigger**: creating GitHub issues, bug reports, or feature requests
**Location**: `~/.config/opencode/skills/issue-creation/SKILL.md`
**Rules**:
- Search for duplicate issues before creating
- Required fields: title, description, reproduction steps (bugs), acceptance criteria (features)
- Apply labels at creation time

### judgment-day
**Trigger**: judgment day, dual review, adversarial review, juzgar
**Location**: `~/.config/opencode/skills/judgment-day/SKILL.md`
**Rules**:
- Two independent blind reviews before synthesis
- Fix only confirmed issues (both reviewers agree)
- Re-judge after fixes to confirm resolution

### skill-creator
**Trigger**: new skills, agent instructions, documenting AI usage patterns
**Location**: `~/.config/opencode/skills/skill-creator/SKILL.md`
**Rules**:
- Required frontmatter: name, description, disable-model-invocation, user-invokable, license, metadata
- description: quoted, one line, trigger-first, ≤250 chars
- Body: 180-450 tokens; move examples/schemas to references/

### work-unit-commits
**Trigger**: implementation, commit splitting, chained PRs, keeping tests and docs with code
**Location**: `~/.config/opencode/skills/work-unit-commits/SKILL.md`
**Rules**:
- One logical change per commit; tests and docs travel with the code they cover
- Use conventional commits format
- Never commit broken state; each commit must pass CI

### sdd-apply / sdd-archive / sdd-design / sdd-explore / sdd-init / sdd-onboard / sdd-propose / sdd-spec / sdd-tasks / sdd-verify
**Trigger**: SDD workflow phases (orchestrator-launched)
**Location**: `~/.config/opencode/skills/sdd-*/SKILL.md`
**Rules**:
- Each skill is a phase executor, not an orchestrator
- Follow phase contract; do not delegate or launch sub-agents
- Persist artifacts per phase output contract

## Project-Level Skills

None detected.

## Convention Files

None detected at project root (no AGENTS.md, CLAUDE.md, .cursorrules, GEMINI.md).
