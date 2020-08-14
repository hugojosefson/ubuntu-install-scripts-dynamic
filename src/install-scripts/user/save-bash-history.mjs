import ensureLineInFile from '../../lib/utils/ensure-line-in-file.mjs'
import homeFile from '../../lib/utils/home-file.mjs'

export default () =>
  ensureLineInFile(
    homeFile('.bashrc'),
    'export PROMPT_COMMAND="history -a $HOME/.bash_history; $PROMPT_COMMAND"'
  )
