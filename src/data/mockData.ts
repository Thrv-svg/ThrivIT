import { CaseStudy, InsightArticle, ClientProject, AuthUser } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_digital_ecosystem_1792064051800.jpg';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'apex-pay-gateway',
    title: 'Apex Pay — Global Core Settlement Engine',
    clientName: 'Apex Financial Holdings',
    industry: 'FinTech & Banking',
    headline: 'Scaling sub-50ms distributed transaction settlement across 14 international jurisdictions.',
    imagePath: '/src/assets/images/showcase_fintech_core_1792064052045.jpg',
    keyMetric: '+410% Peak Volume Scaled',
    secondaryMetrics: [
      '38ms P99 Transaction Latency',
      '99.999% Core Ledger Availability',
      '$2.8B Annual Volume Processed'
    ],
    challenge: 'Apex Financial operated on an aging relational database cluster that suffered severe write lock contention during market volatility spikes, capping throughput at 3,200 transactions/sec and risking regulatory SLA breaches.',
    solution: 'ThrivIT re-architected their settlement pipeline into an event-driven Kafka and Rust microservice mesh with zero-trust TLS mutual authentication, multi-region Raft state replication, and automated disaster cutover in <12 seconds.',
    architectureHighlights: [
      'Asynchronous write-ahead logging with double-entry idempotent verification',
      'Multi-region active-active PostgreSQL partitioned ledger with CQRS read models',
      'Sub-millisecond HSM hardware encryption integration for cardholder data isolation'
    ],
    stack: ['Rust', 'Apache Kafka', 'PostgreSQL Distributed', 'Kubernetes', 'Envoy', 'Terraform'],
    clientQuote: {
      quote: 'ThrivIT engineered an ecosystem that effortlessly carried us through our largest Black Friday spike in company history with zero ledger drift and sub-50ms confirmation.',
      author: 'Evelyn Vance',
      role: 'Chief Technology Officer, Apex Financial Holdings'
    }
  },
  {
    id: 'omnicloud-enterprise-saas',
    title: 'OmniCloud — Multi-Tenant Workload Sharding',
    clientName: 'OmniCloud Technologies',
    industry: 'Enterprise SaaS',
    headline: 'Zero-downtime multi-tenant isolation and automated provisioning for 120,000 corporate organizations.',
    imagePath: '/src/assets/images/showcase_enterprise_saas_1792064051828.jpg',
    keyMetric: '99.995% Enterprise SLA',
    secondaryMetrics: [
      '4.8x Query Execution Speed',
      '120k Active Enterprise Tenants',
      '-35% Cloud Infrastructure Waste'
    ],
    challenge: 'Rapid B2B hypergrowth led to tenant noisy-neighbor issues, degraded response times during peak enterprise work hours, and complicated database migration scripts that required maintenance downtime windows.',
    solution: 'ThrivIT built an automated tenant-sharded control plane with dynamic workload tiering, Redis cluster caching, and declarative tenant migrations that execute with zero user-perceptible latency.',
    architectureHighlights: [
      'Dynamic tenant routing layer with automatic affinity load balancing',
      'Schema-level database multi-tenancy backed by automated blue/green migrations',
      'Distributed rate limiting and noisy-neighbor isolation via token bucket algorithms'
    ],
    stack: ['Go', 'TypeScript', 'Redis Cluster', 'AWS EKS', 'OpenTelemetry', 'PostgreSQL'],
    clientQuote: {
      quote: 'Our enterprise retention jumped 18 points after ThrivIT eliminated our latency spikes. Their architectural standard is truly best in class.',
      author: 'Marcus Sterling',
      role: 'VP of Platform Engineering, OmniCloud'
    }
  },
  {
    id: 'vanguard-data-fabric',
    title: 'Vanguard — Real-Time Streaming Data Fabric',
    clientName: 'Vanguard Logistics & Fleet',
    industry: 'Cloud & Data Infrastructure',
    headline: 'Transforming 850M daily telematics events into actionable predictive supply chain intelligence.',
    imagePath: '/src/assets/images/showcase_cloud_data_1792064049611.jpg',
    keyMetric: '850M Events / Day Processed',
    secondaryMetrics: [
      '1.2s Real-Time Sensor to Dashboard',
      '-48% Cloud Data Compute Cost',
      '14,800 Autonomous Fleet Assets'
    ],
    challenge: 'Vanguard had siloed telematics streams arriving in disparate formats from global cargo vessels and terrestrial trucks, resulting in 6-hour delayed business reports and missed predictive maintenance alerts.',
    solution: 'ThrivIT unified all ingestion channels into a high-scale Apache Flink streaming pipeline with Parquet columnar cold storage and ClickHouse for sub-second analytical queries.',
    architectureHighlights: [
      'Stateless MQTT event collectors terminating in distributed Apache Flink processors',
      'Decoupled columnar ClickHouse analytical store for ad-hoc geospatial query execution',
      'Automated machine learning anomaly detection triggers for mechanical wear prevention'
    ],
    stack: ['Apache Flink', 'ClickHouse', 'Apache Kafka', 'Python', 'Docker', 'Google Cloud Platform'],
    clientQuote: {
      quote: 'ThrivIT replaced our brittle overnight batch jobs with real-time intelligence. We now spot route bottlenecks and engine anomalies before costly failures happen.',
      author: 'David Chen',
      role: 'Chief Digital Officer, Vanguard Logistics'
    }
  }
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'resilient-event-meshes',
    title: 'Architecting Resilient Event Meshes: Scaling from Monolith to 10M Requests/Minute',
    category: 'Systems Architecture',
    readTime: '6 min read',
    publishedDate: 'October 12, 2026',
    author: {
      name: 'Rian Adisurya',
      role: 'Principal Systems Architect, ThrivIT',
      initials: 'RA'
    },
    summary: 'A deep dive into decomposing tight transactional loops into distributed, event-driven topologies with idempotent consumers and dead-letter queue recovery.',
    content: [
      'When enterprise systems cross the threshold from regional workloads to distributed global operations, traditional synchronous request-reply architectures buckle under network latency jitter and cascade failures.',
      'The transition to a distributed event mesh begins not with tool adoption, but with state boundary definition. By establishing clean domain events that convey state transitions rather than imperative instructions, services achieve true operational decoupling.',
      'Idempotency is non-negotiable. Every message consumer must be engineered with atomic deduplication keys, ensuring that transient network retries never lead to duplicate ledger postings or double dispatch.',
      'Monitoring must shift from host-level metrics to distributed tracing spans using OpenTelemetry. Tracking correlation IDs across message brokers, worker threads, and cold storage targets is the only reliable method for diagnosing end-to-end P99 latency drift.'
    ],
    keyTakeaways: [
      'Enforce strict consumer idempotency via deterministic unique payload hashes.',
      'Isolate synchronous critical paths from asynchronous side effects using transactional outbox patterns.',
      'Instrument distributed tracing context propagation on every message header.'
    ]
  },
  {
    id: 'zero-waste-software-doctrine',
    title: 'The Sustainable Software Doctrine: Eliminating Enterprise Technical Debt at Hypergrowth',
    category: 'Scaling Strategy',
    readTime: '5 min read',
    publishedDate: 'September 28, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Head of Enterprise Transformation, ThrivIT',
      initials: 'ER'
    },
    summary: 'Why rapid development speed is unsustainable without rigorous contract boundaries, automated regression matrices, and intentional simplicity.',
    content: [
      'High-growth tech companies frequently fall into the speed trap: rushing features to production while accruing compound interest on architectural compromises. Within two years, 70% of engineering bandwidth is consumed by firefighting.',
      'Sustainable software engineering prioritizes durable contract design over ephemeral feature hacking. Clear API interfaces, typed data contracts, and strict dependency boundaries enable modular refactoring without systemic breakage.',
      'Code that is easy to delete is better than code that is clever. By designing isolated domain modules with narrow public interfaces, teams can safely retire and replace subcomponents as enterprise requirements evolve.',
      'Automated testing must focus on behavior contracts rather than implementation trivia. Contract-driven end-to-end integration tests safeguard revenue-generating customer flows far more effectively than 100% unit test coverage on getters and setters.'
    ],
    keyTakeaways: [
      'Design modular components that can be replaced or deleted in under one sprint.',
      'Treat internal API contracts with the same versioning rigor as external public APIs.',
      'Track engineering velocity by feature delivery stability, not raw pull request volume.'
    ]
  },
  {
    id: 'realtime-data-cockpits',
    title: 'Data-Driven Operational Cockpits: Real-Time Telemetry over Legacy Batch Warehousing',
    category: 'Data Intelligence',
    readTime: '7 min read',
    publishedDate: 'September 14, 2026',
    author: {
      name: 'Julian Thorne',
      role: 'Lead Data Infrastructure Engineer, ThrivIT',
      initials: 'JT'
    },
    summary: 'Moving beyond stale 24-hour business dashboards to real-time event streaming that enables automated operational interventions.',
    content: [
      'Batch-based data warehouses like traditional Snowflake or BigQuery setups excel at quarterly strategic analysis, but fail when operators need to make real-time decisions regarding active supply chains or fraud threats.',
      'Streaming analytics bridges this gap. By piping telemetry directly into in-memory stream processors and fast columnar analytical databases (such as ClickHouse or Apache Pinot), organizations compress decision latency from hours to seconds.',
      'The modern operational cockpit does not just display numbers; it evaluates operational thresholds and automatically dispatches remediation webhooks, closing the loop between insight and action.',
      'Data governance must be baked into the streaming ingestion boundary through schema registries, preventing corrupted or malformed events from polluting downstream analytical pipelines.'
    ],
    keyTakeaways: [
      'Deploy stream processing for operational triage and columnar storage for instant ad-hoc exploration.',
      'Enforce schema validation at the ingestion gateway before events enter Kafka topics.',
      'Automate threshold alerts directly into workflow triggers for immediate incident response.'
    ]
  },
  {
    id: 'zero-trust-financial-workloads',
    title: 'Zero-Trust Microsegmentation: Securing High-Throughput Financial Services in Hybrid Clouds',
    category: 'Security & DevSecOps',
    readTime: '8 min read',
    publishedDate: 'August 30, 2026',
    author: {
      name: 'Rian Adisurya',
      role: 'Principal Systems Architect, ThrivIT',
      initials: 'RA'
    },
    summary: 'Implementing cryptographic service identities, continuous workload attestation, and ephemeral credentials without sacrificing low latency.',
    content: [
      'Perimeter security models that assume trust within internal corporate networks are obsolete. Advanced persistent threats exploit lateral movement the moment a single perimeter service is compromised.',
      'Zero-trust microsegmentation treats every internal service call as potentially hostile. By deploying mutual TLS (mTLS) with SPIFFE/SPIRE cryptographic workload identities, services continuously verify caller legitimacy.',
      'Performance overhead is minimized through hardware-accelerated AES-GCM ciphers and connection pooling inside service mesh sidecars, maintaining sub-millisecond handshake overhead for high-frequency trading and payment workloads.',
      'Access policies must be declared as code using Open Policy Agent (OPA). This provides verifiable audit trails for financial regulators and guarantees that policy changes undergo standard peer review and CI/CD validation.'
    ],
    keyTakeaways: [
      'Eliminate static long-lived credentials; mandate ephemeral mTLS service identity tokens.',
      'Codify compliance and authorization rules as testable Open Policy Agent declarations.',
      'Audit inter-service traffic with cryptographically signed immutable access logs.'
    ]
  }
];

export const DEMO_CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'proj-apex-settlement',
    projectName: 'Apex Core Settlement Engine v2.4',
    clientCompany: 'Apex Financial Holdings',
    phase: 'Phase 3: Production Hardening & Pre-Cutover',
    overallProgress: 88,
    health: 'Optimal',
    startDate: 'June 01, 2026',
    targetCutover: 'November 15, 2026',
    assignedLeadArchitect: {
      name: 'Rian Adisurya',
      title: 'Principal Systems Architect',
      email: 'rian.a@thrivit.tech'
    },
    telemetry: {
      uptime: '99.999%',
      p99Latency: '38.2 ms',
      activeNodes: '24 / 24 Online',
      errorBudgetRemaining: '99.88%',
      dailyRequests: '14.2M tx',
      securityIncidents: 0
    },
    milestones: [
      {
        id: 'm1',
        title: 'Architecture Blueprint & Threat Modeling',
        targetDate: 'July 15, 2026',
        status: 'completed',
        progressPercent: 100,
        signOffBy: 'Evelyn Vance (CTO)',
        deliverablesCount: 3,
        description: 'Complete domain decomposition, event schema specifications, and cryptographic security boundaries verified.'
      },
      {
        id: 'm2',
        title: 'Core Ledger Microservices & Kafka Mesh',
        targetDate: 'August 30, 2026',
        status: 'completed',
        progressPercent: 100,
        signOffBy: 'Marcus Sterling (Lead Arch)',
        deliverablesCount: 4,
        description: 'Implementation of high-throughput double-entry ledger in Rust with active Kafka clustering.'
      },
      {
        id: 'm3',
        title: 'Load Testing & Multi-Region Chaos Drills',
        targetDate: 'October 10, 2026',
        status: 'completed',
        progressPercent: 100,
        signOffBy: 'Evelyn Vance (CTO)',
        deliverablesCount: 2,
        description: 'Sustained 25,000 tx/sec load tests with simulated data-center partition tests and failovers.'
      },
      {
        id: 'm4',
        title: 'Pre-Cutover Audit & Regulatory Attestation',
        targetDate: 'November 05, 2026',
        status: 'in_progress',
        progressPercent: 65,
        deliverablesCount: 2,
        description: 'Final SOC2 Type II and PCI-DSS compliance verification with independent auditors.'
      },
      {
        id: 'm5',
        title: 'Final Production Zero-Downtime Cutover',
        targetDate: 'November 15, 2026',
        status: 'upcoming',
        progressPercent: 0,
        deliverablesCount: 1,
        description: 'Live traffic routing shift with automated canary rollback guardrails.'
      }
    ],
    deliverables: [
      {
        id: 'del-01',
        name: 'Apex_Settlement_Architecture_Specification_v2.4.pdf',
        fileType: 'PDF',
        size: '14.2 MB',
        date: 'Oct 02, 2026',
        milestonePhase: 'Phase 2: Core Engineering',
        description: 'Detailed sequence diagrams, OpenAPI schemas, and database partition keys.'
      },
      {
        id: 'del-02',
        name: 'Independent_Penetration_Test_Audit_Q3.pdf',
        fileType: 'PDF',
        size: '6.8 MB',
        date: 'Oct 08, 2026',
        milestonePhase: 'Phase 3: Security & Chaos',
        description: 'Zero critical or high vulnerabilities identified across external and internal endpoints.'
      },
      {
        id: 'del-03',
        name: 'Ledger_OpenAPI_Contract_Definition.json',
        fileType: 'JSON',
        size: '480 KB',
        date: 'Sep 24, 2026',
        milestonePhase: 'Phase 2: Core Engineering',
        description: 'Complete machine-readable interface specifications with input validation rules.'
      },
      {
        id: 'del-04',
        name: 'Production_Cutover_Runbook_and_Rollback_Protocol.md',
        fileType: 'MD',
        size: '128 KB',
        date: 'Oct 14, 2026',
        milestonePhase: 'Phase 4: Cutover Prep',
        description: 'Step-by-step engineer execution runbook with automated rollback triggers.'
      }
    ]
  },
  {
    id: 'proj-omnicloud-saas',
    projectName: 'OmniCloud Multi-Tenant Sharding Platform',
    clientCompany: 'OmniCloud Technologies',
    phase: 'Phase 2: Tenant Migration Engine',
    overallProgress: 72,
    health: 'Optimal',
    startDate: 'July 15, 2026',
    targetCutover: 'December 20, 2026',
    assignedLeadArchitect: {
      name: 'Elena Rostova',
      title: 'Head of Enterprise Transformation',
      email: 'elena.r@thrivit.tech'
    },
    telemetry: {
      uptime: '99.996%',
      p99Latency: '44.8 ms',
      activeNodes: '18 / 18 Online',
      errorBudgetRemaining: '99.92%',
      dailyRequests: '28.6M req',
      securityIncidents: 0
    },
    milestones: [
      {
        id: 'om-1',
        title: 'Tenant Isolation Architecture & Data Privacy Model',
        targetDate: 'August 15, 2026',
        status: 'completed',
        progressPercent: 100,
        signOffBy: 'Marcus Sterling (VP Platform)',
        deliverablesCount: 3,
        description: 'Dynamic schema sharding and tenant cryptographic boundary specifications.'
      },
      {
        id: 'om-2',
        title: 'High-Performance Routing Plane & Redis Caching',
        targetDate: 'September 30, 2026',
        status: 'completed',
        progressPercent: 100,
        signOffBy: 'Marcus Sterling (VP Platform)',
        deliverablesCount: 3,
        description: 'Token bucket rate-limiting algorithms and sub-5ms routing layer.'
      },
      {
        id: 'om-3',
        title: 'Automated Migration Shuffler & Live Rebalancing',
        targetDate: 'November 10, 2026',
        status: 'in_progress',
        progressPercent: 55,
        deliverablesCount: 2,
        description: 'Zero-downtime tenant moving across database nodes during live operations.'
      },
      {
        id: 'om-4',
        title: 'Full Production Deployment to 120k Tenants',
        targetDate: 'December 20, 2026',
        status: 'upcoming',
        progressPercent: 0,
        deliverablesCount: 2,
        description: 'Canary rollout of new sharding engine across enterprise clients.'
      }
    ],
    deliverables: [
      {
        id: 'del-om-1',
        name: 'OmniCloud_Tenant_Sharding_Spec_v1.8.pdf',
        fileType: 'PDF',
        size: '11.5 MB',
        date: 'Aug 20, 2026',
        milestonePhase: 'Phase 1: Architecture',
        description: 'Multi-tenant database sharding strategy and tenant routing algorithms.'
      },
      {
        id: 'del-om-2',
        name: 'Noisy_Neighbor_Rate_Limiting_Policy.json',
        fileType: 'JSON',
        size: '220 KB',
        date: 'Sep 29, 2026',
        milestonePhase: 'Phase 2: Routing Layer',
        description: 'Declarative rate limit definitions for enterprise vs standard tiers.'
      }
    ]
  }
];

export const DEMO_USERS: AuthUser[] = [
  {
    id: 'user-apex-01',
    name: 'Evelyn Vance',
    email: 'e.vance@apexfintech.com',
    company: 'Apex Financial Holdings',
    role: 'Client Administrator',
    projectId: 'proj-apex-settlement'
  },
  {
    id: 'user-omni-02',
    name: 'Marcus Sterling',
    email: 'm.sterling@omnicloud.io',
    company: 'OmniCloud Technologies',
    role: 'Engineering Stakeholder',
    projectId: 'proj-omnicloud-saas'
  }
];
