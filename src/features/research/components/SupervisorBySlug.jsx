import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, BookOpen, Clock, Globe, Link } from 'lucide-react';
import supervisorDetailsData from '../data/supervisors.json';
import LinkButton from "../components/LinkButton";

const Supervisor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const supervisor = supervisorDetailsData[slug];

  if (!supervisor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b from-gray-50 to-white text-center px-6">
        <p className="text-gray-600 mb-6">
          The supervisor you’re trying to view doesn’t exist or the link is incorrect.
        </p>
        <button
          onClick={() => navigate('/research/supervisors')}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-md font-medium shadow hover:bg-blue-700 hover:shadow-lg transition-all"
        >
          Go to Supervisors
        </button>
      </div>
    );
  }


  const sections = useMemo(() => {
    const allSections = [
      { key: 'basic-info', label: 'Basic Info', icon: <Mail size={16} />, data: supervisor.basic_info },
      { key: 'academic', label: 'Academic Background', icon: <BookOpen size={16} />, data: supervisor.academic_background },
      { key: 'research', label: 'Research Profile', icon: <Globe size={16} />, data: supervisor.research_profile },
      { key: 'supervision', label: 'PhD Supervision', icon: <Clock size={16} />, data: supervisor.phd_supervision && supervisor.administrative_roles },
      { key: 'web-links', label: 'Web Links', icon: <Link size={16} />, data: supervisor.web_links },
    ];

    const hasValidData = (data) => {
      if (!data) return false;
      if (typeof data === 'string') return data.trim() !== '';
      if (typeof data === 'object') {
        return Object.values(data).some(val => {
          if (Array.isArray(val)) return val.length > 0;
          if (typeof val === 'object') return hasValidData(val);
          return val && val.toString().trim() !== '';
        });
      }
      return false;
    };

    return allSections.filter(section => hasValidData(section.data)); //? display only where there is data
    // return allSections;  ? dislay all
  }, [supervisor]);


  const [activeSection, setActiveSection] = useState(sections[0].key);

  if (!supervisor) {
    return navigate('/research')
  }

  const {
    basic_info,
    academic_background,
    research_profile,
    phd_supervision,
    administrative_roles,
    web_links,
    photo_url
  } = supervisor;

  return (
    <div className="p-3 md:p-6 lg:p-10 md:mx-20 mt-8 mb-16 text-sm">
      <button
        onClick={() => navigate(-1)}
        className="ml-3 mb-6 px-4 py-2 bg-blue-500 text-gray-100 rounded transition-colors text-xs flex flex-row items-center justify-center hover:text-blue-500 hover:bg-gray-100 border border-transparent hover:border-blue-500 hover:shadow-md"
      >
        <ChevronLeft size={16} />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-10">

        {/* Photo */}
        <div className="flex flex-col items-center md:items-start md:min-w-[220px] lg:min-w-[250px] md:sticky md:top-4 md:h-fit">
          <h2 className="text-xl font-bold block md:hidden text-gray-800 mb-4 text-center">
            {basic_info.full_name}
          </h2>

          <img
            className="w-full max-w-[200px] md:max-w-none md:w-[250px] h-auto object-cover rounded-lg shadow-xl"
            src={photo_url || '/images/default-supervisor.jpg'}
            alt={`Photo of ${basic_info.full_name}`}
          />

          {/* Side bar for navigation */}
          <div className="flex flex-col gap-1 mt-6 w-full">
            <h3 className="text-base font-semibold text-gray-700 mb-2 border-b pb-1 hidden md:block">Profile Sections</h3>
            <div className="flex flex-wrap md:flex-col gap-2 w-full">
              {sections.map(section => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`px-3 py-2 rounded transition-all text-xs md:text-sm flex items-center justify-center md:justify-start gap-2 border border-gray-200 shadow-sm
                                        ${activeSection === section.key
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                >
                  {section.icon}
                  <span className="hidden md:block">{section.label}</span>
                  <span className="block md:hidden">{section.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full">
          <h1 className="text-3xl font-extrabold hidden md:block text-gray-800 mb-1">
            {basic_info.full_name}
          </h1>
          <p className="text-base text-blue-600 font-semibold mb-6 border-b pb-3 hidden md:block">
            {basic_info.designation}
          </p>

          {/* Basic Info Section */}
          <SectionContainer id="basic-info" title="Basic Information" isActive={activeSection === 'basic-info'}>
            <DetailItem icon={<Mail size={16} />} label="Email" value={basic_info.official_email} link={`mailto:${basic_info.official_email}`} />
            {/* <DetailItem icon={<Phone size={16} />} label="Contact" value={basic_info.contact_number} /> */}
            <DetailItem icon={<Globe size={16} />} label="Department" value={basic_info.department} />
            <DetailItem icon={<BookOpen size={16} />} label="Faculty Type" value={basic_info.faculty} />
            <DetailItem icon={<Clock size={16} />} label="Designation" value={basic_info.designation} />
            <DetailItem icon={<Globe size={16} />} label="Office Location" value={basic_info.office_address} fullWidth={true} />
          </SectionContainer>

          {/* Academic Background Section */}
          <SectionContainer id="academic" title="Academic Background" isActive={activeSection === 'academic'}>
            <DetailItem label="Highest Qualification" value={academic_background.highest_qualification} />
            <DetailItem label="Alma Mater" value={`${academic_background.alma_mater}`} />
            <DetailItem label="Experience" value={academic_background.experience_years} />
            <DetailItem label="Professional Memberships" value={administrative_roles.professional_memberships} />
          </SectionContainer>

          {/* Research Profile Section */}
          <SectionContainer id="research" title="Research Profile" isActive={activeSection === 'research'}>
            <DetailItem label="Broad Research Areas" value={research_profile.broad_research_areas} fullWidth={true} isList={true} />
            <DetailItem label="Specific Interests" value={research_profile.specific_research_interests} fullWidth={true} isList={true} />
            <DetailItem label="Publications (Last 5 Years)" value={research_profile.publications_last_5_years} />
            <DetailItem label="Patents" value={research_profile.patents} />
            <DetailItem label="Projects" value={research_profile.projects} fullWidth={true} />
            <DetailItem label="Collaborations" value={research_profile.collaborations} fullWidth={true} />
          </SectionContainer>

          {/* PHD Supervision Section */}
          <SectionContainer id="supervision" title="PHD Supervision" isActive={activeSection === 'supervision'}>
            <DetailItem label="PhD Students Supervised" value={phd_supervision.phd_students_supervised} />
            <DetailItem label="Masters Dissertations Guided" value={phd_supervision.masters_dissertations_guided} />
            <DetailItem label="Administrative Roles" value={administrative_roles.boards_committees} fullWidth={true} />
          </SectionContainer>

          {/* Web Links Section */}
          <SectionContainer id="web-links" title="Web Links" isActive={activeSection === 'web-links'}>
            <div className="flex flex-wrap gap-4 md:col-span-2">
              {web_links.google_scholar && (
                <LinkButton href={web_links.google_scholar}>Google Scholar</LinkButton>
              )}
              {web_links.orcid && (
                <LinkButton href={`https://orcid.org/${web_links.orcid}`}>ORCID: {web_links.orcid}</LinkButton>
              )}
              {web_links.researchgate_orcid_scopus && (
                <LinkButton href={web_links.researchgate_orcid_scopus}>ResearchGate/Scopus</LinkButton>
              )}
              {web_links.linkedin && (
                <LinkButton href={web_links.linkedin}>LinkedIn</LinkButton>
              )}
              {!web_links.google_scholar && !web_links.orcid && !web_links.linkedin && !web_links.researchgate_orcid_scopus && !web_links.faculty_profile_page && (
                <p className="text-gray-500 italic">No web links as of now.</p>
              )}
            </div>
          </SectionContainer>
        </div>
      </div>
    </div>
  );
}

export default Supervisor;

const SectionContainer = ({ id, title, children, isActive }) => {
  if (!isActive) return null;

  return (
    <div id={id} className="mt-4 pt-4 border-t-4 border-blue-500 bg-gray-50 p-4 rounded-lg shadow-md md:mt-10 md:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-5">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {children}
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, link, fullWidth = false, isList = false }) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }

  return (
    <div className={`flex flex-col ${fullWidth ? 'md:col-span-2' : ''} p-2 border-l-4 border-gray-300 pl-3`}>
      <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
        {icon} {label}
      </span>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline mt-0.5 font-semibold break-words">
          {value}
        </a>
      ) : isList ? (
        <p className="text-gray-700 mt-0.5 break-words italic text-sm">{value}</p>
      ) : (
        <p className="text-gray-700 mt-0.5 font-semibold break-words">{value}</p>
      )}
    </div>
  );
};

