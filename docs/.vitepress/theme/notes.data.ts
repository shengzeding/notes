import { scan, collections } from '../catalog'
export default {
  watch: ['../../**/*.md'],
  load() { return { notes: scan(), collections } }
}
