Run in the same directory as the file.

## Usage

Currently it includes two commands:
- ipython.sendFileContentsToIPython
  Will send the complete file contents into the open ipython instance (or a new one if none is open)
- ipython.sendSelectedToIPython
  Will send the selected lines, or the one where the cursor is, to the open ipython instance (or a new one if none is open)


## Limitations

Only one ipython instance will work, can't have multiple at the same time.