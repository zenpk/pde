// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { generateRandom as genRandom } from "./func";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const genRandomCommand = vscode.commands.registerCommand(
    "pde.genRandom",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const input = await vscode.window.showInputBox({
        placeHolder: "length,pool?",
      });
      if (!input) {
        return;
      }
      const split = input.split(",");
      if (split.length < 1 || split.length > 2 || isNaN(+split[0])) {
        console.log("Wrong input");
        return;
      }

      const result = genRandom(+split[0], true, true, false, split[1]);

      const position = editor.selection.active;
      await editor.edit((editBuilder) => {
        editBuilder.insert(position, result);
      });
    }
  );

  const genRandomUpperCommand = vscode.commands.registerCommand(
    "pde.genRandomUpper",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const input = await vscode.window.showInputBox({
        placeHolder: "length",
      });
      if (!input || isNaN(+input)) {
        console.log("Wrong input");
        return;
      }

      const result = genRandom(+input, true, true, true);

      const position = editor.selection.active;
      await editor.edit((editBuilder) => {
        editBuilder.insert(position, result);
      });
    }
  );

  context.subscriptions.push(genRandomCommand, genRandomUpperCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
