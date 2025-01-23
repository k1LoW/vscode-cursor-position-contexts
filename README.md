# Cursor Position Contexts

Cursor position contexts for [`when` causes](https://code.visualstudio.com/api/references/when-clause-contexts) of VSCode command keybindings.

> [!WARNING]
> The extension provides the values of the extension configurations as contexts that can be used in keyboard shortcut `when` clauses.
> Please be careful when using this extension, as the way the feature is implemented is very specific.

## Motivation

I aim to recreate the efficient cursor movement found in [sequential-command.el](https://github.com/rubikitch/sequential-command) within VSCode.

## Provided contexts

| Key | Type |Desctiption |
| --- | --- | --- |
| `config.cursor-position-contexts.cursorTop` | `boolean` | `true` if the cursor is at the top of the document |
| `config.cursor-position-contexts.cursorBottom` | `boolean` | `true` if the cursor is at the bottom of the document |
| `config.cursor-position-contexts.cursorHome` | `boolean` | `true` if the cursor is at the beginning of the line |
| `config.cursor-position-contexts.cursorEnd` | `boolean` | `true` if the cursor is at the end of the line |

## Usage

### Recreate `seq-home` and `seq-end` with [Awesome Emacs Keymap](https://marketplace.visualstudio.com/items?itemName=tuttieee.emacs-mcx)

https://github.com/rubikitch/sequential-command/blob/a48cbcbe273b33edd3ae56e68f44b4100fa3a48a/sequential-command-config.el#L59-L62

```json
[
    {
        "key": "ctrl+a",
        "command": "cursorTop",
        "when": "textInputFocus && config.cursor-position-contexts.cursorHome"
    },
    {
        "key": "ctrl+e",
        "command": "cursorBottom",
        "when": "textInputFocus && config.cursor-position-contexts.cursorEnd"
    },
    {
        "key": "ctrl+e",
        "command": "cursor-position-contexts.cursorReturn",
        "when": "config.cursor-position-contexts.cursorEnd && config.cursor-position-contexts.cursorBottom && textInputFocus"
    },
    {
        "key": "ctrl+a",
        "command": "cursor-position-contexts.cursorReturn",
        "when": "config.cursor-position-contexts.cursorHome && config.cursor-position-contexts.cursorTop && textInputFocus"
    }
]
```

