import {
  FileText,
  ClipboardList,
  CalendarDays,
  CreditCard,
} from "lucide-react";
import PropTypes from "prop-types";

const iconMap = {
  "exam notices": <FileText size={18} strokeWidth={2} />,
  "exam results": <ClipboardList size={18} strokeWidth={2} />,
  "exam datesheet": <CalendarDays size={18} strokeWidth={2} />,
  "exam fee-link": <CreditCard size={18} strokeWidth={2} />,
};

const ExaminationSidebar = ({ items, selectedKey, onSelect }) => {
  return (
    <aside className="hidden md:flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm p-5 mt-14 mr-8 w-64 h-auto pb-20">
      <h2 className="text-lg font-bold text-gray-600 uppercase tracking-wide mb-4 mt-2">
        Examination
      </h2>

      <nav className="flex flex-col space-y-2">
        {items.map((item) => {
          const isActive = selectedKey === item.key;
          const base =
            "flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all";
          const active =
            "bg-blue-100 text-blue-700";
          const inactive =
            "text-gray-700 hover:bg-blue-50 hover:text-blue-700";

          const icon = iconMap[item.key] || <FileText size={18} strokeWidth={2} />;

          if (item.external) {
            return (
              <a
                key={item.key}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} ${inactive}`}
              >
                <span className="text-blue-600">{icon}</span>
                {item.label}
              </a>
            );
          }

          return (
            <button
              key={item.key}
              onClick={() => onSelect(item)}
              className={`${base} ${isActive ? active : inactive}`}
            >
              <span className="text-blue-600">{icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

ExaminationSidebar.propTypes = {
  items: PropTypes.array.isRequired,
  selectedKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ExaminationSidebar;
