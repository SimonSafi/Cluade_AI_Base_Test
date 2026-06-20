import { useState } from 'react'
import { motion } from 'motion/react'
import { PROVIDERS, type Provider, useLlm } from '@/lib/llm'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

/** Connect-your-own-key panel. The key is stored only in this browser and sent
    only to the chosen provider — never to this site or this session. */
export function ConnectPanel({ onClose }: { onClose: () => void }) {
  const { settings, save } = useLlm()
  const [provider, setProvider] = useState<Provider>(settings.provider)
  const [key, setKey] = useState(settings.keys[provider] || '')
  const info = PROVIDERS[provider]
  const [model, setModel] = useState(settings.models[provider] || info.defaultModel)

  const pickProvider = (p: Provider) => {
    setProvider(p)
    setKey(settings.keys[p] || '')
    setModel(settings.models[p] || PROVIDERS[p].defaultModel)
  }
  const persist = () => {
    save({ provider, keys: { ...settings.keys, [provider]: key.trim() }, models: { ...settings.models, [provider]: model } })
    onClose()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] grid place-items-center p-4" style={{ background: 'rgba(2,3,8,0.7)' }} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong w-full max-w-md rounded-[var(--radius-lg)] p-6"
        style={{ boxShadow: 'var(--shadow-float)' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-hi">Connect a model</h3>
          <button onClick={onClose} className="text-lo hover:text-hi">✕</button>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {(Object.keys(PROVIDERS) as Provider[]).map((p) => {
            const on = p === provider
            return (
              <button key={p} onClick={() => pickProvider(p)} className={cn('rounded-[var(--radius-md)] border p-2.5 text-left transition-all', on ? 'glass-strong' : 'glass')}
                style={on ? { borderColor: 'color-mix(in oklab, var(--accent) 55%, transparent)' } : undefined}>
                <div className="text-xs font-semibold text-hi">{PROVIDERS[p].label.split(' ')[0]}</div>
                <div className="micro mt-1" style={{ color: PROVIDERS[p].free ? 'var(--teal)' : 'var(--text-faint)' }}>{PROVIDERS[p].free ? 'free' : 'paid'}</div>
              </button>
            )
          })}
        </div>

        <label className="micro text-mid">API key</label>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder={info.keyHint}
          className="mt-1.5 w-full rounded-[var(--radius-md)] bg-[var(--bg-sunken)] px-3 py-2.5 text-sm text-hi outline-none placeholder:text-faint" style={{ border: '1px solid var(--glass-border-strong)' }} />
        <a href={info.keyUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-xs text-accent hover:opacity-80">Get a {info.label} key →</a>

        <label className="mt-4 block micro text-mid">model</label>
        <select value={model} onChange={(e) => setModel(e.target.value)} className="mt-1.5 w-full rounded-[var(--radius-md)] bg-[var(--bg-sunken)] px-3 py-2.5 text-sm text-hi outline-none" style={{ border: '1px solid var(--glass-border-strong)' }}>
          {info.models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <div className="mt-4 flex items-start gap-2 rounded-[var(--radius-md)] px-3 py-2" style={{ border: '1px solid color-mix(in oklab, var(--teal) 30%, transparent)', background: 'color-mix(in oklab, var(--teal) 7%, transparent)' }}>
          <span className="mt-0.5 text-teal"><Icon name="verify" size={15} /></span>
          <span className="text-xs leading-snug text-mid">Your key is stored only in this browser and sent <strong className="text-hi">only to {info.label}</strong>, billed to your own account. It never touches this site or the lab’s session.</span>
        </div>

        <button onClick={persist} disabled={!key.trim()} className="mt-4 w-full rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium text-hi transition-opacity disabled:opacity-40"
          style={{ background: 'color-mix(in oklab, var(--accent) 20%, transparent)', border: '1px solid color-mix(in oklab, var(--accent) 50%, transparent)' }}>
          Save & connect
        </button>
      </motion.div>
    </motion.div>
  )
}
