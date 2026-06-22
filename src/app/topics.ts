import type { IconName } from '@/components/ui/Icon'

/** App-mode tiles. Title / hue / caption come from ACTS (single source);
 *  here we add the phone-deck extras: an icon and a short role word. */
export interface Topic {
  id: string
  role: string
  icon: IconName
  section: 'core' | 'guide'
}

export const TOPICS: Topic[] = [
  { id: 'think', role: 'the pipeline', icon: 'plan', section: 'core' },
  { id: 'agents', role: 'specialists', icon: 'agent', section: 'core' },
  { id: 'skills', role: 'playbooks', icon: 'skill', section: 'core' },
  { id: 'mcp', role: 'connectors', icon: 'mcp', section: 'core' },
  { id: 'tokens', role: 'context budget', icon: 'token', section: 'core' },
  { id: 'workflow', role: 'the loop', icon: 'delegate', section: 'core' },
  { id: 'toolkit', role: 'by purpose', icon: 'build', section: 'core' },
  { id: 'glossary', role: 'vocabulary', icon: 'plan', section: 'guide' },
  { id: 'resources', role: 'go deeper', icon: 'browser', section: 'guide' },
  { id: 'devguide', role: 'files & ship', icon: 'ship', section: 'guide' },
  { id: 'builder', role: 'how built', icon: 'design', section: 'guide' },
]
