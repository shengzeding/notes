import { folderContents } from '../catalog'
export default {
  watch: ['../../**/*.md'],
  load() { return { folders: folderContents() } }
}
