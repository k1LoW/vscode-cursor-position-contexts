# cursor-position-contexts

Cursor position contexts for [`when` causes](https://code.visualstudio.com/api/references/when-clause-contexts) of VSCode command keybindings.

> [!WARNING]
> The extension provides the values of the extension configurations as contexts that can be used in keyboard shortcut `when` clauses.
> Please be careful when using this extension, as the way the feature is implemented is very specific.

## Provided contexts

| Key | Type |Desctiption |
| --- | --- | --- |
| `config.cursor-position-contexts.cursorTop` | `boolean` | `true` if the cursor is at the top of the document |
| `config.cursor-position-contexts.cursorBottom` | `boolean` | `true` if the cursor is at the bottom of the document |
| `config.cursor-position-contexts.cursorHome` | `boolean` | `true` if the cursor is at the beginning of the line |
| `config.cursor-position-contexts.cursorEnd` | `boolean` | `true` if the cursor is at the end of the line |
