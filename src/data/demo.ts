export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
export type Status = "NEW" | "OPEN" | "INVESTIGATING" | "ACKNOWLEDGED" | "CONTAINMENT" | "RESOLVED" | "CLOSED" | "SUCCESS" | "BLOCKED" | "MONITORING";

export interface SecurityEvent { id: string; timestamp: string; source: string; username: string; type: string; severity: Severity; message: string; status: Status }
export interface Alert { id: string; type: string; source: string; severity: Severity; status: Status; created: string; description: string; relatedEvent: string }
export interface Incident { id: string; title: string; severity: Severity; analyst: string; status: Status; updated: string; notes: string[] }

export const events: SecurityEvent[] = [
  { id:"EV-9018", timestamp:"2026-09-23 22:41:08", source:"192.168.24.x", username:"demo.user", type:"ACCOUNT_LOCKED", severity:"CRITICAL", message:"Account locked after repeated authentication failures", status:"BLOCKED" },
  { id:"EV-9017", timestamp:"2026-09-23 22:41:04", source:"10.42.7.x", username:"service.demo", type:"SUSPICIOUS_REQUEST", severity:"MEDIUM", message:"Request signature deviated from baseline", status:"MONITORING" },
  { id:"EV-9016", timestamp:"2026-09-23 22:41:01", source:"172.16.18.x", username:"analyst.demo", type:"LOGIN_FAILURE", severity:"HIGH", message:"Five failed sign-in attempts within 60 seconds", status:"OPEN" },
  { id:"EV-9015", timestamp:"2026-09-23 22:38:19", source:"192.168.8.x", username:"system", type:"POLICY_CHANGE", severity:"HIGH", message:"Protected access policy modified", status:"INVESTIGATING" },
  { id:"EV-9014", timestamp:"2026-09-23 22:35:42", source:"10.18.4.x", username:"guest.demo", type:"ACCESS_DENIED", severity:"MEDIUM", message:"Restricted resource access denied", status:"BLOCKED" },
  { id:"EV-9013", timestamp:"2026-09-23 22:31:16", source:"172.16.2.x", username:"system", type:"SERVICE_HEALTH", severity:"LOW", message:"Monitoring service heartbeat received", status:"SUCCESS" },
  { id:"EV-9012", timestamp:"2026-09-23 22:28:03", source:"192.168.33.x", username:"demo.user", type:"SESSION_ANOMALY", severity:"CRITICAL", message:"Concurrent session behavior detected", status:"OPEN" },
  { id:"EV-9011", timestamp:"2026-09-23 22:24:55", source:"10.7.19.x", username:"api.demo", type:"RATE_LIMIT", severity:"MEDIUM", message:"Demo API request threshold exceeded", status:"BLOCKED" },
];

export const alerts: Alert[] = [
  { id:"AX-1024", type:"Suspicious Login", source:"192.168.24.x", severity:"HIGH", status:"NEW", created:"2 min ago", description:"Sign-in velocity exceeded the simulated risk threshold.", relatedEvent:"EV-9016" },
  { id:"AX-1023", type:"Privilege Change", source:"10.42.7.x", severity:"CRITICAL", status:"INVESTIGATING", created:"8 min ago", description:"A protected role assignment changed outside its expected window.", relatedEvent:"EV-9015" },
  { id:"AX-1022", type:"Session Anomaly", source:"172.16.18.x", severity:"CRITICAL", status:"OPEN", created:"14 min ago", description:"Concurrent simulated sessions were identified for one account.", relatedEvent:"EV-9012" },
  { id:"AX-1021", type:"Access Pattern", source:"192.168.8.x", severity:"MEDIUM", status:"ACKNOWLEDGED", created:"21 min ago", description:"Resource access pattern differs from the demo baseline.", relatedEvent:"EV-9014" },
  { id:"AX-1020", type:"Rate Threshold", source:"10.18.4.x", severity:"LOW", status:"MONITORING", created:"34 min ago", description:"Request volume briefly crossed the monitoring threshold.", relatedEvent:"EV-9011" },
];

export const incidents: Incident[] = [
  { id:"INC-1024", title:"Multiple Login Failures", severity:"HIGH", analyst:"Analyst 01", status:"INVESTIGATING", updated:"4 min ago", notes:["Initial triage completed.","Authentication logs attached."] },
  { id:"INC-1023", title:"Suspicious Access Sequence", severity:"CRITICAL", analyst:"Analyst 02", status:"OPEN", updated:"11 min ago", notes:["Escalated from AX-1023."] },
  { id:"INC-1022", title:"Protected Policy Modification", severity:"HIGH", analyst:"Analyst 03", status:"CONTAINMENT", updated:"26 min ago", notes:["Demo account access suspended.","Policy restored to baseline."] },
  { id:"INC-1021", title:"Abnormal API Request Rate", severity:"MEDIUM", analyst:"Unassigned", status:"NEW", updated:"41 min ago", notes:[] },
  { id:"INC-1020", title:"Concurrent Session Review", severity:"LOW", analyst:"Analyst 01", status:"RESOLVED", updated:"1 hr ago", notes:["Expected training simulation confirmed."] },
];

export const threats = [
 { ip:"192.168.24.x", country:"Example Region A", level:"CRITICAL" as Severity, category:"Credential abuse", first:"18 Sep 2026", last:"2 min ago", events:128 },
 { ip:"10.42.7.x", country:"Example Region B", level:"HIGH" as Severity, category:"Access anomaly", first:"20 Sep 2026", last:"8 min ago", events:74 },
 { ip:"172.16.18.x", country:"Example Region C", level:"MEDIUM" as Severity, category:"Request anomaly", first:"21 Sep 2026", last:"14 min ago", events:51 },
 { ip:"192.168.8.x", country:"Example Region D", level:"LOW" as Severity, category:"Recon simulation", first:"22 Sep 2026", last:"34 min ago", events:19 },
];

export const chartData = [
 {time:"00:00",login:44,suspicious:18,access:72,system:28},{time:"03:00",login:31,suspicious:23,access:58,system:34},{time:"06:00",login:62,suspicious:35,access:94,system:31},{time:"09:00",login:82,suspicious:48,access:132,system:42},{time:"12:00",login:71,suspicious:63,access:118,system:39},{time:"15:00",login:96,suspicious:54,access:151,system:47},{time:"18:00",login:124,suspicious:77,access:168,system:58},{time:"21:00",login:88,suspicious:69,access:142,system:44},{time:"24:00",login:105,suspicious:82,access:156,system:52},
];
export const severityData = [{name:"Critical",value:8,color:"var(--critical)"},{name:"High",value:19,color:"var(--high)"},{name:"Medium",value:35,color:"var(--medium)"},{name:"Low",value:71,color:"var(--low)"}];
export const auditLogs = [
 {time:"23 Sep 2026, 22:39",user:"analyst01",action:"UPDATE_INCIDENT",resource:"INC-1024",change:"Investigating → Containment",ip:"192.168.4.x",status:"SUCCESS"},
 {time:"23 Sep 2026, 22:31",user:"admin.demo",action:"ACKNOWLEDGE_ALERT",resource:"AX-1021",change:"New → Acknowledged",ip:"10.24.9.x",status:"SUCCESS"},
 {time:"23 Sep 2026, 22:17",user:"analyst02",action:"ASSIGN_INCIDENT",resource:"INC-1023",change:"Unassigned → Analyst 02",ip:"172.16.12.x",status:"SUCCESS"},
 {time:"23 Sep 2026, 21:54",user:"viewer.demo",action:"EXPORT_REPORT",resource:"RPT-0441",change:"— → Requested",ip:"192.168.18.x",status:"SUCCESS"},
];
export const users = [
 {name:"Aarav Mehta",email:"aarav@example.test",role:"ADMIN",status:"ACTIVE",last:"Now"},{name:"Mira Sen",email:"mira@example.test",role:"ANALYST",status:"ACTIVE",last:"4 min ago"},{name:"Kabir Roy",email:"kabir@example.test",role:"ANALYST",status:"AWAY",last:"22 min ago"},{name:"Nila Das",email:"nila@example.test",role:"VIEWER",status:"INACTIVE",last:"2 days ago"},
];
export const detectionRules = [
 {rule:"Brute Force Detection",category:"Authentication",severity:"HIGH",status:"ACTIVE",last:"2 min ago"},{rule:"Privilege Escalation Watch",category:"Authorization",severity:"CRITICAL",status:"ACTIVE",last:"8 min ago"},{rule:"Request Rate Anomaly",category:"Application",severity:"MEDIUM",status:"ACTIVE",last:"34 min ago"},{rule:"Inactive Account Access",category:"Identity",severity:"LOW",status:"PAUSED",last:"3 days ago"},
];
