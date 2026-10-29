
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Clock3,
  Radio,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLiveEvents } from "../hooks/useLiveEvents";
import {
  SecurityChart,
  SeverityChart,
} from "../components/charts";
import {
  AlertTable,
  IncidentTable,
} from "../components/tables";
import {
  LiveIndicator,
  PageIntro,
  Panel,
  StatusBadge,
} from "../components/ui";

const stats = [
  {
    label: "Total security events",
    value: "24,582",
    trend: "+12.4%",
    meta: "Updated 12 sec ago",
    icon: Activity,
    tone: "blue",
  },
  {
    label: "Active alerts",
    value: "47",
    trend: "+5 today",
    meta: "Updated 8 sec ago",
    icon: AlertTriangle,
    tone: "amber",
  },
  {
    label: "Critical alerts",
    value: "08",
    trend: "2 escalated",
    meta: "Updated 8 sec ago",
    icon: ShieldAlert,
    tone: "red",
    critical: true,
  },
  {
    label: "Open incidents",
    value: "19",
    trend: "-3 resolved",
    meta: "Updated 1 min ago",
    icon: Radio,
    tone: "green",
  },
];

const healthMetrics = [
  {
    label: "Security engine",
    value: "99.99%",
    detail: "Operational",
    percentage: 99,
  },
  {
    label: "Event pipeline",
    value: "4.2k / min",
    detail: "Processing",
    percentage: 84,
  },
  {
    label: "Detection rules",
    value: "128 / 132",
    detail: "4 inactive",
    percentage: 97,
  },
  {
    label: "Mean response",
    value: "3m 42s",
    detail: "Response time",
    percentage: 72,
  },
];

export function DashboardPage() {
  const [range, setRange] = useState("24H");

  return (
    <>
      <PageIntro
        kicker="OVERVIEW / SIMULATION"
        title="Security posture overview"
        description="Consolidated visibility across monitored systems, security events, alerts, and incident response."
      />

      <motion.section
        className="soc-status-strip"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        aria-label="Security platform status"
      >
        <div className="soc-status-main">
          <span className="soc-status-icon">
            <ShieldCheck size={20} />
          </span>
          <div>
            <strong>Security operations online</strong>
            <p>Monitoring simulation data across your security environment.</p>
          </div>
        </div>

        <div className="soc-status-meta">
          <span className="soc-online-dot" />
          ALL SYSTEMS MONITORED
        </div>
      </motion.section>

      <section className="stat-grid" aria-label="Security key performance indicators">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.07,
                duration: 0.35,
              }}
              className={`stat-card stat-${stat.tone} ${
                stat.critical ? "critical" : ""
              }`}
              key={stat.label}
            >
              <header>
                <span className="stat-icon-wrap">
                  <Icon size={19} />
                </span>

                <span className="trend">
                  <TrendingUp size={12} />
                  {stat.trend}
                </span>
              </header>

              <strong className="stat-value">{stat.value}</strong>
              <p>{stat.label}</p>

              <footer>
                <Clock3 size={12} />
                <span>{stat.meta}</span>
                <span className="simulated-label">DEMO DATA</span>
              </footer>
            </motion.article>
          );
        })}
      </section>

      <section className="dashboard-grid">
        <Panel
          title="Security events"
          eyebrow="ACTIVITY ANALYTICS"
          className="span-2"
          action={
            <div className="segments" aria-label="Chart time range">
              {["1H", "6H", "12H", "24H"].map((item) => (
                <button
                  type="button"
                  className={range === item ? "active" : ""}
                  aria-pressed={range === item}
                  onClick={() => setRange(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          }
        >
          <div className="chart-heading">
            <div>
              <span className="chart-subtitle">EVENT VOLUME</span>
              <p className="chart-description">
                Security activity over the selected monitoring period.
              </p>
            </div>

            <span className="chart-live-tag">
              <span className="soc-online-dot" />
              SIMULATED
            </span>
          </div>

          <SecurityChart />
        </Panel>

        <Panel
          title="Threat severity"
          eyebrow="DETECTION CLASSIFICATION"
        >
          <div className="chart-heading">
            <div>
              <span className="chart-subtitle">ALERT DISTRIBUTION</span>
              <p className="chart-description">
                Breakdown by severity level.
              </p>
            </div>
            <AlertTriangle size={17} />
          </div>

          <SeverityChart />
        </Panel>

        <Panel
          title="Live security event feed"
          eyebrow="EVENT STREAM"
          className="span-2"
          action={<LiveIndicator />}
        >
          <div className="feed-caption">
            <Zap size={14} />
            Recent events from the local demonstration stream.
          </div>

          <LiveFeed />
        </Panel>

        <Panel
          title="Operational health"
          eyebrow="SYSTEM TELEMETRY"
        >
          <div className="health-list">
            {healthMetrics.map((metric) => (
              <div className="health-metric" key={metric.label}>
                <div className="health-metric-heading">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>

                <div
                  className="health-progress"
                  role="progressbar"
                  aria-label={metric.label}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={metric.percentage}
                >
                  <span
                    style={{ width: `${metric.percentage}%` }}
                  />
                </div>

                <small>{metric.detail}</small>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          title="Active alerts"
          eyebrow="PRIORITY QUEUE"
          className="full-span"
          action={
            <Link className="panel-link" to="/alerts">
              View all alerts <ArrowRight size={14} />
            </Link>
          }
        >
          <AlertTable limit={4} interactive={false} />
        </Panel>

        <Panel
          title="Incident overview"
          eyebrow="RESPONSE WORKFLOW"
          className="full-span"
          action={
            <Link className="panel-link" to="/incidents">
              View all incidents <ArrowRight size={14} />
            </Link>
          }
        >
          <IncidentTable limit={3} />
        </Panel>
      </section>
    </>
  );
}

export function LiveFeed() {
  const live = useLiveEvents();

  if (live.length === 0) {
    return (
      <div className="feed-empty">
        <Activity size={20} />
        <p>No recent events are available.</p>
      </div>
    );
  }

  return (
    <div className="event-feed">
      {live.map((event, index) => (
        <motion.div
          className="event-feed-row"
          initial={index === 0 ? { opacity: 0, y: -8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          key={`${event.id}-${event.timestamp}`}
        >
          <time title={event.timestamp}>
            {event.timestamp.split(" ").at(-1) ?? event.timestamp}
          </time>

          <span className="event-type">{event.type}</span>

          <span className="mono event-source">{event.source}</span>

          <StatusBadge value={event.severity} />
          <StatusBadge value={event.status} />
        </motion.div>
      ))}
    </div>
  );
}
