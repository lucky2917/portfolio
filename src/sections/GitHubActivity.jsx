import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitCommit, GitBranch, Star, ArrowUpRight, Clock } from 'lucide-react'
import '../styles/GitHubActivity.css'

const GITHUB_USERNAME = 'lucky2917'

const getRelativeTime = (dateStr) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 30) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const getEventIcon = (type) => {
    switch (type) {
        case 'PushEvent': return GitCommit
        case 'CreateEvent': return GitBranch
        case 'WatchEvent': return Star
        default: return GitCommit
    }
}

const getEventDescription = (event) => {
    switch (event.type) {
        case 'PushEvent': {
            const commits = event.payload?.commits || []
            const msg = commits.length > 0 ? commits[0].message : 'Pushed code'
            return msg.split('\n')[0]
        }
        case 'CreateEvent':
            return `Created ${event.payload?.ref_type || 'repository'} ${event.payload?.ref || ''}`
        case 'WatchEvent':
            return 'Starred repository'
        case 'ForkEvent':
            return 'Forked repository'
        case 'IssuesEvent':
            return `${event.payload?.action || 'Updated'} issue`
        case 'PullRequestEvent':
            return `${event.payload?.action || 'Updated'} pull request`
        default:
            return event.type.replace('Event', '')
    }
}

const GitHubActivity = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=15`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch')
                return res.json()
            })
            .then(data => {
                const filtered = data
                    .filter(e => ['PushEvent', 'CreateEvent', 'WatchEvent', 'ForkEvent', 'IssuesEvent', 'PullRequestEvent'].includes(e.type))
                    .slice(0, 8)
                setEvents(filtered)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    return (
        <section id="github" className="github-section">
            <div className="github-bg">
                <div className="github-bg-gradient" />
                <div className="github-bg-glow" />
            </div>

            <div className="container github-content">
                <motion.div
                    className="github-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="github-header-left">
                        <h2 className="github-title">
                            GITHUB<span className="text-coral">.</span>
                        </h2>
                        <p className="github-subtitle text-mono">Recent Activity</p>
                    </div>
                    <motion.a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-profile-link"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-mono">@{GITHUB_USERNAME}</span>
                        <ArrowUpRight size={14} />
                    </motion.a>
                </motion.div>

                <div className="github-feed">
                    {loading && (
                        <div className="github-loading">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="github-skeleton" />
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="github-error text-mono">
                            Unable to load activity. Visit my profile directly.
                        </div>
                    )}

                    {!loading && !error && events.map((event, i) => {
                        const Icon = getEventIcon(event.type)
                        return (
                            <motion.div
                                key={event.id}
                                className="github-event"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                            >
                                <div className="event-icon-wrap">
                                    <Icon size={16} />
                                </div>
                                <div className="event-body">
                                    <span className="event-repo text-mono">
                                        {event.repo?.name?.split('/')[1] || event.repo?.name}
                                    </span>
                                    <p className="event-message">{getEventDescription(event)}</p>
                                </div>
                                <div className="event-time">
                                    <Clock size={12} />
                                    <span className="text-mono">{getRelativeTime(event.created_at)}</span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default GitHubActivity
