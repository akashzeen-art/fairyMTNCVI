import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, User, Phone, Calendar, Sparkles,
  Loader2, CheckCircle, XCircle,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../sections/Footer'
import { useSubscription } from '../context/SubscriptionContext'
import {
  getSubscriptionDetail,
  deactivateSubscription,
  redirectToCampaign,
  isActiveStatus,
} from '../services/amftApi'
import { formatMsisdnDisplay } from '../utils/phone'

function formatDate(value) {
  if (!value) return '—'
  return value.replace('T', ' ').slice(0, 19)
}

export default function MyAccount() {
  const { subid, productcode, msisdn, accountQuery } = useSubscription()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')

  const loadDetail = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getSubscriptionDetail(subid, productcode, msisdn)
      setDetail(data)
    } catch {
      setError('Impossible de charger les informations du compte.')
    } finally {
      setLoading(false)
    }
  }, [subid, productcode, msisdn])

  useEffect(() => { loadDetail() }, [loadDetail])

  const handleUnsubscribe = async () => {
    setActionLoading(true)
    try {
      await deactivateSubscription(subid, productcode, msisdn)
      await loadDetail()
    } catch {
      setError('La désinscription a échoué. Veuillez réessayer.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleSubscribe = () => {
    redirectToCampaign(subid, productcode, msisdn)
  }

  const active = detail && isActiveStatus(detail.status)

  return (
    <div className="min-h-screen bg-fairy-deeper">
      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            to={`/${accountQuery}`}
            className="inline-flex items-center gap-2 text-fairy-lavender hover:text-white font-body text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux histoires
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl border border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fairy-violet to-fairy-pink flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-title font-bold text-2xl text-fairy-white">Mon Compte</h1>
                <p className="text-xs text-fairy-mist/60 font-body">Fairy Tales — {productcode}</p>
              </div>
            </div>

            {loading && (
              <div className="flex items-center justify-center gap-2 py-12 text-fairy-mist">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-body text-sm">Chargement...</span>
              </div>
            )}

            {error && !loading && (
              <p className="text-red-400 text-sm font-body py-4">{error}</p>
            )}

            {!loading && detail && (
              <div className="flex flex-col gap-5">
                <div className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body font-bold
                  ${active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/15 text-red-400 border border-red-500/30'
                  }
                `}>
                  {active
                    ? <><CheckCircle className="w-4 h-4" /> Abonnement actif</>
                    : <><XCircle className="w-4 h-4" /> Non abonné</>
                  }
                </div>

                <div className="grid gap-4">
                  <InfoRow icon={Phone} label="Numéro mobile" value={formatMsisdnDisplay(detail.msisdn || msisdn)} />
                  <InfoRow icon={Sparkles} label="Service" value={detail.service_name || 'Fairy Tales'} />
                  <InfoRow icon={Calendar} label="Valide du" value={formatDate(detail.valid_from || detail.validityfrom)} />
                  <InfoRow icon={Calendar} label="Valide jusqu'au" value={formatDate(detail.valid_to || detail.validityto)} />
                </div>

                <div className="pt-4 border-t border-white/10">
                  {active ? (
                    <motion.button
                      onClick={handleUnsubscribe}
                      disabled={actionLoading}
                      whileHover={{ scale: actionLoading ? 1 : 1.02 }}
                      whileTap={{ scale: actionLoading ? 1 : 0.98 }}
                      className="
                        w-full py-3.5 rounded-2xl font-body font-bold text-sm
                        bg-red-500/20 text-red-400 border border-red-500/30
                        hover:bg-red-500/30 transition-colors
                        disabled:opacity-60 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2
                      "
                    >
                      {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Se désabonner
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubscribe}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        w-full py-3.5 rounded-2xl font-body font-bold text-sm
                        bg-gradient-to-r from-fairy-violet to-fairy-pink text-white
                        shadow-lg shadow-fairy-purple/30
                      "
                    >
                      S'abonner
                    </motion.button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-fairy-dark/40 border border-white/5">
      <Icon className="w-4 h-4 text-fairy-lavender mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-fairy-mist/50 font-body">{label}</p>
        <p className="text-sm text-fairy-white font-body font-semibold">{value}</p>
      </div>
    </div>
  )
}
