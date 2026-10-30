
import { useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Globe2,
  Plus,
  Shield,
  TriangleAlert,
} from "lucide-react";

import {
  alerts,
  events,
  threats,
  type SecurityEvent,
} from "../data/demo";

import { useLiveEvents } from "../hooks/useLiveEvents";
import { AlertTable, IncidentTable } from "../components/tables";
import {
  CategoryChart,
  SecurityChart,
  SeverityChart,
} from "../components/charts";

import {
  DataTable,
  Drawer,
  EmptyState,
  FilterSelect,
  LiveIndicator,
  PageIntro,
  Panel,
  SearchBox,
  StatusBadge,
} from "../components/ui";

import { LiveFeed } from "./Dashboard";

/* =========================================================
   SECURITY LOGS
========================================================= */

export function SecurityLogsPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All");
  const [type, setType] = useState("All");
  const [selected, setSelected] = useState<SecurityEvent | null>(null);
  const [page, setPage] = useState(1);

  const rows = useMemo(
    () =>
      events.filter(
        (item) =>
          (severity === "All" ||
            item.severity === severity.toUpperCase()) &&
          (type === "All" || item.type === type) &&
          `${item.source} ${item.username} ${item.message}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [query, severity, type]
  );

  return (
    <>
      <PageIntro
        kicker="EVENT MANAGEMENT"
        title="Security logs"
        description="Search and inspect normalized events across the simulated monitoring environment."
      />

      <Panel>
        <div className="filter-bar wrap">
          <SearchBox value={query} onChange={setQuery} />

          <FilterSelect
            label="Severity"
            value={severity}
            onChange={setSeverity}
            options={["All", "Critical", "High", "Medium", "Low"]}
          />

          <FilterSelect
            label="Event type"
            value={type}
            onChange={setType}
            options={[
              "All",
              ...Array.from(new Set(events.map((event) => event.type))),
            ]}
          />

          <label className="filter-select">
            <span>Date</span>
            <input type="date" aria-label="Date filter" />
          </label>

          <label className="filter-select">
            <span>Source IP</span>
            <input placeholder="192.168.x.x" aria-label="Source IP filter" />
          </label>
        </div>

        {rows.length > 0 ? (
          <DataTable
            columns={[
              "Timestamp",
              "Source IP",
              "Username",
              "Event",
              "Severity",
              "Message",
              "Status",
              "",
            ]}
          >
            {rows.map((item) => (
              <tr key={item.id}>
                <td className="mono muted">{item.timestamp}</td>
                <td className="mono">{item.source}</td>
                <td>{item.username}</td>
                <td className="event-type">{item.type}</td>
                <td>
                  <StatusBadge value={item.severity} />
                </td>
                <td className="message-cell">{item.message}</td>
                <td>
                  <StatusBadge value={item.status} />
                </td>
                <td>
                  <button
                    type="button"
                    className="table-action"
                    onClick={() => setSelected(item)}
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState />
        )}

        <div className="pagination">
          <span>Showing {rows.length} of 128 simulated events</span>

          <div>
            <button
              type="button"
              onClick={() => setPage(Math.max(1, page - 1))}
            >
              <ChevronLeft size={15} />
            </button>

            <b>{page}</b>

            <button
              type="button"
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </Panel>

      <Drawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.id ?? "Event"}
      >
        {selected && (
          <div className="detail-content">
            <dl>
              {Object.entries(selected).map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd
                    className={
                      key === "source" || key === "id" ? "mono" : ""
                    }
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="callout">
              <Shield size={17} />
              <p>
                This record is fictional and exists only for interface
                demonstration.
              </p>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}

/* =========================================================
   ALERTS
========================================================= */

export function AlertsPage() {
  return (
    <>
      <PageIntro
        kicker="DETECTION QUEUE"
        title="Alerts"
        description="Triage, investigate, and resolve simulated detections from one focused workspace."
        action={
          <button type="button" className="button secondary">
            <Download size={15} />
            Export queue
          </button>
        }
      />

      <Panel title="Active alert queue" eyebrow="47 TOTAL / 8 CRITICAL">
        <AlertTable />
      </Panel>
    </>
  );
}

/* =========================================================
   INCIDENTS
========================================================= */

export function IncidentsPage() {
  return (
    <>
      <PageIntro
        kicker="RESPONSE MANAGEMENT"
        title="Incidents"
        description="Coordinate ownership, investigation, containment, and resolution workflows."
        action={
          <button type="button" className="button primary">
            <Plus size={15} />
            New incident
          </button>
        }
      />

      <div className="mini-stats">
        {[
          ["New", "4"],
          ["Assigned", "6"],
          ["Investigating", "5"],
          ["Containment", "2"],
          ["Resolved", "12"],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <Panel title="Incident register" eyebrow="ACTIVE CASELOAD">
        <IncidentTable />
      </Panel>
    </>
  );
}

/* =========================================================
   LIVE MONITOR
========================================================= */

export function LiveMonitorPage() {
  const live = useLiveEvents();

  return (
    <>
      <PageIntro
        kicker="REAL-TIME OPERATIONS"
        title="Live monitor"
        description="Streaming simulated security telemetry with system and response visibility."
        action={<LiveIndicator label="EVENT STREAM CONNECTED" />}
      />

      <div className="status-ribbon">
        {["Security engine", "Event stream", "Database", "Monitoring"].map(
          (item, index) => (
            <div key={item}>
              <span className="pulse-dot" />
              <small>{item}</small>
              <strong>
                {index === 1
                  ? "CONNECTED"
                  : index === 3
                    ? "ACTIVE"
                    : "ONLINE"}
              </strong>
            </div>
          )
        )}
      </div>

      <div className="monitor-grid">
        <Panel title="Live event stream" eyebrow="INGEST PIPELINE">
          <LiveFeed />
        </Panel>

        <Panel title="System activity" eyebrow="ROLLING TELEMETRY">
          <SecurityChart compact />

          <div className="flow-line">
            <span>Sources</span>
            <ArrowRight />
            <span>Gateway</span>
            <ArrowRight />
            <span>Analyzer</span>
            <ArrowRight />
            <span>Store</span>
          </div>
        </Panel>

        <Panel title="Current alerts" eyebrow="RESPONSE QUEUE">
          <div className="alert-stack">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id}>
                <span>
                  <b className="mono">{alert.id}</b>
                  {alert.type}
                </span>

                <StatusBadge value={alert.severity} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   THREAT INTELLIGENCE CENTER - COMMIT 3
========================================================= */

export function ThreatIntelPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const [country, setCountry] = useState("All");

  const [selected, setSelected] =
    useState<(typeof threats)[number] | null>(null);

  const countries = useMemo(
    () => [
      "All",
      ...Array.from(new Set(threats.map((item) => item.country))),
    ],
    []
  );

  const rows = useMemo(
    () =>
      threats.filter(
        (item) =>
          (level === "All" ||
            item.level === level.toUpperCase()) &&
          (country === "All" || item.country === country) &&
          `${item.ip} ${item.country} ${item.category}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [query, level, country]
  );

  const criticalCount = threats.filter(
    (item) => item.level === "CRITICAL"
  ).length;

  const highCount = threats.filter(
    (item) => item.level === "HIGH"
  ).length;

  const totalEvents = threats.reduce(
    (total, item) => total + item.events,
    0
  );

  return (
    <>
      <PageIntro
        kicker="INTELLIGENCE / IOC INVESTIGATION"
        title="Threat intelligence center"
        description="Discover, search, classify, and investigate simulated threat indicators across your security environment."
      />

      {/* Monitoring status banner */}

      <div className="threat-banner">
        <div className="threat-banner-icon">
          <Shield size={23} />
        </div>

        <div className="threat-banner-copy">
          <strong>Threat monitoring active</strong>
          <p>
            Indicator intelligence is available for analyst investigation.
          </p>
        </div>

        <span className="threat-demo-tag">
          <span className="soc-online-dot" />
          SIMULATION MODE
        </span>
      </div>

      {/* Intelligence statistics */}

      <section className="threat-stat-grid">
        <article className="threat-stat-card">
          <div className="threat-stat-top">
            <span>Total indicators</span>
            <Globe2 size={19} />
          </div>

          <strong>
            {threats.length.toString().padStart(2, "0")}
          </strong>

          <small>Tracked demo indicators</small>
        </article>

        <article className="threat-stat-card threat-stat-critical">
          <div className="threat-stat-top">
            <span>Critical threats</span>
            <TriangleAlert size={19} />
          </div>

          <strong>
            {criticalCount.toString().padStart(2, "0")}
          </strong>

          <small>Require priority review</small>
        </article>

        <article className="threat-stat-card threat-stat-high">
          <div className="threat-stat-top">
            <span>High-risk indicators</span>
            <Shield size={19} />
          </div>

          <strong>
            {highCount.toString().padStart(2, "0")}
          </strong>

          <small>Elevated severity</small>
        </article>

        <article className="threat-stat-card threat-stat-events">
          <div className="threat-stat-top">
            <span>Related events</span>
            <Activity size={19} />
          </div>

          <strong>{totalEvents.toLocaleString()}</strong>

          <small>Across tracked indicators</small>
        </article>
      </section>

      {/* Indicator investigation table */}

      <Panel
        title="Indicator investigation"
        eyebrow="INDICATORS OF COMPROMISE / IOC"
        action={
          <span className="threat-record-count">
            {rows.length} / {threats.length} RECORDS
          </span>
        }
      >
        <div className="threat-filter-area">
          <div className="threat-search">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search IP, region or threat category..."
            />
          </div>

          <FilterSelect
            label="Country / Region"
            value={country}
            onChange={setCountry}
            options={countries}
          />

          <FilterSelect
            label="Threat severity"
            value={level}
            onChange={setLevel}
            options={["All", "Critical", "High", "Medium", "Low"]}
          />
        </div>

        {rows.length > 0 ? (
          <DataTable
            columns={[
              "Indicator / IP address",
              "Region",
              "Severity",
              "Threat category",
              "First seen",
              "Last seen",
              "Events",
              "Investigation",
            ]}
          >
            {rows.map((item) => (
              <tr key={item.ip}>
                <td>
                  <span className="threat-ip">{item.ip}</span>
                  <small className="threat-indicator-type">
                    IPv4 / SIMULATED
                  </small>
                </td>

                <td>{item.country}</td>

                <td>
                  <StatusBadge value={item.level} />
                </td>

                <td>{item.category}</td>

                <td className="muted">{item.first}</td>

                <td>{item.last}</td>

                <td>
                  <strong className="threat-event-count">
                    {item.events}
                  </strong>
                </td>

                <td>
                  <button
                    type="button"
                    className="table-action threat-investigate"
                    onClick={() => setSelected(item)}
                  >
                    Investigate
                    <ArrowRight size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState />
        )}

        <div className="threat-table-footer">
          <span>Showing {rows.length} matching indicators</span>
          <span>All records are fictional demonstration data</span>
        </div>
      </Panel>

      {/* Severity and analyst workflow */}

      <div className="threat-bottom-grid">
        <Panel title="Severity distribution" eyebrow="RISK CLASSIFICATION">
          <div className="threat-severity-list">
            {(["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map(
              (severity) => {
                const count = threats.filter(
                  (item) => item.level === severity
                ).length;

                const percentage =
                  threats.length > 0
                    ? (count / threats.length) * 100
                    : 0;

                return (
                  <div className="threat-severity-item" key={severity}>
                    <div>
                      <StatusBadge value={severity} />
                      <strong>{count}</strong>
                    </div>

                    <div className="threat-severity-track">
                      <span
                        className={`severity-${severity.toLowerCase()}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Panel>

        <Panel title="Analyst guidance" eyebrow="INVESTIGATION WORKFLOW">
          <div className="threat-guidance">
            <div>
              <span>01</span>
              <p>
                <strong>Identify</strong>
                Search for an indicator using its IP address or category.
              </p>
            </div>

            <div>
              <span>02</span>
              <p>
                <strong>Classify</strong>
                Review the severity and associated event count.
              </p>
            </div>

            <div>
              <span>03</span>
              <p>
                <strong>Investigate</strong>
                Open an indicator to inspect its available information.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      {/* Investigation drawer */}

      <Drawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Indicator investigation"
      >
        {selected && (
          <div className="detail-content threat-detail">
            <div className="threat-detail-heading">
              <span className="threat-detail-icon">
                <Globe2 size={22} />
              </span>

              <div>
                <small>INDICATOR ADDRESS</small>
                <strong className="mono">{selected.ip}</strong>
              </div>
            </div>

            <div className="threat-detail-severity">
              <span>Threat classification</span>
              <StatusBadge value={selected.level} />
            </div>

            <dl>
              <div>
                <dt>Indicator type</dt>
                <dd>IPv4 / Simulated</dd>
              </div>

              <div>
                <dt>Region</dt>
                <dd>{selected.country}</dd>
              </div>

              <div>
                <dt>Threat category</dt>
                <dd>{selected.category}</dd>
              </div>

              <div>
                <dt>First observed</dt>
                <dd>{selected.first}</dd>
              </div>

              <div>
                <dt>Last observed</dt>
                <dd>{selected.last}</dd>
              </div>

              <div>
                <dt>Related events</dt>
                <dd>{selected.events}</dd>
              </div>
            </dl>

            <div className="callout">
              <Shield size={17} />
              <p>
                This is fictional threat intelligence data for safe
                portfolio demonstrations. No live reputation lookup
                or external threat verification has been performed.
              </p>
            </div>

            <button
              type="button"
              className="button secondary threat-close-button"
              onClick={() => setSelected(null)}
            >
              <Check size={15} />
              Close investigation
            </button>
          </div>
        )}
      </Drawer>
    </>
  );
}

/* =========================================================
   ATTACK SURFACE MAP
========================================================= */

export function AttackMapPage() {
  return (
    <>
      <PageIntro
        kicker="GEOGRAPHIC TELEMETRY / SIMULATION"
        title="Attack surface map"
        description="An informational view of fictional event origins and the protected application path."
      />

      <Panel className="map-panel">
        <div
          className="map-stage"
          aria-label="Abstract simulated world event map"
        >
          <div className="world-grid" />

          <span className="continent c1" />
          <span className="continent c2" />
          <span className="continent c3" />
          <span className="continent c4" />

          {(
            [
              [18, 33],
              [31, 62],
              [51, 29],
              [65, 48],
              [78, 35],
              [83, 69],
            ] as const
          ).map(([x, y], index) => (
            <i
              key={index}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <b />
            </i>
          ))}

          <div className="map-label">
            <LiveIndicator label="SIMULATED SOURCES" />
            <strong>186</strong>
            <span>events observed in the last hour</span>
          </div>
        </div>
      </Panel>

      <Panel title="Protected data path" eyebrow="DEFENSIVE ARCHITECTURE">
        <div className="network-flow">
          {[
            "Simulated source",
            "Internet gateway",
            "Firewall",
            "Application",
            "Database",
          ].map((item, index) => (
            <div key={item}>
              <span>{index + 1}</span>
              <strong>{item}</strong>
              {index < 4 && <ArrowDown />}
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

/* =========================================================
   ANALYTICS
========================================================= */

export function AnalyticsPage() {
  const [range, setRange] = useState("30 DAYS");

  return (
    <>
      <PageIntro
        kicker="SECURITY INTELLIGENCE"
        title="Analytics"
        description="Trend analysis across simulated events, alerts, authentication, and incident response."
        action={
          <button type="button" className="button secondary">
            <Download size={15} />
            Export report
          </button>
        }
      />

      <div className="analytics-toolbar">
        <div className="segments">
          {["7 DAYS", "30 DAYS", "90 DAYS"].map((item) => (
            <button
              type="button"
              className={range === item ? "active" : ""}
              onClick={() => setRange(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>

        <span>Data refreshed 42 seconds ago</span>
      </div>

      <div className="analytics-grid">
        <Panel
          className="span-2"
          title="Security events over time"
          eyebrow="EVENT VOLUME"
        >
          <SecurityChart />
        </Panel>

        <Panel title="Alerts by severity" eyebrow="RISK DISTRIBUTION">
          <SeverityChart />
        </Panel>

        <Panel title="Events by category" eyebrow="CLASSIFICATION">
          <CategoryChart />
        </Panel>

        <Panel title="Incidents by status" eyebrow="RESPONSE">
          <MetricBars
            items={[
              ["Investigating", 19],
              ["Containment", 11],
              ["Resolved", 42],
              ["Closed", 28],
            ]}
          />
        </Panel>

        <Panel title="Top simulated source IPs" eyebrow="SOURCE FREQUENCY">
          <MetricBars
            items={[
              ["192.168.24.x", 128],
              ["10.42.7.x", 74],
              ["172.16.18.x", 51],
              ["192.168.8.x", 19],
            ]}
          />
        </Panel>

        <Panel title="Authentication failures" eyebrow="IDENTITY">
          <div className="big-metric">
            <strong>1,284</strong>
            <span>last {range.toLowerCase()}</span>
            <small>↓ 8.2% from previous period</small>
          </div>
        </Panel>

        <Panel
          className="span-2"
          title="Monthly security trend"
          eyebrow="LONG-RANGE POSTURE"
        >
          <SecurityChart compact />
        </Panel>
      </div>
    </>
  );
}

/* =========================================================
   SHARED METRIC BARS
========================================================= */

function MetricBars({
  items,
}: {
  items: [string, number][];
}) {
  const max = Math.max(1, ...items.map((item) => item[1]));

  return (
    <div className="metric-bars">
      {items.map(([label, value]) => (
        <div key={label}>
          <span>
            {label}
            <b>{value}</b>
          </span>

          <i>
            <b style={{ width: `${(value / max) * 100}%` }} />
          </i>
        </div>
      ))}
    </div>
  );
}
