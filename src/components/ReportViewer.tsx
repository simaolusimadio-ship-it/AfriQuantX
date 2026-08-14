import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, Download, Play, RefreshCw, Filter, CheckCircle2, 
  Layers, Printer, ChevronLeft, ChevronRight, Search, BarChart3, ShieldCheck 
} from 'lucide-react';
import { AVAILABLE_REPORT_TEMPLATES, ReportExecutionResult, ReportService, ReportTemplate } from '../services/reportService';

export function ReportViewer() {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate>(AVAILABLE_REPORT_TEMPLATES[0]);
  const [paramValues, setParamValues] = useState<Record<string, any>>({});
  const [format, setFormat] = useState<'pdf' | 'xlsx' | 'csv' | 'html'>('pdf');
  const [loading, setLoading] = useState(false);
  const [reportResult, setReportResult] = useState<ReportExecutionResult | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initialize default parameter values
    const defaults: Record<string, any> = {};
    selectedTemplate.parameters.forEach(p => {
      defaults[p.key] = p.defaultValue;
    });
    setParamValues(defaults);
    // Generate initial report
    handleRunReport(selectedTemplate.id, defaults, format);
  }, [selectedTemplate]);

  const handleRunReport = async (
    templateId = selectedTemplate.id, 
    params = paramValues, 
    fmt = format
  ) => {
    setLoading(true);
    try {
      const res = await ReportService.generateReport(templateId, params, fmt);
      setReportResult(res);
      setActivePage(1);
    } catch (err) {
      console.error('Failed to run report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (reportResult) {
      ReportService.exportReportFile(reportResult);
    }
  };

  const filteredRows = reportResult?.rows.filter(row => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      row.id?.toLowerCase().includes(q) ||
      row.ticker?.toLowerCase().includes(q) ||
      row.exchange?.toLowerCase().includes(q) ||
      row.status?.toLowerCase().includes(q)
    );
  }) || [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-black border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-blue-400 border-blue-500/30 bg-blue-500/10 font-mono text-[10px] uppercase">
                  Jaspersoft & ReportServer Engine
                </Badge>
                <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px] uppercase">
                  Institutional Ready
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Financial & Audit Reporting System</h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                Generate high-precision trade audit ledgers, Whop wallet entitlement proofs, tax compliance certificates, and quantitative risk statements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleExport}
              disabled={!reportResult || loading}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <Download className="w-4 h-4" />
              Export Report ({format.toUpperCase()})
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template Selector Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-neutral-950 border-white/10 shadow-xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                Report Catalog
              </CardTitle>
              <CardDescription className="text-zinc-500 text-[11px]">
                Select pre-configured Jaspersoft templates.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-3 space-y-2">
              {AVAILABLE_REPORT_TEMPLATES.map((tpl) => {
                const isSelected = tpl.id === selectedTemplate.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-500/40 text-white shadow-lg'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white truncate max-w-[160px]">{tpl.title}</span>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-white/10 text-zinc-400 font-mono">
                        {tpl.category}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">{tpl.description}</p>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Parameter Tuning Controls */}
          <Card className="bg-neutral-950 border-white/10 shadow-xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-orange-400" />
                Report Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              {selectedTemplate.parameters.map((p) => (
                <div key={p.key} className="space-y-1.5">
                  <label className="text-zinc-400 font-medium block text-[11px]">{p.label}</label>
                  {p.type === 'select' ? (
                    <select
                      value={paramValues[p.key] || p.defaultValue}
                      onChange={(e) => setParamValues({ ...paramValues, [p.key]: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none focus:border-blue-500/50"
                    >
                      {p.options?.map((opt) => (
                        <option key={opt} value={opt} className="bg-neutral-950">{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={p.type === 'number' ? 'number' : 'text'}
                      value={paramValues[p.key] || ''}
                      onChange={(e) => setParamValues({ ...paramValues, [p.key]: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none focus:border-blue-500/50"
                    />
                  )}
                </div>
              ))}

              <div className="space-y-1.5 pt-2">
                <label className="text-zinc-400 font-medium block text-[11px]">Export Format</label>
                <div className="grid grid-cols-4 gap-1">
                  {(['pdf', 'xlsx', 'csv', 'html'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold border transition-all ${
                        format === fmt
                          ? 'bg-white text-black border-white'
                          : 'bg-black border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => handleRunReport()}
                disabled={loading}
                className="w-full bg-white text-black hover:bg-zinc-200 font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                Execute Pipeline
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Report Preview Canvas */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="bg-neutral-950 border-white/10 shadow-2xl overflow-hidden min-h-[600px] flex flex-col justify-between">
            {/* Header bar */}
            <div className="p-4 border-b border-white/10 bg-black/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-base flex items-center gap-2">
                  {selectedTemplate.title}
                  {reportResult && (
                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px]">
                      {reportResult.reportId}
                    </Badge>
                  )}
                </h3>
                {reportResult && (
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    Generated on {reportResult.generatedAt} | {reportResult.totalRecords} Settled Records
                  </p>
                )}
              </div>

              {/* Search filter in preview */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter report records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 space-y-6">
              {loading ? (
                <div className="h-96 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                  <p className="text-xs font-mono text-zinc-400">Compiling Jaspersoft / ReportServer data pipeline...</p>
                </div>
              ) : reportResult ? (
                <>
                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-sans font-bold block">Total Volume</span>
                      <span className="text-white text-base font-bold mt-1 block">{reportResult.dataSummary.totalVolumeUsd}</span>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-sans font-bold block">Audit Verification</span>
                      <span className="text-emerald-400 text-xs font-bold mt-1 block flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {reportResult.dataSummary.auditStatus}
                      </span>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-sans font-bold block">Settlement Score</span>
                      <span className="text-blue-400 text-xs font-bold mt-1 block">{reportResult.dataSummary.complianceScore}</span>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-3.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-sans font-bold block">Primary Target</span>
                      <span className="text-orange-400 text-xs font-bold mt-1 block truncate">{reportResult.dataSummary.primaryExchange}</span>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="overflow-x-auto border border-white/10 rounded-2xl">
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-white/5 text-zinc-400 text-[10px] uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="p-3">Audit Ref</th>
                          <th className="p-3">Timestamp</th>
                          <th className="p-3">Exchange</th>
                          <th className="p-3">Ticker</th>
                          <th className="p-3">Side</th>
                          <th className="p-3 text-right">Volume</th>
                          <th className="p-3">Latency</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredRows.map((row) => (
                          <tr key={row.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-3 text-blue-400 font-bold">{row.id}</td>
                            <td className="p-3 text-zinc-400 text-[11px]">{row.timestamp}</td>
                            <td className="p-3 text-white">{row.exchange}</td>
                            <td className="p-3 text-white font-bold">{row.ticker}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                              }`}>
                                {row.type}
                              </span>
                            </td>
                            <td className="p-3 text-right text-white font-bold">{row.volumeUsd}</td>
                            <td className="p-3 text-zinc-400 text-[11px]">{row.executionTimeMs}</td>
                            <td className="p-3">
                              <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : null}
            </div>

            {/* Footer Pagination */}
            <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Page {activePage} of {reportResult?.pageCount || 1}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={activePage <= 1}
                  onClick={() => setActivePage(p => p - 1)}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!reportResult || activePage >= reportResult.pageCount}
                  onClick={() => setActivePage(p => p + 1)}
                  className="border-white/10 text-white hover:bg-white/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
