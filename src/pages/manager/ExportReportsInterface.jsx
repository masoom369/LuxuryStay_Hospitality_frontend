import { useState } from "react";
import { 
  Download,
  FileText,
  FileSpreadsheet,
  FileImage,
  Calendar,
  DollarSign,
  Home,
  User,
  Star,
  TrendingUp,
  Loader2
} from "lucide-react";
import { useDashboardContext } from "../../context/DashboardContext";

const ExportReportsInterface = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ 
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
    end: new Date().toISOString().split('T')[0] 
  });
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([]);
  const [options, setOptions] = useState({
    includeCharts: true,
    includeImages: false,
    includeSummary: true
  });
  
  const { exportReport } = useDashboardContext();

  const reportTypes = [
    { id: 'revenue', name: 'Revenue Report', description: 'Financial performance and revenue trends', icon: DollarSign },
    { id: 'occupancy', name: 'Occupancy Report', description: 'Room occupancy rates and trends', icon: Home },
    { id: 'feedback', name: 'Guest Feedback', description: 'Guest reviews and satisfaction metrics', icon: Star },
    { id: 'performance', name: 'Performance Metrics', description: 'Key performance indicators and KPIs', icon: TrendingUp },
    { id: 'bookings', name: 'Booking Reports', description: 'Reservation trends and patterns', icon: Calendar },
    { id: 'guest', name: 'Guest Analytics', description: 'Guest demographics and behavior', icon: User },
  ];

  const exportFormats = [
    { id: 'pdf', name: 'PDF', description: 'Portable Document Format' },
    { id: 'xls', name: 'Excel', description: 'Spreadsheet format' },
    { id: 'csv', name: 'CSV', description: 'Comma-separated values' },
    { id: 'png', name: 'Image', description: 'Image format' },
  ];

  const handleExport = async () => {
    if (!selectedReport) {
      alert('Please select a report type');
      return;
    }

    setIsExporting(true);

    try {
      const blob = await exportReport(
        selectedReport, 
        exportFormat, 
        {
          start: new Date(dateRange.start).toISOString(),
          end: new Date(dateRange.end).toISOString()
        },
        options
      );
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const reportName = reportTypes.find(r => r.id === selectedReport)?.name || 'Report';
      link.download = `${reportName.toLowerCase().replace(/\s+/g, '-')}-${dateRange.start}-${dateRange.end}.${exportFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Add to export history
      const newExport = {
        id: Date.now(),
        report: reportTypes.find(r => r.id === selectedReport)?.name || 'Unknown Report',
        format: exportFormat.toUpperCase(),
        date: new Date().toISOString().split('T')[0],
        size: exportFormat.toLowerCase() === 'pdf' ? '2.1 MB' : '1.5 MB'
      };

      setExportHistory([newExport, ...exportHistory]);
      alert(`${reportTypes.find(r => r.id === selectedReport)?.name} exported successfully as ${exportFormat.toUpperCase()}!`);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadHistory = (item) => {
    alert(`Downloading ${item.report} (${item.format}) from ${item.date}`);
  };

  return (
    <div className="container mx-auto py-14 px-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-primary text-accent px-3">Export Reports</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Export Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Export Configuration</h3>
            
            <div className="space-y-6">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {reportTypes.map((report) => {
                    const IconComponent = report.icon;
                    return (
                      <div
                        key={report.id}
                        onClick={() => setSelectedReport(report.id)}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedReport === report.id
                            ? 'border-accent bg-accent/5'
                            : 'border-gray-300 hover:border-accent'
                        }`}
                      >
                        <div className="flex items-start">
                          <IconComponent className={`w-5 h-5 mr-3 ${
                            selectedReport === report.id ? 'text-accent' : 'text-gray-500'
                          }`} />
                          <div>
                            <h4 className="font-medium text-gray-900">{report.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {exportFormats.map((format) => {
                    let IconComponent;
                    if (format.id === 'pdf') IconComponent = FileText;
                    else if (format.id === 'xls' || format.id === 'csv') IconComponent = FileSpreadsheet;
                    else IconComponent = FileImage;

                    return (
                      <div
                        key={format.id}
                        onClick={() => setExportFormat(format.id)}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors text-center ${
                          exportFormat === format.id
                            ? 'border-accent bg-accent/5'
                            : 'border-gray-300 hover:border-accent'
                        }`}
                      >
                        <IconComponent className={`w-5 h-5 mx-auto mb-1 ${
                          exportFormat === format.id ? 'text-accent' : 'text-gray-500'
                        }`} />
                        <div className="text-sm font-medium text-gray-900">{format.name}</div>
                        <div className="text-xs text-gray-600">{format.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Export Button */}
              <div>
                <button
                  onClick={handleExport}
                  disabled={isExporting || !selectedReport}
                  className="w-full bg-accent text-white hover:bg-accent/90 transition-colors py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Export History */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Export History</h3>
            
            {exportHistory.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No export history yet
              </div>
            ) : (
              <div className="space-y-3">
                {exportHistory.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{item.report}</h4>
                        <p className="text-xs text-gray-600">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 text-xs bg-accent/10 text-accent rounded">
                          {item.format}
                        </span>
                        <p className="text-xs text-gray-600 mt-1">{item.size}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button 
                        onClick={() => handleDownloadHistory(item)}
                        className="text-xs text-accent hover:underline"
                      >
                        Download
                      </button>
                      <button className="text-xs text-gray-600 hover:underline">Share</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-primary text-accent mb-4">Advanced Export Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Include Charts</h4>
              <p className="text-sm text-gray-600 mb-3">Include visual charts and graphs in the report</p>
              <div className="flex items-center">
                <label className="switch relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={options.includeCharts}
                    onChange={(e) => setOptions({...options, includeCharts: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Include Images</h4>
              <p className="text-sm text-gray-600 mb-3">Include property photos and images</p>
              <div className="flex items-center">
                <label className="switch relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={options.includeImages}
                    onChange={(e) => setOptions({...options, includeImages: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Include Summary</h4>
              <p className="text-sm text-gray-600 mb-3">Include executive summary at the beginning</p>
              <div className="flex items-center">
                <label className="switch relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={options.includeSummary}
                    onChange={(e) => setOptions({...options, includeSummary: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Export Preview */}
        {selectedReport && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-primary text-accent mb-4">Report Preview</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">
                  {reportTypes.find(r => r.id === selectedReport)?.name} - {dateRange.start} to {dateRange.end}
                </h4>
                <span className="inline-block px-2 py-1 text-xs bg-accent/10 text-accent rounded">
                  {exportFormat.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-white rounded shadow-sm">
                  <div className="text-2xl font-bold text-accent">85.3%</div>
                  <div className="text-xs text-gray-600">Occupancy</div>
                </div>
                <div className="text-center p-3 bg-white rounded shadow-sm">
                  <div className="text-2xl font-bold text-accent">$24,500</div>
                  <div className="text-xs text-gray-600">Revenue</div>
                </div>
                <div className="text-center p-3 bg-white rounded shadow-sm">
                  <div className="text-2xl font-bold text-accent">4.7/5</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center p-3 bg-white rounded shadow-sm">
                  <div className="text-2xl font-bold text-accent">1,248</div>
                  <div className="text-xs text-gray-600">Bookings</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  This is a preview of your report. The full report will include detailed charts, tables, and analytics based on the selected parameters.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportReportsInterface;