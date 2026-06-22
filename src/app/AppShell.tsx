import { useState } from 'react'
import { ACTS } from '@/content/acts'
import { NebulaDrift } from '@/components/fx/NebulaDrift'
import { AppTopBar } from '@/app/AppTopBar'
import { BottomNav, type Tab } from '@/app/BottomNav'
import { Deck } from '@/app/Deck'
import { TopicScreen } from '@/app/TopicScreen'
import { AssistantScreen } from '@/app/AssistantScreen'

function meta(id: string) {
  return ACTS.find((a) => a.id === id)
}

/** Phone-native shell: a command-deck dashboard with bottom tabs.
 *  Each tile opens one reused Act in compact layout. */
export function AppShell() {
  const [tab, setTab] = useState<Tab>('deck')
  const [topic, setTopic] = useState<string | null>(null)

  const onTab = (t: Tab) => { setTab(t); setTopic(null) }

  const inTiles = tab === 'deck' || tab === 'guide'
  const detail = inTiles && topic
  const m = detail ? meta(topic) : undefined

  return (
    <div className="grain relative flex h-[100dvh] flex-col overflow-hidden bg-[var(--bg-void)]">
      {/* calm ambient backdrop (light on phones) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <NebulaDrift />
        <div className="vignette absolute inset-0" />
      </div>

      <AppTopBar
        title={detail ? m?.kicker : undefined}
        hue={detail ? m?.hue : undefined}
        onBack={detail ? () => setTopic(null) : undefined}
      />

      <main className="relative flex-1 overflow-hidden">
        {tab === 'assistant' ? (
          <AssistantScreen />
        ) : (
          <div key={`${tab}-${topic ?? 'home'}`} className="h-full overflow-y-auto overscroll-contain">
            {tab === 'generate' ? (
              <TopicScreen id="generate" />
            ) : detail ? (
              <TopicScreen id={topic!} />
            ) : (
              <Deck section={tab === 'guide' ? 'guide' : 'core'} onOpen={setTopic} />
            )}
          </div>
        )}
      </main>

      <BottomNav tab={tab} onTab={onTab} />
    </div>
  )
}
