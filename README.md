# PDE

Convert my IDE to PDE

## Feature List

- Prevent Vim plugin's weird jump behavior after any executing `goTo` between files https://github.com/VSCodeVim/Vim/issues/8200
  This issue is probably due to VSCode returning `Selection = 0, 0` after switching files, by adding a timeout we can get the correct `Selection` value, and then move the cursor back.
  Downsides:
  - Additional latency
  - After `goTo` the target is unselected (which is what I want), but the target will be selected if we run `goTo` within a file. Unfortunately, there's no way to listen to `goTo` commands. And if we make a custom `goTo` command, we lose the ability to overload `goTo` and `peek`.
- Generate random string
- Restart Vim plugin in one command
