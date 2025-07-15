
import { useState } from "react";
import { 
  Building, 
  BarChart3, 
  GitCompare, 
  TrendingUp, 
  User, 
  Shield, 
  Lightbulb, 
  ArrowLeftRight, 
  Settings 
} from "lucide-react";

const menuItems = [
  { key: "corporate", label: "Corporate View", icon: <Building className="w-5 h-5" /> },
  { key: "dashboard", label: "Dashboard Overview", icon: <BarChart3 className="w-5 h-5" /> },
  { key: "vendor", label: "Vendor Comparison", icon: <GitCompare className="w-5 h-5" /> },
  { key: "spending", label: "Spending Trends", icon: <TrendingUp className="w-5 h-5" /> },
  { key: "spenders", label: "Top Spenders", icon: <User className="w-5 h-5" /> },
  { key: "compliance", label: "Compliance Metrics", icon: <Shield className="w-5 h-5" /> },
  { key: "insights", label: "AI Insights", icon: <Lightbulb className="w-5 h-5" /> },
  { key: "transactions", label: "Transactions", icon: <ArrowLeftRight className="w-5 h-5" /> },
  { key: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
];

export function Sidebar() {
  const [selectedKey, setSelectedKey] = useState("corporate");

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-gray-800 to-gray-700 z-50">
      {/* INFINITI Logo Section */}
      <div className="p-6 border-b border-gray-600 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
          <span className="text-blue-600 font-bold">I</span>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg m-0">INFINITI</h4>
          <p className="text-gray-300 text-sm">
            Inspiring Travel Innovation
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="pt-4">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => setSelectedKey(item.key)}
            className={`w-full flex items-center gap-3 px-6 py-3 mx-4 rounded-md transition-colors ${
              selectedKey === item.key 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-600 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">
          JD
        </div>
        <div>
          <p className="text-white font-medium">John Doe</p>
          <p className="text-gray-300 text-sm">Admin</p>
        </div>
      </div>
    </div>
  );
}
