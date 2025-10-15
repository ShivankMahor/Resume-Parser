import { useEffect, useState } from 'react';
import { Upload, User, Briefcase, GraduationCap, FolderGit2, Award, Code, FileText, BarChart3 } from 'lucide-react';
import TechTagsList from './components/TechTagList';

function App() {
  url = import.meta.env.VITE_RESUME_PARSER_API_URL
  const [resumeData, setResumeData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(()=>{
    console.log("Resume Data: ", resumeData)
  },[resumeData])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf_file', file);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to parse resume');
      }

      const data = await response.json();
      console.log("Data:", data)
      setResumeData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Resume Parser</h1>
          <p className="text-slate-600">Upload your resume to get detailed analysis and insights</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-6 bg-slate-50 rounded-full">
                <Upload className="w-12 h-12 text-slate-600" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-slate-900">Click to upload PDF</p>
                <p className="text-sm text-slate-500 mt-1">or drag and drop your resume here</p>
              </div>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              disabled={loading}
            />
          </label>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            <p className="mt-4 text-slate-600">Parsing your resume...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800 font-medium">Error: {error}</p>
          </div>
        )}

        {/* Resume Data Display */}
        {resumeData && (
          <div className="space-y-6">
            {/* Profile Section */}
            {resumeData.parsed_resume?.Profile && (
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <User className="w-5 h-5 text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Name</p>
                    <p className="text-slate-900">{resumeData.parsed_resume.Profile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <p className="text-slate-900">{resumeData.parsed_resume.Profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Phone</p>
                    <p className="text-slate-900">{resumeData.parsed_resume.Profile.phone_number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Country</p>
                    <p className="text-slate-900">{resumeData.parsed_resume.Profile.country}</p>
                  </div>
                  {resumeData.parsed_resume.Profile.github && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">GitHub</p>
                      <a href={`${resumeData.parsed_resume.Profile.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {resumeData.parsed_resume.Profile.github}
                      </a>
                    </div>
                  )}
                  {resumeData.parsed_resume.Profile.linkedin && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">LinkedIn</p>
                      <a href={`${resumeData.parsed_resume.Profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {resumeData.parsed_resume.Profile.linkedin}
                      </a>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Education Section */}
            {resumeData.parsed_resume?.Education && resumeData.parsed_resume.Education.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Education</h2>
                </div>
                <div className="space-y-4">
                  {resumeData.parsed_resume.Education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-slate-300 pl-4">
                      <h3 className="font-semibold text-lg text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-700">{edu.institution_name}</p>
                      <p className="text-sm text-slate-600">{edu.field_of_study}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span>{edu.start_date} - {edu.end_date}</span>
                        {edu.cgpa_or_percent && <span>CGPA: {edu.cgpa_or_percent}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Work Experience Section */}
            {resumeData.parsed_resume?.['Work Experience'] && resumeData.parsed_resume['Work Experience'].length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Work Experience</h2>
                </div>
                <div className="space-y-6">
                  {resumeData.parsed_resume['Work Experience'].map((exp, index) => (
                    <div key={index} className="border-l-4 border-slate-300 pl-4">
                      <h3 className="font-semibold text-lg text-slate-900">{exp.job_title}</h3>
                      <p className="text-slate-700">{exp.company_name}</p>
                      <p className="text-sm text-slate-500 mt-1">{exp.start_date} - {exp.end_date}</p>
                      {exp.descriptions && exp.descriptions.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {exp.descriptions.map((desc, i) => (
                            <li key={i} className="text-sm text-slate-600 flex gap-2">
                              <span className="text-slate-400 mt-1">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {resumeData.parsed_resume?.Projects && resumeData.parsed_resume.Projects.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <FolderGit2 className="w-5 h-5 text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
                </div>
                <div className="space-y-6">
                  {resumeData.parsed_resume.Projects.map((project, index) => (
                    <div key={index} className="border-l-4 border-slate-300 pl-4">
                      <h3 className="font-semibold text-lg text-slate-900">{project.project_name}</h3>
                      {project.tech_stack && (
                        <p className="text-sm text-slate-600 mt-1">
                          <span className="font-medium">Tech Stack:</span> {project.tech_stack}
                        </p>
                      )}
                      {project.descriptions && project.descriptions.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {project.descriptions.map((desc, i) => (
                            <li key={i} className="text-sm text-slate-600 flex gap-2">
                              <span className="text-slate-400 mt-1">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills Section */}
            {resumeData.parsed_resume?.Skills && resumeData.parsed_resume.Skills.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Code className="w-5 h-5 text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Skills</h2>
                </div>

                <div className="space-y-5">
                  {resumeData.parsed_resume.Skills.map((skillGroup, index) => {
                    if(skillGroup.skills.length === 0) return null;
                    return (
                    <div key={index}>
                      {/* Category Title */}
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {skillGroup.category}
                      </h3>

                      {/* Skills Badges */}
                      <div className="flex flex-wrap gap-2">
                        <TechTagsList tags={skillGroup.skills} size={4} px={3} py={2}/>
                        {/* {skillGroup.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                          >
                            <TechTagsList skill={skill}/>
                          </span>
                        ))} */}
                      </div>
                    </div>
                  )})}
                </div>
              </section>
            )}


            {/* Achievements Section */}
            {resumeData.parsed_resume?.Achievements && resumeData.parsed_resume.Achievements.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Award className="w-5 h-5 text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Achievements</h2>
                </div>
                <div className="space-y-3">
                  {resumeData.parsed_resume.Achievements.map((achievement, index) => (
                    <div key={index} className="border-l-4 border-slate-300 pl-4">
                      <h3 className="font-semibold text-slate-900">{achievement.title}</h3>
                      {achievement.organization && <p className="text-sm text-slate-600">{achievement.organization}</p>}
                      {achievement.date && <p className="text-sm text-slate-500">{achievement.date}</p>}
                      {achievement.description && <p className="text-sm text-slate-600 mt-1">{achievement.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

   {/* AI Suggestions Section */}
{resumeData.modified_sections && (
  <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-slate-100 rounded-lg">
        <FileText className="w-5 h-5 text-slate-700" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">AI Suggestions</h2>
    </div>

    {/* Projects */}
    {resumeData.modified_sections.projects &&
      resumeData.modified_sections.projects.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Projects</h3>
          <div className="space-y-6">
            {resumeData.modified_sections.projects.map((project, index) => (
              <div
                key={index}
                className="border-l-4 border-slate-300 pl-4"
              >
                <h4 className="font-semibold text-lg text-slate-900">
                  {project.projectTitle || "Untitled Project"}
                </h4>
                {project.techStack && (
                  <p className="text-sm text-slate-600 mt-1">
                    <span className="font-medium">Tech Stack:</span> {project.techStack}
                  </p>
                )}
                {project.description && project.description.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {project.description.map((desc, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    {/* Work Experience */}
    {resumeData.modified_sections.workExperience &&
      resumeData.modified_sections.workExperience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Work Experience</h3>
          <div className="space-y-6">
            {resumeData.modified_sections.workExperience.map((work, index) => (
              <div
                key={index}
                className="border-l-4 border-slate-300 pl-4"
              >
                <h4 className="font-semibold text-lg text-slate-900">
                  {work.title || "Untitled Role"}
                </h4>
                {work.description && work.description.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {work.description.map((desc, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    {/* Achievements */}
    {resumeData.modified_sections.achievements &&
      resumeData.modified_sections.achievements.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Achievements</h3>
          <div className="space-y-6">
            {resumeData.modified_sections.achievements.map((ach, index) => (
              <div
                key={index}
                className="border-l-4 border-slate-300 pl-4"
              >
                <h4 className="font-semibold text-lg text-slate-900">
                  {ach.title || "Untitled Achievement"}
                </h4>
                {ach.description && ach.description.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {ach.description.map((desc, i) => {
                      // Remove leading "- " or "– " or extra spaces, if present
                      const cleanDesc = desc.replace(/^\s*[-–]\s*/, '');
                      return (
                        <li key={i} className="text-sm text-slate-600 flex gap-2">
                          <span className="text-slate-400 mt-1">•</span>
                          <span>{cleanDesc}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
  </section>
)}



            {resumeData.ATS_SCORE && (
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-slate-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">ATS Score</h2>
                </div>

                {resumeData.ATS_SCORE.summary && (
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Match Percentage</span>
                        <span className="text-3xl font-bold text-slate-900">{resumeData.ATS_SCORE.summary.match_percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className="bg-slate-800 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${resumeData.ATS_SCORE.summary.match_percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-600">Total Skills</p>
                        <p className="text-2xl font-bold text-slate-900">{resumeData.ATS_SCORE.summary.resume_skill_count}</p>
                      </div>
                      {/* <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-600">Job Skills</p>
                        <p className="text-2xl font-bold text-slate-900">{resumeData.ATS_SCORE.summary.job_skill_count}</p>
                      </div> */}
                    </div>

                    {/* {resumeData.ATS_SCORE.summary.matching_skills && resumeData.ATS_SCORE.summary.matching_skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-900 mb-2">Matching Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.ATS_SCORE.summary.matching_skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )} */}
                  </div>
                )}

                {resumeData.ATS_SCORE.detailed_resume_mapping && resumeData.ATS_SCORE.detailed_resume_mapping.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Detailed Resume Mapping</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-3 text-slate-700 font-medium">Input</th>
                            <th className="text-left py-2 px-3 text-slate-700 font-medium">Mapped To</th>
                            <th className="text-left py-2 px-3 text-slate-700 font-medium">Confidence</th>
                            <th className="text-left py-2 px-3 text-slate-700 font-medium">Method</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resumeData.ATS_SCORE.detailed_resume_mapping.map((mapping, index) => (
                            <tr key={index} className="border-b border-slate-100">
                              <td className="py-2 px-3 text-slate-900">{mapping.input}</td>
                              <td className="py-2 px-3 text-slate-900">{mapping.mapped_to}</td>
                              <td className="py-2 px-3">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                  mapping.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                                  mapping.confidence >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {(mapping.confidence * 100).toFixed(0)}%
                                </span>
                              </td>
                              <td className="py-2 px-3 text-slate-600">{mapping.method}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {resumeData.ATS_SCORE.missing_job_skills && resumeData.ATS_SCORE.missing_job_skills.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Missing Job Skills</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-3 text-slate-700 font-medium">Skill</th>
                            <th className="text-left py-2 px-3 text-slate-700 font-medium">Closest Match</th>
                            <th className="text-left py-2 px-3 text-slate-700 font-medium">Confidence</th>
                            <th className="text-left py-2 px-3 text-slate-700 font-medium">Method</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resumeData.ATS_SCORE.missing_job_skills.map((skill, index) => (
                            <tr key={index} className="border-b border-slate-100">
                              <td className="py-2 px-3 text-slate-900">{skill.input}</td>
                              <td className="py-2 px-3 text-slate-900">{skill.closest_match}</td>
                              <td className="py-2 px-3">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                  skill.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                                  skill.confidence >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {(skill.confidence * 100).toFixed(0)}%
                                </span>
                              </td>
                              <td className="py-2 px-3 text-slate-600">{skill.method}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
