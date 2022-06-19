module.exports = {
  disableEmoji: true,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: 'Documentation only changes',
      emoji: '✏️',
      value: 'docs',
    },
    feat: {
      description: 'A new feature',
      emoji: '⚜️',
      value: 'feat',
    },
    fix: {
      description: 'A bug fix',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '♻️',
      value: 'refactor',
    },
    release: {
      description: 'Create a release commit',
      emoji: '🚀',
      value: 'release',
    },
    revert: {
      description: 'Revert changes',
      emoji: '↩️',
      value: 'release',
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: 'Adding missing tests',
      emoji: '🧪',
      value: 'test',
    },
  },
};g
