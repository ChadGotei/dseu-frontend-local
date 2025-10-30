import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";

const examinationNav = [
  { label: "Notices", to: "/examination/notices" },
  { label: "Results", to: "/examination/results" },
  { label: "Datesheet", to: "/examination/datesheet" },
  { label: "Fee Portal", to: "https://eazypay.icicibank.com/eazypayLink?P1=iHSKEXeO8j51e9k+lFEY3w==", external: true },
];

const Examination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(examinationNav[0]);

  useEffect(() => {
    if (location.pathname === "/examination") {
      navigate("/examination/notices", { replace: true });
    }
    // Update select if navigation changed
    const found = examinationNav.find((item) => !item.external && item.to === location.pathname);
    if (found) setSelected(found);
  }, [location.pathname, navigate]);

  const handleDropdownChange = (item) => {
    setSelected(item);
    if (item.external) {
      window.open(item.to, "_blank");
    } else {
      navigate(item.to);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-center bg-[#f8fafc] min-h-screen">
      {/* Mobile Dropdown Sidebar */}
      <div className="w-full max-w-xs mx-auto mt-4 md:hidden">
        <Listbox value={selected} onChange={handleDropdownChange}>
          <div className="relative">
            <Listbox.Button className="w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-bold">
              {selected.label}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              {examinationNav.map((item) => (
                <Listbox.Option
                  key={item.label}
                  value={item}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`}
                >
                  {item.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 max-w-full bg-white rounded-xl border border-gray-200 shadow-sm p-7 flex flex-col mt-14 mr-8">
        <h2 className="font-bold text-xl text-blue-900 mb-6 text-left">Examination</h2>
        <div className="flex flex-col gap-5">
          {examinationNav.map(item => {
            const isActive = location.pathname === item.to;
            const base =
              "block text-center px-4 py-5 rounded-xl font-semibold text-[1.1rem] border transition-colors";
            const active =
              "border-blue-500 text-blue-800 bg-blue-50 shadow";
            const inactive =
              "border-gray-200 text-gray-800 bg-white hover:bg-blue-50 hover:text-blue-900";
            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={base + " " + inactive}
                >
                  {item.label}
                </a>
              );
            } else {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={base + " " + (isActive ? active : inactive)}
                >
                  {item.label}
                </Link>
              );
            }
          })}
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl px-3 sm:px-6 md:px-8 py-6 md:py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Examination;
