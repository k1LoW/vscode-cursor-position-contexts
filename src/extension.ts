import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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

		const config = vscode.workspace.getConfiguration('cursor-position-contexts');
		config.update('cursorTop', cursorTop);
		config.update('cursorHome', cursorHome);
		config.update('cursorEnd', cursorEnd);
		config.update('cursorBottom', cursorBottom);
	});

	context.subscriptions.push(watcher);

	const disposable = vscode.commands.registerCommand('cursor-position-contexts.showContexts', () => {
		const config = vscode.workspace.getConfiguration('cursor-position-contexts');
		const cursorTop = config.get('cursorTop');
		const cursorHome = config.get('cursorHome');
		const cursorEnd = config.get('cursorEnd');
		const cursorBottom = config.get('cursorBottom');

		vscode.window.showInformationMessage(`cursorTop: ${cursorTop}, cursorHome: ${cursorHome}, cursorEnd: ${cursorEnd}, cursorBottom: ${cursorBottom}`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
