import React from 'react';
import { Target, TrendingUp, ShieldCheck, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-slate-800/80 bg-[#0D111C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider">
            OUR GENESIS & PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
            Why ThrivIT: Moving beyond disposable software toward enduring digital ecosystems.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            ThrivIT was founded on a fundamental conviction: <strong className="text-emerald-400">Thriving</strong> in modern commerce requires continuous, data-grounded resilience powered by disciplined <strong className="text-cyan-400">Information Technology</strong>.
          </p>
        </div>

        {/* 2-Column Story & Contrast */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <p>
              Most IT agencies build disposable web assets: brittle codebases rushed to completion that begin accumulating technical debt the week after handover. When enterprise transaction volumes double, these systems break under lock contention, memory leaks, and fragmented database schema drifts.
            </p>
            <p>
              At <strong className="text-white">ThrivIT</strong>, we engineer <strong className="text-emerald-300">complete software ecosystems</strong>. We design backends with formal verification, decoupled event brokers, and automated zero-downtime cutover pipelines. Our architectures don’t just handle today's traffic—they expand elastically to ensure continuous commercial growth.
            </p>
            <div className="p-4 rounded-xl bg-[#121824] border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400">THE THRIVIT GUARANTEE</div>
              <p className="text-xs text-slate-400">
                Every line of production code is accompanied by declarative architecture specs, automated CI/CD performance regression gates, and strict SOC2/PCI compliance verification.
              </p>
            </div>
          </div>

          {/* High-Impact Brand Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#121824] via-[#0E1522] to-[#121824] border border-slate-800 space-y-6 relative overflow-hidden">
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-500">NAME ANATOMY</div>
              <div className="text-2xl font-black text-white">
                <span className="text-emerald-400">Thriv</span>·ing + <span className="text-cyan-400">I</span>nformation <span className="text-cyan-400">T</span>echnology
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A purpose-built moniker reflecting our dual objective: sustainable organizational growth sustained by enterprise-grade computing rigor.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono text-white">100%</div>
                <div className="text-xs text-slate-400">Senior Architect Led Projects</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono text-emerald-400">Zero</div>
                <div className="text-xs text-slate-400">Unverified Architecture Stubs</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#121824] border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Ecosystem Integration</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We connect fragmented CRM, ERP, and payment databases into a unified, high-speed event mesh.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121824] border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Data-Driven Insights</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sub-second telemetry dashboards that replace delayed batch reports with actionable triggers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121824] border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Sustainable Scalability</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Workload-sharded microservices engineered to scale 10x without architectural rewrites.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121824] border border-slate-800/90 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero-Trust Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mutual TLS and cryptographic policy enforcement built directly into service communication layers.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
