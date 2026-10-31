import React, { useState } from 'react';
import {
  X,
  Lock,
  LogOut,
  User,
  CheckCircle2,
  Clock,
  Download,
  Activity,
  FileText,
  Shield,
  Layers,
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { AuthUser, ClientProject, ProjectMilestone, ProjectDeliverable } from '../types';
import { DEMO_USERS, DEMO_CLIENT_PROJECTS } from '../data/mockData';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onLogin: (user: AuthUser) => void;
  onLogout: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'deliverables' | 'telemetry' | 'support'>('roadmap');
  const [selectedMilestone, setSelectedMilestone] = useState<ProjectMilestone | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isOpen) return null;

  // Active Project for logged-in user
  const currentProject: ClientProject =
    DEMO_CLIENT_PROJECTS.find((p) => p.id === currentUser?.projectId) || DEMO_CLIENT_PROJECTS[0];

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const matchedUser = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === emailInput.trim().toLowerCase()
    );

    if (matchedUser) {
      onLogin(matchedUser);
    } else {
      // Dynamic client account creation if unknown
      if (emailInput.includes('@') && passwordInput.length >= 4) {
        const newUser: AuthUser = {
          id: `usr-${Date.now()}`,
          name: emailInput.split('@')[0].replace('.', ' '),
          email: emailInput,
          company: emailInput.split('@')[1].split('.')[0].toUpperCase(),
          role: 'Client Administrator',
          projectId: 'proj-apex-settlement'
        };
        onLogin(newUser);
      } else {
        setLoginError('Please enter a valid work email and at least 4 characters password.');
      }
    }
  };

  const handleSimulateDownload = (del: ProjectDeliverable) => {
    setDownloadToast(`Preparing cryptographic download: ${del.name}`);
    setTimeout(() => {
      // Simulated browser download anchor
      const dummyContent = `# ThrivIT Verified Deliverable\n\nTitle: ${del.name}\nPhase: ${del.milestonePhase}\nVerified Date: ${del.date}\nIntegrity Hash: SHA256-${Math.random().toString(36).substring(2, 15)}\n\nCONFIDENTIAL - THRIVIT CLIENT ECOSYSTEM ARCHITECTURE`;
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = del.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadToast(`Downloaded: ${del.name} (${del.size})`);
      setTimeout(() => setDownloadToast(null), 3000);
    }, 800);
  };

  const handleSendSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setTicketSent(true);
    setTimeout(() => {
      setTicketMessage('');
      setTicketSent(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0D111C] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Portal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#121824] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>ThrivIT Client Portal</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono border border-emerald-800/60">
                  Zero-Trust IAM
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {currentUser ? `Active Session: ${currentUser.company} (${currentUser.role})` : 'Authorized Client Authentication'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-800/50 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
              aria-label="Close portal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Toast Notification */}
          {downloadToast && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs shadow-2xl flex items-center gap-2 animate-bounce">
              <Download className="w-4 h-4" />
              <span>{downloadToast}</span>
            </div>
          )}

          {!currentUser ? (
            /* Unauthenticated View: Sign In & Quick Access */
            <div className="max-w-md mx-auto py-8 space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-emerald-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Client Portal Sign In</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Access your organization's architectural deliverables, milestone verification logs, and live production telemetry.
                </p>
              </div>

              {/* Demo 1-Click Access for Immediate Testing */}
              <div className="p-4 rounded-xl bg-[#121824] border border-emerald-500/30 space-y-3">
                <div className="text-xs font-semibold text-emerald-400 flex items-center justify-between">
                  <span>INSTANT EVALUATION ACCOUNTS</span>
                  <span className="text-[10px] text-slate-400">1-Click Login</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_USERS.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => onLogin(user)}
                      className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 text-left transition-all cursor-pointer group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400">
                        {user.company}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {user.name} ({user.role.split(' ')[0]})
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Authentication Form */}
              <form onSubmit={handleCustomLogin} className="space-y-4 pt-2">
                {loginError && (
                  <div className="p-2.5 rounded bg-rose-950/40 border border-rose-500/50 text-xs text-rose-300">
                    {loginError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Enterprise Work Email</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.vance@apexfintech.com"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Portal Security Key / Password</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  Authenticate Session
                </button>
              </form>

            </div>
          ) : (
            /* Authenticated Portal Dashboard */
            <div className="space-y-6">
              
              {/* Project Header Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#121824] border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-emerald-400">{currentProject.clientCompany}</span>
                      <span aria-hidden="true">·</span>
                      <span>Target Cutover: {currentProject.targetCutover}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {currentProject.projectName}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-300">
                      Health: {currentProject.health}
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                      {currentProject.phase}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Cumulative Milestone Progress</span>
                    <span className="text-emerald-400 font-bold">{currentProject.overallProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
                      style={{ width: `${currentProject.overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Portal Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'roadmap'
                      ? 'bg-slate-900 text-emerald-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Milestone Roadmap</span>
                </button>

                <button
                  onClick={() => setActiveTab('deliverables')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'deliverables'
                      ? 'bg-slate-900 text-emerald-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Deliverables Vault ({currentProject.deliverables.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'telemetry'
                      ? 'bg-slate-900 text-emerald-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Live Telemetry</span>
                </button>

                <button
                  onClick={() => setActiveTab('support')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'support'
                      ? 'bg-slate-900 text-emerald-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Lead Architect Support</span>
                </button>
              </div>

              {/* TAB 1: MILESTONE ROADMAP */}
              {activeTab === 'roadmap' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400">
                    Phased architectural sprints with verified cryptographic sign-offs.
                  </div>

                  <div className="space-y-3">
                    {currentProject.milestones.map((milestone, idx) => {
                      const isComplete = milestone.status === 'completed';
                      const isInProgress = milestone.status === 'in_progress';
                      return (
                        <div
                          key={milestone.id}
                          onClick={() => setSelectedMilestone(milestone)}
                          className={`p-4 rounded-xl border transition-all text-left cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isComplete
                              ? 'bg-[#121824] border-slate-800 hover:border-slate-700'
                              : isInProgress
                              ? 'bg-[#121E2C] border-emerald-500/50 shadow-md'
                              : 'bg-slate-950/40 border-slate-800/60 opacity-70'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="mt-0.5">
                              {isComplete ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : isInProgress ? (
                                <Clock className="w-5 h-5 text-cyan-400" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                                  {idx + 1}
                                </div>
                              )}
                            </div>

                            <div className="space-y-1">
                              <div className="text-xs font-mono text-slate-500">
                                Target Date: {milestone.targetDate}
                              </div>
                              <h4 className="text-sm font-bold text-white">
                                {milestone.title}
                              </h4>
                              <p className="text-xs text-slate-400 line-clamp-1">
                                {milestone.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                            {milestone.signOffBy && (
                              <div className="text-right text-[11px] text-emerald-400/90 font-mono">
                                Verified by {milestone.signOffBy}
                              </div>
                            )}
                            <div className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                              {milestone.progressPercent}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: DELIVERABLES VAULT */}
              {activeTab === 'deliverables' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400">
                    Cryptographically authenticated architectural blueprints, contract specs, and runbooks.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProject.deliverables.map((del) => (
                      <div
                        key={del.id}
                        className="p-4 rounded-xl bg-[#121824] border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono">
                              {del.fileType} · {del.size}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">{del.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white leading-snug">
                            {del.name}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {del.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-[11px] text-slate-500">{del.milestonePhase}</span>
                          <button
                            onClick={() => handleSimulateDownload(del)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Asset</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE TELEMETRY */}
              {activeTab === 'telemetry' && (
                <div className="space-y-6">
                  <div className="text-xs text-slate-400">
                    Live production metrics stream from cluster instrumentation agents.
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#121824] border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400">Cluster Uptime SLA</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400">
                        {currentProject.telemetry.uptime}
                      </div>
                      <div className="text-[11px] text-slate-500">Trailing 90 Days</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121824] border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400">P99 Transaction Latency</div>
                      <div className="text-2xl font-bold font-mono text-cyan-400">
                        {currentProject.telemetry.p99Latency}
                      </div>
                      <div className="text-[11px] text-slate-500">Sub-50ms Target Met</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121824] border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400">Active Mesh Nodes</div>
                      <div className="text-2xl font-bold font-mono text-white">
                        {currentProject.telemetry.activeNodes}
                      </div>
                      <div className="text-[11px] text-slate-500">Zero Unhealthy Pods</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121824] border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400">Error Budget Remaining</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400">
                        {currentProject.telemetry.errorBudgetRemaining}
                      </div>
                      <div className="text-[11px] text-slate-500">Burn rate: 0.01% / wk</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121824] border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400">24-Hour Processed Load</div>
                      <div className="text-2xl font-bold font-mono text-slate-200">
                        {currentProject.telemetry.dailyRequests}
                      </div>
                      <div className="text-[11px] text-slate-500">All Nodes Balanced</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121824] border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-400">Security Invariants</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400">
                        {currentProject.telemetry.securityIncidents} Alerts
                      </div>
                      <div className="text-[11px] text-slate-500">Continuous mTLS Active</div>
                    </div>
                  </div>

                  {/* Operational Status Banner */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300">
                      Automated failover protocol: Active multi-region replica verified 14 minutes ago.
                    </span>
                    <span className="text-emerald-400 font-mono font-medium">Invariants: Enforced</span>
                  </div>
                </div>
              )}

              {/* TAB 4: SUPPORT */}
              {activeTab === 'support' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Lead Architect Profile (5 cols) */}
                  <div className="md:col-span-5 p-5 rounded-xl bg-[#121824] border border-slate-800 space-y-4">
                    <div className="text-xs font-semibold text-emerald-400">ASSIGNED SOLUTIONS ARCHITECT</div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{currentProject.assignedLeadArchitect.name}</h3>
                      <div className="text-xs text-slate-400">{currentProject.assignedLeadArchitect.title}</div>
                      <div className="text-xs font-mono text-cyan-400">{currentProject.assignedLeadArchitect.email}</div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                      Direct engineering hotline for sprint reviews, architectural changes, and production deployment escalations.
                    </p>
                  </div>

                  {/* Priority Ticket Dispatch (7 cols) */}
                  <div className="md:col-span-7 p-5 rounded-xl bg-[#121824] border border-slate-800 space-y-4">
                    <div className="text-xs font-semibold text-slate-300">DISPATCH PRIORITY ARCHITECTURAL INQUIRY</div>

                    {ticketSent ? (
                      <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs text-center space-y-2">
                        <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
                        <div>Inquiry dispatched directly to {currentProject.assignedLeadArchitect.name}.</div>
                        <div className="text-[11px] text-slate-400">Direct response window: &lt; 2 business hours.</div>
                      </div>
                    ) : (
                      <form onSubmit={handleSendSupportTicket} className="space-y-3">
                        <textarea
                          rows={3}
                          required
                          value={ticketMessage}
                          onChange={(e) => setTicketMessage(e.target.value)}
                          placeholder="State technical query, requested architecture change, or deployment checkpoint question..."
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch to Lead Architect</span>
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Milestone Detail Submodal if clicked */}
        {selectedMilestone && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm p-6 flex items-center justify-center">
            <div className="bg-[#121824] border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-emerald-400">MILESTONE SPECIFICATION</div>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedMilestone.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedMilestone.description}
              </p>

              <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs space-y-1.5 text-slate-400">
                <div className="flex justify-between">
                  <span>Target Date:</span>
                  <span className="text-white font-mono">{selectedMilestone.targetDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Status:</span>
                  <span className="text-emerald-400 font-mono capitalize">{selectedMilestone.status}</span>
                </div>
                {selectedMilestone.signOffBy && (
                  <div className="flex justify-between">
                    <span>Executive Sign-Off:</span>
                    <span className="text-cyan-400">{selectedMilestone.signOffBy}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedMilestone(null)}
                className="w-full py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                Close Milestone Details
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
