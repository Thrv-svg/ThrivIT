import React, { useState } from 'react';
import { Cloud, Cpu, Server, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  outcome: string;
  pillars: string[];
  techFocus: string[];
  benchmark: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cloud-architecture',
    number: '01',
    title: 'Integrated Cloud Architecture & Zero-Downtime Migration',
    shortDesc: 'Re-engineering legacy monoliths into resilient, event-driven distributed topologies with automated blue/green cutover.',
    icon: <Cloud className="w-5 h-5 text-emerald-400" />,
    outcome: 'Eliminates maintenance downtime windows and scales compute dynamically with load.',
    pillars: [
      'Distributed event brokers with Kafka and AWS EventBridge topologies',
      'Immutable infrastructure definitions via Terraform and GitOps pipelines',
      'Multi-region active-active database replication with zero data divergence'
    ],
    techFocus: ['Kubernetes (EKS/GKE)', 'Apache Kafka', 'Terraform', 'PostgreSQL Distributed'],
    benchmark: '99.999% Service Uptime SLA'
  },
  {
    id: 'data-intelligence',
    number: '02',
    title: 'Streaming Analytics & Real-Time Data Fabric',
    shortDesc: 'Turning disconnected corporate data silos into high-frequency telemetry pipelines that trigger automated business interventions.',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    outcome: 'Compresses business decision latency from 24-hour batch jobs to sub-second real-time action.',
    pillars: [
      'In-memory stream processing with Apache Flink and Spark Streaming',
      'Columnar analytical data warehouses (ClickHouse, Snowflake) for instant querying',
      'Automated schema enforcement and data quality guardrails at ingest'
    ],
    techFocus: ['Apache Flink', 'ClickHouse', 'OpenTelemetry', 'Python / Rust Pipelines'],
    benchmark: 'Sub-2-Second Telemetry Ingestion'
  },
  {
    id: 'enterprise-saas',
    number: '03',
    title: 'Enterprise SaaS & Scalable Core Platforms',
    shortDesc: 'Developing high-throughput, multi-tenant digital platforms engineered for enterprise governance, custom workflows, and deep APIs.',
    icon: <Server className="w-5 h-5 text-teal-400" />,
    outcome: 'Enables rapid expansion into Fortune 500 accounts with isolated tenant compliance.',
    pillars: [
      'Dynamic tenant sharding with strict cryptographic data segregation',
      'Modular REST & GraphQL APIs with declarative rate limiting and token buckets',
      'Role-based access control (RBAC/ABAC) and enterprise SSO (SAML/Okta)'
    ],
    techFocus: ['Go', 'TypeScript / React', 'Redis Clusters', 'OpenAPI / GraphQL'],
    benchmark: '100,000+ Concurrent Tenants Handled'
  },
  {
    id: 'zero-trust-security',
    number: '04',
    title: 'High-Availability Zero-Trust Infrastructure',
    shortDesc: 'Hardening enterprise services with continuous cryptographic identity, automated chaos recovery drills, and strict policy as code.',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    outcome: 'Satisfies SOC2 Type II, PCI-DSS, and ISO 27001 requirements while maintaining sub-millisecond network handshakes.',
    pillars: [
      'Mutual TLS (mTLS) with SPIFFE/SPIRE dynamic workload attestation',
      'Policy-as-code enforcement via Open Policy Agent (OPA)',
      'Automated chaos engineering drills with simulated region blackout testing'
    ],
    techFocus: ['SPIFFE / SPIRE', 'Envoy Mesh', 'Open Policy Agent', 'HashiCorp Vault'],
    benchmark: 'Zero Critical Findings in Audits'
  }
];

interface CapabilitiesProps {
  onSelectConsultation: (serviceTitle: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onSelectConsultation }) => {
  const [activeTab, setActiveTab] = useState(CAPABILITIES[0].id);
  const activeCapability = CAPABILITIES.find((c) => c.id === activeTab) || CAPABILITIES[0];

  return (
    <section id="capabilities" className="py-24 border-b border-slate-800/80 bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider">
            CORE CAPABILITIES & ENGINEERING RIGOR
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
            Integrated systems designed for zero compromise and unbounded scale.
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            We avoid disconnected agency deliverables. ThrivIT engineers the end-to-end technical machinery—from cloud substrates to user interfaces—that powers sustainable digital enterprises.
          </p>
        </div>

        {/* 2-Column Bento / Interactive Architecture Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Numbered Service Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {CAPABILITIES.map((cap) => {
              const isSelected = cap.id === activeTab;
              return (
                <div
                  key={cap.id}
                  onClick={() => setActiveTab(cap.id)}
                  className={`p-5 rounded-xl border transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#131B2A] border-emerald-500/50 shadow-lg shadow-emerald-950/40'
                      : 'bg-[#0E131E] border-slate-800/80 hover:bg-[#111724] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-slate-500">
                        {cap.number}. Capability
                      </div>
                      <h3 className={`text-base font-semibold leading-snug transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}>
                        {cap.title}
                      </h3>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 shrink-0">
                      {cap.icon}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cap.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Blueprint Viewer (7 cols) */}
          <div className="lg:col-span-7 bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-emerald-400 mb-1">
                  ARCHITECTURAL DEPLOYMENT SPECIFICATION
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {activeCapability.title}
                </h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300 self-start sm:self-auto shrink-0">
                {activeCapability.benchmark}
              </div>
            </div>

            {/* Core Outcome */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-xs font-semibold text-slate-400">MEASURABLE CLIENT OUTCOME</div>
              <p className="text-sm text-emerald-300 leading-relaxed font-medium">
                {activeCapability.outcome}
              </p>
            </div>

            {/* Architectural Pillars */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-300 tracking-wider">
                ENGINEERING PILLARS & INVARIANTS
              </div>
              <div className="space-y-2.5">
                {activeCapability.pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-400">
                CORE TECHNICAL IMPLEMENTATION
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {activeCapability.techFocus.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Custom engineering engagements scoped in 3 business days
              </div>
              <button
                onClick={() => onSelectConsultation(activeCapability.title)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Scope this Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
