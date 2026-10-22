import { buildKnowledge } from '../knowledge'
export default {
  watch: ['../knowledge.json', '../../**/*.md'],
  load: buildKnowledge
}
