import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let beforeLine = 0;
	let beforeCharacter = 0;

	const watcher = vscode.window.onDidChangeTextEditorSelection((event) => {
		const editor = event.textEditor;
		const selection = editor.selection;
		const line = selection.active.line;
		const character = selection.active.character;
		const lineLength = editor.document.lineAt(line).range.end.character;
		const lastLine = editor.document.lineCount - 1;

		const cursorTop = (line === 0);
		const cursorHome = (character === 0);
		const cursorEnd = (character === lineLength);
		const cursorBottom = (line === lastLine);

		if (!cursorTop && !cursorBottom) {
			beforeLine = line;
		}
		if (!cursorHome && !cursorEnd) {
			beforeCharacter = character;
		}

		const config = vscode.workspace.getConfiguration('cursor-position-contexts');
		config.update('cursorTop', cursorTop);
		config.update('cursorHome', cursorHome);
		config.update('cursorEnd', cursorEnd);
		config.update('cursorBottom', cursorBottom);
	});

	context.subscriptions.push(watcher);

	const cursorReturn = vscode.commands.registerCommand('cursor-position-contexts.cursorReturn', () => {
		const editor = vscode.window.activeTextEditor;
		const newPosition = new vscode.Position(beforeLine, beforeCharacter);
		const newSelection = new vscode.Selection(newPosition, newPosition);
		if (editor) {
			editor.selection = newSelection;
			editor.revealRange(newSelection);
		}
	});

	context.subscriptions.push(cursorReturn);

	const showContexts = vscode.commands.registerCommand('cursor-position-contexts.showContexts', () => {
		const config = vscode.workspace.getConfiguration('cursor-position-contexts');
		const cursorTop = config.get('cursorTop');
		const cursorHome = config.get('cursorHome');
		const cursorEnd = config.get('cursorEnd');
		const cursorBottom = config.get('cursorBottom');

		vscode.window.showInformationMessage(`cursorTop: ${cursorTop}, cursorHome: ${cursorHome}, cursorEnd: ${cursorEnd}, cursorBottom: ${cursorBottom}`);
	});

	context.subscriptions.push(showContexts);
}

export function deactivate() { }
