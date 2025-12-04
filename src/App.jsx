import React, { useState, useEffect, useRef } from 'react';
import { 
  Cloud, Database, Server, Globe, Activity, Zap, CheckCircle, 
  AlertTriangle, X, Download, Play, Layers, ArrowRight, Cpu, 
  Trash2, RefreshCw, Code, ChevronRight, Settings, Shield,
  Box, Share2, FileText, Terminal, Lock, GitBranch, CheckSquare, PlayCircle, Users, Info, GraduationCap
} from 'lucide-react';

// --- Constants & Configuration ---

const VIEW = {
  LANDING: 'LANDING',
  CANVAS: 'CANVAS',
  SIMULATION: 'SIMULATION',
  DIAGNOSTICS: 'DIAGNOSTICS',
  AUTOFIX: 'AUTOFIX',
  EXPORT: 'EXPORT',
  DEPLOY: 'DEPLOY'
};

const COMPONENT_TYPES = {
  API_GATEWAY: { id: 'api_gateway', label: 'API Gateway', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-900/30', border: 'border-cyan-500/50' },
  LAMBDA: { id: 'lambda', label: 'Lambda Function', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-900/30', border: 'border-yellow-500/50' },
  RDS: { id: 'rds', label: 'DynamoDB', icon: Database, color: 'text-blue-400', bg: 'bg-blue-900/30', border: 'border-blue-500/50' },
  SQS: { id: 'sqs', label: 'SQS Queue', icon: Box, color: 'text-pink-400', bg: 'bg-pink-900/30', border: 'border-pink-500/50' },
  VPC: { id: 'vpc', label: 'VPC Network', icon: Cloud, color: 'text-green-400', bg: 'bg-green-900/30', border: 'border-green-500/50' },
  LOAD_BALANCER: { id: 'elb', label: 'Load Balancer', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-900/30', border: 'border-purple-500/50' },
};

const INITIAL_NODES = [
  { id: '1', type: 'api_gateway', x: 150, y: 150, label: 'API Gateway', status: 'error', config: { vpc: false, public: true } },
  { id: '2', type: 'lambda', x: 400, y: 150, label: 'Lambda Function', status: 'ok', config: { vpc: false, memory: 128 } },
  { id: '3', type: 'rds', x: 650, y: 150, label: 'DynamoDB', status: 'error', config: { vpc: false, encrypted: false } },
];

const INITIAL_EDGES = [
  { id: 'e1', from: '1', to: '2' }, 
];

const TEAM_MEMBERS = [
  { name: 'Prajnya N Kashyap', email: 'prajnyankashyap24cs@rnsit.ac.in' },
  { name: 'Prajna Shetty', email: 'prajnashetty24cs@rnsit.ac.in' },
  { name: 'Prapthi JR', email: 'prapthijr24cs@rnsit.ac.in' },
  { name: 'Priyanka J', email: 'priyankaj24cs@rnsit.ac.in' },
];

// --- Helper Functions ---
const generateId = () => Math.random().toString(36).substr(2, 9);
const getConnectorPoint = (node) => ({ x: node.x + 80, y: node.y + 40 });

// --- Sub-Components ---

const LandingView = ({ onStart }) => {
  const [showTeam, setShowTeam] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      {/* Navbar */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
           <Cloud size={24} /> <span>CloudGlyph</span>
        </div>
        <div className="flex gap-6">
          <button onClick={() => setShowAbout(true)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <Info size={16} /> Problem & Solution
          </button>
          <button onClick={() => setShowTeam(true)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <Users size={16} /> Team InnovHers
          </button>
        </div>
      </div>

      <div className="z-10 text-center space-y-6 max-w-3xl px-4">
        <div className="flex justify-center gap-4 mb-4 text-cyan-400 opacity-80 animate-pulse">
          <Cloud size={48} />
          <Cpu size={48} />
          <Layers size={48} />
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
          CloudGlyph
        </h1>
        <h2 className="text-2xl text-slate-200 font-light">
          The Missing Intelligence Layer in Cloud Development
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
          Visually build, simulate, validate, and auto-fix cloud architecture before deploying.
          Detect IAM errors, broken connections, and misconfigurations with a Digital Twin engine.
        </p>
        
        <div className="pt-8">
          <button 
            onClick={onStart}
            className="group relative px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full font-semibold shadow-lg shadow-cyan-900/20 transition-all transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Start Designing <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </span>
          </button>
        </div>
      </div>

      {/* Team Modal */}
      {showTeam && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setShowTeam(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20}/></button>
            <div className="text-center mb-6">
               <div className="inline-flex p-3 bg-purple-900/30 rounded-full text-purple-400 mb-3"><GraduationCap size={32} /></div>
               <h3 className="text-2xl font-bold text-white">Team InnovHers</h3>
               <p className="text-slate-400 text-sm">RNS Institute of Technology • Dept of CSE</p>
            </div>
            <div className="space-y-3">
              {TEAM_MEMBERS.map((member, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">{member.name}</div>
                    <div className="text-xs text-slate-400">{member.email}</div>
                  </div>
                  <div className="ml-auto text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">
                    2nd Year
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About/Problem Modal */}
      {showAbout && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-2xl relative">
            <button onClick={() => setShowAbout(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20}/></button>
            
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Info className="text-cyan-400" /> Project Concept
            </h3>

            <div className="space-y-6 text-slate-300">
              <section>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Problem Understanding</h4>
                <p className="text-sm leading-relaxed">
                  Modern cloud-native systems (microservices, serverless, etc.) are extremely difficult to validate and debug. 
                  Challenges include visualization complexity, hidden IAM errors, network misconfigurations, and difficulty for non-experts using standard consoles.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Key User Needs</h4>
                <ul className="text-sm list-disc pl-5 space-y-1 text-slate-400">
                  <li>Simple visual way to understand architecture.</li>
                  <li>Early detection of misconfigurations (Digital Twin).</li>
                  <li>One-click no-code guided fixes.</li>
                  <li>Export validated templates (Terraform, K8s YAML).</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Our Solution: CloudGlyph</h4>
                <p className="text-sm leading-relaxed mb-3">
                  A platform that lets users visually build, simulate, validate, and auto-fix cloud architecture before deploying it to AWS, Azure, or GCP.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <div className="text-white font-medium mb-1">Digital Twin Engine</div>
                    <div className="text-xs text-slate-400">Simulates routing, IAM, and latency.</div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <div className="text-white font-medium mb-1">Diagnostic Engine</div>
                    <div className="text-xs text-slate-400">Detects permission errors & broken flows.</div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <div className="text-white font-medium mb-1">Auto-Fix Engine</div>
                    <div className="text-xs text-slate-400">One-click resolution for configs.</div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded border border-slate-700">
                    <div className="text-white font-medium mb-1">Deployment Generator</div>
                    <div className="text-xs text-slate-400">Exports Terraform, CFN, & K8s YAML.</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SimulationView = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing Digital Twin...');

  useEffect(() => {
    const stages = [
      'Mapping Network Topology...',
      'Validating IAM Permissions...',
      'Simulating Latency & Traffic...',
      'Checking Failure Chains...',
      'Generating Diagnostics Report...'
    ];

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        const stageIndex = Math.floor((prev / 100) * stages.length);
        setStage(stages[Math.min(stageIndex, stages.length - 1)]);
        return prev + 1.5;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-950">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="relative w-24 h-24 mx-auto">
           <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-cyan-500 rounded-full animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center">
             <Activity className="text-cyan-400 animate-pulse" size={32} />
           </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Generating Digital Twin</h3>
          <p className="text-cyan-400 text-sm font-mono h-6">{stage}</p>
        </div>

        <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 w-full">
          <div 
            className="h-full bg-cyan-500 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

const NodeComponent = ({ node, isSelected, onSelect, onMouseDown }) => {
  const typeConfig = Object.values(COMPONENT_TYPES).find(t => t.id === node.type) || COMPONENT_TYPES.LAMBDA;
  const Icon = typeConfig.icon;

  return (
    <div
      onMouseDown={(e) => onMouseDown(e, node.id)}
      onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
      style={{ left: node.x, top: node.y }}
      className={`absolute w-40 h-24 flex flex-col items-center justify-center gap-2 rounded-xl backdrop-blur-md border transition-all shadow-xl z-10 cursor-pointer group
        ${isSelected 
          ? 'border-cyan-400 bg-slate-800/90 shadow-cyan-500/20' 
          : `border-slate-800 bg-slate-900/90 hover:border-slate-600`
        }
      `}
    >
      {node.status === 'error' && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg animate-bounce">
          <AlertTriangle size={12} />
        </div>
      )}
      
      <div className={`p-2 rounded-lg ${typeConfig.bg} ${typeConfig.color} mb-1`}>
        <Icon size={24} />
      </div>
      <span className="text-xs text-slate-300 font-medium truncate max-w-[90%]">{node.label}</span>
      
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-600 rounded-full border-2 border-slate-900 group-hover:bg-cyan-400 transition-colors" />
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-600 rounded-full border-2 border-slate-900 group-hover:bg-cyan-400 transition-colors" />
    </div>
  );
};

const DiagnosticsView = ({ issues, onProceed, onBack }) => (
  <div className="h-full bg-slate-950 p-10 overflow-auto">
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete</h2>
          <p className="text-slate-400">The Digital Twin detected {issues.length} potential issues in your architecture.</p>
        </div>
        <div className="flex gap-4 text-sm">
           <span className="flex items-center gap-2 text-red-400 bg-red-900/20 px-3 py-1 rounded-full border border-red-900">
             <AlertTriangle size={16}/> {issues.length} Critical Issues
           </span>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        {issues.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-slate-800">
            <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">All Systems Operational</h3>
            <p className="text-slate-500">No architectural risks detected.</p>
          </div>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 flex items-start gap-5 hover:border-slate-700 transition-colors">
               <div className="p-3 bg-red-900/20 rounded-lg">
                 <AlertTriangle size={24} className="text-red-500" />
               </div>
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-1">
                   <span className="bg-red-900/30 text-red-400 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Error</span>
                   <h3 className="text-lg font-semibold text-slate-200">{issue.title}</h3>
                 </div>
                 <p className="text-cyan-400 text-sm font-mono mb-2">{issue.path}</p>
                 <p className="text-slate-400 text-sm leading-relaxed">{issue.description}</p>
               </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-xl p-6 flex justify-between items-center">
         <div>
           <h4 className="text-cyan-400 font-semibold mb-1">Next Steps</h4>
           <p className="text-slate-500 text-sm">Resolve identified issues automatically or export current state.</p>
         </div>
         <div className="flex gap-4">
           <button onClick={onBack} className="px-6 py-2.5 text-slate-300 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-all">
             Back to Canvas
           </button>
           {issues.length > 0 ? (
             <button onClick={onProceed} className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium shadow-lg shadow-cyan-900/20 flex items-center gap-2">
               <RefreshCw size={18} /> Open Auto-Fix Engine
             </button>
           ) : (
             <button onClick={onProceed} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium shadow-lg shadow-emerald-900/20 flex items-center gap-2">
               <Download size={18} /> Proceed to Export
             </button>
           )}
         </div>
      </div>
    </div>
  </div>
);

const AutoFixView = ({ fixes, onApplyFix, onApplyAll, onComplete }) => (
  <div className="h-full bg-slate-950 p-10 flex flex-col items-center">
    <div className="mb-10 text-center">
      <div className="inline-flex p-4 bg-slate-900 rounded-full mb-6 text-cyan-400 shadow-lg shadow-cyan-900/10 animate-bounce">
        <RefreshCw size={40} />
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">Suggested Fixes</h2>
      <p className="text-slate-400 max-w-lg mx-auto">
        Review and apply automated remediation to update your Digital Twin configuration.
      </p>
    </div>

    <div className="w-full max-w-3xl space-y-4 mb-10">
      {fixes.map((fix) => (
        <div key={fix.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between group hover:border-cyan-900/50 transition-all">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
              ${fix.applied ? 'border-emerald-500/30 bg-emerald-900/10 text-emerald-400' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
              {fix.applied ? <CheckCircle size={20} /> : <div className="w-3 h-3 rounded-full bg-slate-600" />}
            </div>
            <div>
              <h3 className={`font-semibold ${fix.applied ? 'text-emerald-400' : 'text-slate-200'}`}>{fix.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{fix.description}</p>
              <p className="text-xs text-cyan-600 mt-1 font-mono">Impact: {fix.impact}</p>
            </div>
          </div>
          <button 
            onClick={() => onApplyFix(fix.id)}
            disabled={fix.applied}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${fix.applied 
                ? 'bg-transparent text-emerald-500 cursor-default' 
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20'}`}
          >
            {fix.applied ? 'Applied' : 'Apply'}
          </button>
        </div>
      ))}
    </div>

    <button 
      onClick={onApplyAll} 
      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-bold shadow-xl shadow-blue-900/30 w-full max-w-xs mb-4"
    >
      Apply All Fixes
    </button>
    <button onClick={onComplete} className="text-slate-500 hover:text-white text-sm">
      Skip & Continue to Export
    </button>
  </div>
);

const ExportView = ({ onBack, onDeploy, nodeCount }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="h-full bg-slate-950 p-10 overflow-auto">
       <div className="max-w-6xl mx-auto">
         <div className="text-center mb-8">
           <h2 className="text-3xl font-bold text-white mb-2">Architecture Validated!</h2>
           <p className="text-cyan-400 mb-4">Your cloud architecture is ready for deployment</p>
           
           <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4 inline-flex items-center gap-8 max-w-2xl w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400"><CheckCircle size={24} /></div>
                <div className="text-left">
                  <div className="text-emerald-400 font-bold">All Issues Resolved</div>
                  <div className="text-emerald-600 text-xs">{nodeCount} services configured • 0 errors • Best practices applied</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-400">100%</div>
                <div className="text-emerald-600 text-xs uppercase tracking-wider">Health Score</div>
              </div>
           </div>
         </div>

         <div className="flex justify-center mb-8">
            <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex">
               <button onClick={() => setShowCode(false)} className={`px-4 py-1.5 rounded-md text-sm transition-all ${!showCode ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Artifact Cards</button>
               <button onClick={() => setShowCode(true)} className={`px-4 py-1.5 rounded-md text-sm transition-all ${showCode ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'}`}>Code Preview</button>
            </div>
         </div>

         {showCode ? (
           <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl border border-slate-800 p-6 overflow-hidden mb-12">
             <div className="flex gap-2 mb-4">
               <div className="w-3 h-3 rounded-full bg-red-500" />
               <div className="w-3 h-3 rounded-full bg-yellow-500" />
               <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>
             <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
{`# Generated by CloudGlyph
resource "aws_api_gateway_rest_api" "api" {
  name = "public-api"
  endpoint_configuration { types = ["REGIONAL"] }
}

resource "aws_lambda_function" "processor" {
  function_name = "process-order"
  runtime       = "python3.9"
  handler       = "handler.lambda_handler"
  role          = aws_iam_role.lambda_exec.arn
  vpc_config {
    subnet_ids         = [aws_subnet.private.id]
    security_group_ids = [aws_security_group.sg.id]
  }
}

resource "civo_kubernetes_cluster" "cluster" {
    name = "cloudglyph-prod"
    applications = "Traefik,MetricServer"
    num_target_nodes = 3
}`}
             </pre>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
             {/* Terraform Card */}
             <div className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-xl p-6 transition-all group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Terminal size={100} className="text-purple-500" />
               </div>
               <div className="flex items-start gap-4 relative z-10">
                 <div className="bg-purple-900/30 p-3 rounded-lg text-purple-400"><Code size={24} /></div>
                 <div>
                   <h3 className="text-lg font-bold text-slate-200">Terraform</h3>
                   <p className="text-sm text-slate-400 mt-1 mb-3">Infrastructure as Code for AWS, Azure, Civo and GCP.</p>
                   <div className="flex gap-2">
                     <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 font-mono">.tf</span>
                     <span className="px-2 py-1 bg-emerald-900/20 text-emerald-400 text-xs rounded">Ready to export</span>
                   </div>
                 </div>
               </div>
             </div>
             {/* Kubernetes Card */}
             <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl p-6 transition-all group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Server size={100} className="text-blue-500" />
               </div>
               <div className="flex items-start gap-4 relative z-10">
                 <div className="bg-blue-900/30 p-3 rounded-lg text-blue-400"><Box size={24} /></div>
                 <div>
                   <h3 className="text-lg font-bold text-slate-200">Kubernetes YAML</h3>
                   <p className="text-sm text-slate-400 mt-1 mb-3">Container orchestration manifests for deployments.</p>
                   <div className="flex gap-2">
                     <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 font-mono">.yaml</span>
                     <span className="px-2 py-1 bg-emerald-900/20 text-emerald-400 text-xs rounded">Ready to export</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}

         <div className="text-center">
           <button 
             onClick={onDeploy}
             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-medium shadow-lg shadow-blue-900/20 flex items-center gap-2 mx-auto transform hover:scale-105 transition-all"
           >
             <PlayCircle size={20} /> Deploy to CIVO Cloud
           </button>
           <button onClick={onBack} className="mt-6 text-slate-500 hover:text-white text-sm">
             Back to Design Canvas
           </button>
         </div>
       </div>
    </div>
  );
};

const DeploymentView = ({ onBack }) => {
  const [logs, setLogs] = useState([]);
  const [step, setStep] = useState(0);

  const steps = [
    { name: "Git Checkout", icon: GitBranch },
    { name: "Validating IaC", icon: CheckSquare },
    { name: "OPA Policy Check", icon: Shield },
    { name: "Deploy to CIVO", icon: Server }
  ];

  useEffect(() => {
    const sequence = [
      { msg: "> git checkout main", delay: 500 },
      { msg: "> git pull origin main", delay: 1000 },
      { msg: "✓ HEAD is now at a1b2c3d 'Update architecture'", delay: 1500, nextStep: 1 },
      { msg: "> terraform validate", delay: 2000 },
      { msg: "✓ Success! The configuration is valid.", delay: 3000, nextStep: 2 },
      { msg: "> opa eval --input tfplan.json --data policy.rego", delay: 3500 },
      { msg: "✓ Policy Check Passed: No public S3 buckets detected.", delay: 4500, nextStep: 3 },
      { msg: "> terraform apply -auto-approve", delay: 5000 },
      { msg: "civo_kubernetes_cluster.prod: Creating...", delay: 6000 },
      { msg: "civo_kubernetes_cluster.prod: Creation complete after 10s [id=civo-k8s-123]", delay: 8000 },
      { msg: "✓ Apply complete! Resources: 5 added, 0 changed, 0 destroyed.", delay: 9000, final: true }
    ];

    let timeoutIds = [];
    sequence.forEach(({ msg, delay, nextStep, final }) => {
      const id = setTimeout(() => {
        setLogs(prev => [...prev, msg]);
        if (nextStep !== undefined) setStep(nextStep);
        if (final) setStep(4); // All done
      }, delay);
      timeoutIds.push(id);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full bg-slate-950 p-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
        {/* Pipeline Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <PlayCircle className="text-blue-500" /> Pipeline Execution
            </h2>
            <p className="text-slate-500 text-xs mt-1">Workflow: .github/workflows/deploy-civo.yml</p>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-xs text-emerald-500 font-mono">RUNNING</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Steps Sidebar */}
          <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-6">
            {steps.map((s, idx) => (
              <div key={idx} className={`flex items-center gap-3 ${idx <= step ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border 
                  ${idx < step ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-500' : 
                    idx === step ? 'bg-blue-900/30 border-blue-500/50 text-blue-500 animate-pulse' : 'border-slate-700 bg-slate-800'}`}>
                  {idx < step ? <CheckCircle size={16} /> : <s.icon size={16} />}
                </div>
                <span className={`text-sm font-medium ${idx === step ? 'text-white' : 'text-slate-400'}`}>{s.name}</span>
              </div>
            ))}
          </div>

          {/* Terminal Output */}
          <div className="flex-1 bg-black p-6 font-mono text-xs overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="mb-2">
                <span className="text-slate-500 mr-3">{new Date().toLocaleTimeString()}</span>
                <span className={log.startsWith("✓") ? "text-emerald-400" : log.startsWith(">") ? "text-yellow-400" : "text-slate-300"}>
                  {log}
                </span>
              </div>
            ))}
            {step < 4 && <div className="animate-pulse text-blue-500">_</div>}
            
            {step === 4 && (
              <div className="mt-8 p-4 bg-emerald-900/10 border border-emerald-500/30 rounded text-center">
                <h3 className="text-emerald-400 font-bold text-lg mb-2">Deployment Successful</h3>
                <p className="text-slate-400 mb-4">Your application is live on CIVO Cloud.</p>
                <div className="flex justify-center gap-4">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs">View Logs</button>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs">Open Dashboard</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <button onClick={onBack} className="mt-8 text-slate-500 hover:text-white text-sm">
        Return to Dashboard
      </button>
    </div>
  );
};

// --- Main Application ---

export default function CloudGlyph() {
  const [currentView, setCurrentView] = useState(VIEW.LANDING);
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState(INITIAL_EDGES);
  const [selectedId, setSelectedId] = useState(null);
  
  // State for Dynamic Analysis
  const [diagnostics, setDiagnostics] = useState([]);
  const [fixes, setFixes] = useState([]);

  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [dragNodeId, setDragNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Connection State
  const [connectionMode, setConnectionMode] = useState(false);
  const [pendingConnection, setPendingConnection] = useState(null);

  // --- Dynamic Analysis Engine ---
  
  const analyzeArchitecture = () => {
    const newDiagnostics = [];
    const newFixes = [];

    // Rule 1: Orphaned Nodes
    nodes.forEach(node => {
      const isConnected = edges.some(e => e.from === node.id || e.to === node.id);
      if (!isConnected) {
        const issueId = generateId();
        newDiagnostics.push({
          id: issueId,
          title: 'Orphaned Component',
          path: `${node.label} is isolated`,
          description: `${node.label} is not connected to any other service.`,
          type: 'error'
        });
        // We can't auto-fix isolation easily without knowing intent, so we skip auto-fix for this or add a placeholder
      }

      // Rule 2: Unsecured Databases (RDS not in VPC)
      if (node.type === 'rds') {
        if (!node.config?.vpc) {
          const issueId = generateId();
          newDiagnostics.push({
            id: issueId,
            title: 'Database Security Risk',
            path: `${node.label} (Public)`,
            description: 'Database is configured with public access. It should be restricted within a VPC.',
            type: 'error'
          });
          newFixes.push({
            id: issueId,
            nodeId: node.id,
            title: 'Secure Database',
            description: 'Enable VPC restriction and disable public access',
            impact: 'Prevents unauthorized public access',
            applied: false,
            action: (nodeId) => {
              setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'ok', config: { ...n.config, vpc: true, public: false } } : n));
            }
          });
        }
      }
    });

    // Rule 3: Broken Flows (API Gateway must connect to Lambda)
    const apiGateways = nodes.filter(n => n.type === 'api_gateway');
    apiGateways.forEach(gw => {
      const hasBackend = edges.some(e => e.from === gw.id && nodes.find(n => n.id === e.to)?.type === 'lambda');
      if (!hasBackend) {
        const issueId = generateId();
        newDiagnostics.push({
          id: issueId,
          title: 'Missing Backend Integration',
          path: `${gw.label} → ?`,
          description: 'API Gateway has no Lambda function attached to handle requests.',
          type: 'error'
        });
        // Simplification: We don't auto-create nodes in this demo, but we could.
      }
    });

    setDiagnostics(newDiagnostics);
    setFixes(newFixes);
  };

  const handleApplyFix = (fixId) => {
    const fix = fixes.find(f => f.id === fixId);
    if (fix && fix.action) {
      fix.action(fix.nodeId);
      setFixes(prev => prev.map(f => f.id === fixId ? { ...f, applied: true } : f));
      // Remove corresponding diagnostic from view
      setDiagnostics(prev => prev.filter(d => d.id !== fixId));
    }
  };

  const handleApplyAllFixes = () => {
    fixes.forEach(fix => {
      if (!fix.applied && fix.action) {
        fix.action(fix.nodeId);
      }
    });
    setFixes(prev => prev.map(f => ({ ...f, applied: true })));
    setDiagnostics([]); // Clear all diagnostics
    setTimeout(() => setCurrentView(VIEW.EXPORT), 1000);
  };

  // Run analysis when entering simulation
  useEffect(() => {
    if (currentView === VIEW.SIMULATION) {
      analyzeArchitecture();
    }
  }, [currentView]);

  // Canvas Logic (Same as before)
  const handleDragStart = (e, type) => e.dataTransfer.setData('type', type.id);
  
  const handleDrop = (e) => {
    e.preventDefault();
    const typeId = e.dataTransfer.getData('type');
    const type = Object.values(COMPONENT_TYPES).find(t => t.id === typeId);
    if (!type) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newNode = {
      id: generateId(),
      type: typeId,
      x: e.clientX - rect.left - 80,
      y: e.clientY - rect.top - 40,
      label: type.label,
      status: typeId === 'rds' ? 'error' : 'ok', // Default DB to error for demo purposes
      config: { vpc: false }
    };
    setNodes([...nodes, newNode]);
  };

  const handleNodeMouseDown = (e, id) => {
    e.stopPropagation();
    if (connectionMode) {
      if (pendingConnection && pendingConnection !== id) {
        setEdges([...edges, { id: generateId(), from: pendingConnection, to: id }]);
        setPendingConnection(null);
        setConnectionMode(false);
      } else {
        setPendingConnection(id);
      }
      return;
    }
    const node = nodes.find(n => n.id === id);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragNodeId(id);
    setDragOffset({ x: e.clientX - rect.left - node.x, y: e.clientY - rect.top - node.y });
    setIsDragging(true);
    setSelectedId(id);
  };

  const handleMouseMove = (e) => {
    if (isDragging && dragNodeId) {
      const rect = canvasRef.current.getBoundingClientRect();
      setNodes(nodes.map(n => n.id === dragNodeId ? {
        ...n,
        x: e.clientX - rect.left - dragOffset.x,
        y: e.clientY - rect.top - dragOffset.y
      } : n));
    }
  };

  const handleMouseUp = () => { setIsDragging(false); setDragNodeId(null); };

  // Render Content based on View State
  if (currentView === VIEW.LANDING) return <LandingView onStart={() => setCurrentView(VIEW.CANVAS)} />;
  if (currentView === VIEW.SIMULATION) return <SimulationView onComplete={() => setCurrentView(VIEW.DIAGNOSTICS)} />;
  if (currentView === VIEW.DIAGNOSTICS) return <DiagnosticsView issues={diagnostics} onProceed={() => setCurrentView(diagnostics.length > 0 ? VIEW.AUTOFIX : VIEW.EXPORT)} onBack={() => setCurrentView(VIEW.CANVAS)} />;
  if (currentView === VIEW.AUTOFIX) return <AutoFixView fixes={fixes} onApplyFix={handleApplyFix} onApplyAll={handleApplyAllFixes} onComplete={() => setCurrentView(VIEW.EXPORT)} />;
  if (currentView === VIEW.EXPORT) return <ExportView nodeCount={nodes.length} onBack={() => setCurrentView(VIEW.CANVAS)} onDeploy={() => setCurrentView(VIEW.DEPLOY)} />;
  if (currentView === VIEW.DEPLOY) return <DeploymentView onBack={() => setCurrentView(VIEW.CANVAS)} />;

  const selectedNode = nodes.find(n => n.id === selectedId);
  
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-600/20 p-2 rounded-lg text-cyan-400">
            <Cloud size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-100">CloudGlyph</span>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setConnectionMode(!connectionMode)}
             className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2
               ${connectionMode ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 hover:bg-slate-800 text-slate-400'}`}
           >
             <ArrowRight size={14} /> {connectionMode ? 'Select Target' : 'Connect'}
           </button>
           <button 
             onClick={() => setCurrentView(VIEW.SIMULATION)}
             className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-cyan-900/20 flex items-center gap-2"
           >
             <Play size={14} fill="currentColor" /> Run Simulation
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
           <div className="p-4 border-b border-slate-800">
             <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-wider mb-1">Components</h3>
             <p className="text-[10px] text-slate-500">Drag & Drop to Canvas</p>
           </div>
           <div className="p-4 space-y-2 overflow-y-auto flex-1">
             {Object.values(COMPONENT_TYPES).map(type => (
               <div 
                 key={type.id}
                 draggable
                 onDragStart={(e) => handleDragStart(e, type)}
                 className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 cursor-grab active:cursor-grabbing transition-all group"
               >
                 <type.icon size={18} className={`${type.color} group-hover:scale-110 transition-transform`} />
                 <span className="text-sm text-slate-300 font-medium">{type.label}</span>
               </div>
             ))}
           </div>
        </div>

        {/* Main Canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 relative bg-slate-950 overflow-hidden"
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => { setSelectedId(null); setPendingConnection(null); }}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {edges.map(edge => {
              const from = nodes.find(n => n.id === edge.from);
              const to = nodes.find(n => n.id === edge.to);
              if (!from || !to) return null;
              const start = getConnectorPoint(from);
              const end = getConnectorPoint(to);
              const midX = (start.x + end.x) / 2;
              return (
                <path 
                  key={edge.id}
                  d={`M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`}
                  stroke="#334155" strokeWidth="2" fill="none" 
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
             <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#334155" />
              </marker>
            </defs>
          </svg>

          {nodes.map(node => (
            <NodeComponent 
              key={node.id} 
              node={node} 
              isSelected={selectedId === node.id}
              onSelect={setSelectedId}
              onMouseDown={handleNodeMouseDown}
            />
          ))}

          {connectionMode && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-indigo-900/80 backdrop-blur-md text-indigo-100 rounded-full text-sm shadow-xl border border-indigo-500/30 animate-pulse">
              {pendingConnection ? 'Select target node to connect' : 'Select starting node'}
            </div>
          )}
        </div>

        {/* Right Property Panel */}
        <div className="w-72 bg-slate-900 border-l border-slate-800 flex flex-col">
           <div className="p-4 border-b border-slate-800">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Node Properties</h3>
           </div>
           {selectedNode ? (
             <div className="p-4 space-y-6">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Component Name</label>
                  <input 
                    type="text" 
                    value={selectedNode.label}
                    onChange={(e) => setNodes(nodes.map(n => n.id === selectedId ? {...n, label: e.target.value} : n))}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                   <label className="text-xs text-slate-500 mb-1.5 block">Health Status</label>
                   <div className={`flex items-center gap-2 p-2 rounded bg-slate-950 border ${selectedNode.status === 'error' ? 'border-red-900/50' : 'border-slate-800'}`}>
                      <div className={`w-2 h-2 rounded-full ${selectedNode.status === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                      <span className="text-sm text-slate-400">{selectedNode.status === 'error' ? 'Config Issues' : 'Healthy'}</span>
                   </div>
                </div>
                
                <div className="space-y-3 pt-2">
                   {selectedNode.type === 'rds' && (
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 flex items-center gap-2"><Lock size={12}/> Secure VPC</span>
                        <button 
                          onClick={() => setNodes(nodes.map(n => n.id === selectedId ? {...n, status: n.config?.vpc ? 'error' : 'ok', config: {...n.config, vpc: !n.config?.vpc}} : n))}
                          className={`w-8 h-4 rounded-full relative transition-colors ${selectedNode.config?.vpc ? 'bg-cyan-600' : 'bg-slate-700'}`}
                        >
                          <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${selectedNode.config?.vpc ? 'right-0.5' : 'left-0.5'}`} />
                        </button>
                     </div>
                   )}
                </div>

                <button 
                  onClick={() => {
                    setNodes(nodes.filter(n => n.id !== selectedId));
                    setSelectedId(null);
                  }}
                  className="w-full py-2 flex items-center justify-center gap-2 text-red-400 hover:bg-red-900/10 rounded transition-colors text-sm mt-8 border border-transparent hover:border-red-900/30"
                >
                  <Trash2 size={14} /> Delete Component
                </button>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-8 text-center opacity-50">
               <Settings size={32} className="mb-2" />
               <p className="text-sm">Select a component to configure properties</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}