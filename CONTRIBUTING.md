I <3 pull requests. Here's a quick guide:

1. Fork the repository and then clone.
2. Run `npm install` to get the dependencies and also the test modules.
3. Make your changes.
4. Run `npm test` and ensure that all tests pass before submitting a pull request.

**Adding tests:**
If you're adding functionality then we'll also need a test adding. Your tests should pass and not break backwards functionality whilst we're in a minor version.

**Syntax:**

- Tabs.
- No trailing whitespace. 
- Blank lines should not have any space or tabs.
- a == b and not a==b.
- Follow the conventions you see used in the source already.

**Things to work on:**

- Optimizations. With the upcoming browser compatibility `node-summary` should be as fast as possible.
- Demo server.
- Better documentation.