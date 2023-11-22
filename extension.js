// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('responsive-preview.openURL', async function () {
    const url = await vscode.window.showInputBox({
      placeHolder: "",
      prompt: "URL",
      value: "http://localhost:5173"
    })

    if (url !== undefined) {
      const panel = vscode.window.createWebviewPanel(
        'preview', // Identifies the type of the webview. Used internally
        'Responsive Preview', // Title of the panel displayed to the user
        vscode.ViewColumn.Two, // Editor column to show the new webview panel in.
        {
          enableScripts: true
        } // Webview options. More on these later.
      );

      panel.webview.html = getWebviewContent(url);
    }
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(url) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Preview</title>
  <style type="text/css">
    body, html
    {
      margin: 0; padding: 0; height: 100%; overflow: hidden;
    }

    #content
    {
      position: absolute; left: 0; right: 0; bottom: 0; top: 0px;
    }

    #header {
      height: 40px;
    }
  </style>
</head>
<body>
  <div id="header">
    <div contenteditable="true">800x600</div>
  </div>
  <div id="content">
    <iframe src="${url}" sandbox="allow-scripts" width="100%" height="100%" frameborder="0">
  </div>
</body>
</html>`;
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
