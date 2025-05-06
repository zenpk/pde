import * as vscode from "vscode";
import { generateRandom as genRandom } from "./func";

export async function activate(context: vscode.ExtensionContext) {
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    return new Promise<void>((resolve) => {
      if (editor) {
        setTimeout(async () => {
          const currentSelection = editor.selection;
          await vscode.commands.executeCommand("extension.vim_escape");
          editor.selection = currentSelection;
          resolve();
        }, 100);
      }
    });
  });

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

  const restartVimCommand = vscode.commands.registerCommand(
    "pde.restartVim",
    async () => {
      await vscode.commands.executeCommand("toggleVim");
      await vscode.commands.executeCommand("toggleVim");
      await vscode.commands.executeCommand("extension.vim_escape");
    }
  );

  const goPrintErrorWithCode = vscode.commands.registerCommand(
    "pde.goPrintErrorWithCode",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const randomCode = genRandom(8, true, true, false);
      const insertStr = `if err != nil {
    return nil, fmt.Errorf("[#${randomCode}] %w", err)      
}`;

      const position = editor.selection.active;
      await editor.edit((editBuilder) => {
        editBuilder.insert(position, insertStr);
      });
    }
  );

  context.subscriptions.push(
    genRandomCommand,
    genRandomUpperCommand,
    restartVimCommand,
    goPrintErrorWithCode
  );
}

export function deactivate() {}
