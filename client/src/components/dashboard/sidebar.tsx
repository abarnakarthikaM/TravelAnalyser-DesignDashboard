import { useState } from "react";
import { 
  Building, 
  BarChart3, 
  GitCompare, 
  TrendingUp, 
  Users, 
  Shield, 
  Brain, 
  ArrowRightLeft, 
  Settings 
} from "lucide-react";

const menuItems = [
  { id: "corporate", label: "Corporate View", icon: Building, active: true },
  { id: "dashboard", label: "Dashboard Overview", icon: BarChart3, active: false },
  { id: "vendor", label: "Vendor Comparison", icon: GitCompare, active: false },
  { id: "spending", label: "Spending Trends", icon: TrendingUp, active: false },
  { id: "spenders", label: "Top Spenders", icon: Users, active: false },
  { id: "compliance", label: "Compliance Metrics", icon: Shield, active: false },
  { id: "insights", label: "AI Insights", icon: Brain, active: false },
  { id: "transactions", label: "Transactions", icon: ArrowRightLeft, active: false },
  { id: "settings", label: "Settings", icon: Settings, active: false },
];

export function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("corporate");

  return (
    <div className="w-64 infiniti-sidebar text-white flex flex-col">
      {/* INFINITI Logo Section */}
      <div className="p-6 border-b border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-[var(--infiniti-blue)] font-bold text-sm">I</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">INFINITI</h1>
            <p className="text-xs text-gray-300">Inspiring Travel Innovation</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  isActive 
                    ? "text-white infiniti-sidebar-active" 
                    : "text-gray-300 hover:text-white hover:infiniti-sidebar-hover"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-6 border-t border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">JD</span>
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-gray-300">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
