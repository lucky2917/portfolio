import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitCommit, GitBranch, Star, ArrowUpRight, Clock, BookOpen } from 'lucide-react'
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

const generateCalendar = () => {
    const calendar = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        calendar.push(d.toISOString().split('T')[0])
    }
    return calendar
}

const GitHubActivity = () => {
    const [events, setEvents] = useState([])
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activityMap, setActivityMap] = useState({})

    useEffect(() => {
        Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`)
        ])
            .then(([resEvents, resRepos]) => {
                if (!resEvents.ok || !resRepos.ok) throw new Error('Failed to fetch')
                return Promise.all([resEvents.json(), resRepos.json()])
            })
            .then(([eventsData, reposData]) => {
                const filtered = eventsData
                    .filter(e => ['PushEvent', 'CreateEvent', 'WatchEvent', 'ForkEvent', 'IssuesEvent', 'PullRequestEvent'].includes(e.type))

                const map = {}
                eventsData.forEach(e => {
                    const date = e.created_at.split('T')[0]
                    map[date] = (map[date] || 0) + 1
                })
                setActivityMap(map)
                setEvents(filtered.slice(0, 5))
                setRepos(reposData)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    const calendar = generateCalendar()

    return (
        <section id="github" className="github-section">
            <div className="github-bg">
                <div className="github-bg-gradient" />
                <div className="github-bg-noise" />
                <div className="github-bg-glow github-bg-glow-1" />
                <div className="github-bg-glow github-bg-glow-2" />
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
                        <p className="github-subtitle text-mono">Activity & Repositories</p>
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

                <div className="github-grid">
                    <div className="github-column">
                        {!loading && !error && (
                            <motion.div
                                className="github-analytics-container"
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="github-analytics-header">
                                    <p className="github-box-title text-mono" style={{marginBottom: 0}}>30 Days Contributions</p>
                                </div>
                                <div className="github-total-display">
                                    <span className="total-num">
                                        {calendar.reduce((sum, date) => sum + (activityMap[date] || 0), 0)}
                                    </span>
                                    <span className="total-text text-mono">Total Activities</span>
                                </div>
                                <div className="github-graph">
                                    {calendar.map((date) => {
                                        const count = activityMap[date] || 0
                                        let level = 0
                                        if (count > 0 && count <= 2) level = 1
                                        else if (count > 2 && count <= 4) level = 2
                                        else if (count > 4 && count <= 6) level = 3
                                        else if (count > 6) level = 4

                                        return (
                                            <div
                                                key={date}
                                                className={`github-day level-${level}`}
                                                title={`${count} contributions on ${date}`}
                                            />
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}

                        <div className="github-repos-container">
                            <p className="github-box-title text-mono" style={{marginBottom: '1rem'}}>Recent Repositories</p>
                            <div className="github-repos">
                            {loading && (
                                <div className="github-loading">
                                    {[...Array(2)].map((_, i) => <div key={i} className="github-skeleton repo-skeleton" />)}
                                </div>
                            )}
                            {!loading && !error && repos.map((repo, i) => (
                                <motion.a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-repo-card"
                                    initial={{ opacity: 0, x: -15 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="repo-header">
                                        <BookOpen size={16} />
                                        <span className="repo-name">{repo.name}</span>
                                    </div>
                                    <p className="repo-desc">{repo.description || 'No description provided.'}</p>
                                    <div className="repo-stats">
                                        {repo.language && <span className="repo-lang text-mono"><span className="lang-dot"></span>{repo.language}</span>}
                                        <span className="repo-star text-mono"><Star size={10} /> {repo.stargazers_count}</span>
                                    </div>
                                </motion.a>
                            ))}
                            </div>
                        </div>
                    </div>

                    <div className="github-column">
                        <p className="github-box-title text-mono" style={{marginBottom: '1rem'}}>Contribution Activity</p>
                        <div className="github-feed">
                            {loading && (
                                <div className="github-loading">
                                    {[...Array(4)].map((_, i) => <div key={i} className="github-skeleton" />)}
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
                </div>
            </div>
        </section>
    )
}

export default GitHubActivity
