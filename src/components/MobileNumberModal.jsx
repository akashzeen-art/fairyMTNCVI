import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Loader2 } from 'lucide-react'
import { useSubscription } from '../context/SubscriptionContext'
import { COUNTRY_PREFIX, normalizeMsisdn } from '../utils/phone'

export default function MobileNumberModal() {
  const { showMobileModal, handleMobileSubmit, closeMobileModal, checking } = useSubscription()
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  if (!showMobileModal) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const normalized = normalizeMsisdn(phone)
    const localDigits = normalized.slice(3)
    if (localDigits.length < 8) {
      setError('Veuillez entrer un numéro de mobile valide.')
      return
    }
    setError('')
    handleMobileSubmit(normalized)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) closeMobileModal() }}
      >
        <div className="absolute inset-0 bg-fairy-deeper/90 backdrop-blur-xl" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md glass-strong rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeMobileModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-fairy-mist hover:text-white"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-fairy-gold" />
            <h2 className="font-title font-bold text-xl text-fairy-white">
              Entrez votre numéro
            </h2>
          </div>

          <p className="text-sm text-fairy-mist/70 font-body mb-6">
            Saisissez votre numéro de mobile ivoirien pour accéder aux contes magiques.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div
                className="
                  shrink-0 flex items-center justify-center px-4 py-3.5 rounded-2xl
                  bg-fairy-dark/80 border border-white/10
                  text-fairy-white font-body text-sm font-bold
                "
                aria-hidden="true"
              >
                {COUNTRY_PREFIX}
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setError('') }}
                placeholder="07 12 34 56 78"
                className="
                  flex-1 min-w-0 px-4 py-3.5 rounded-2xl
                  bg-fairy-dark/60 border border-white/10
                  text-fairy-white font-body text-sm
                  placeholder:text-fairy-mist/40
                  focus:outline-none focus:border-fairy-violet/50
                  transition-colors
                "
                autoFocus
                disabled={checking}
                inputMode="numeric"
                aria-label="Numéro de mobile"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-body">{error}</p>
            )}

            <motion.button
              type="submit"
              disabled={checking}
              whileHover={{ scale: checking ? 1 : 1.02 }}
              whileTap={{ scale: checking ? 1 : 0.98 }}
              className="
                flex items-center justify-center gap-2
                w-full py-3.5 rounded-2xl
                bg-gradient-to-r from-fairy-violet to-fairy-pink
                text-white font-body font-bold text-sm
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-lg shadow-fairy-purple/30
              "
            >
              {checking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Vérification...
                </>
              ) : (
                'Continuer'
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
