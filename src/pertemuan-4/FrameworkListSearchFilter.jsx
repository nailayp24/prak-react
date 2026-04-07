import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  /** Deklrasai state **/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm)||
      framework.details.developer.toLowerCase().includes(_searchTerm)||
      framework.details.developer.toLowerCase().includes(_searchTerm)||
      framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="p-8 bg-[#F5E6D3] min-h-screen font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search framework..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          name="selectedTag"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#FFFDF8] p-6 rounded-xl shadow-md border-2 border-[#D4A574] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Corner accent - scroll-like feel */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C75B39] rotate-45 transform origin-top-right -translate-y-12 translate-x-12 group-hover:translate-x-10 transition-transform"></div>
              <span className="absolute top-2 right-1 text-[10px] font-bold text-[#FFFDF8] rotate-45">
                {item.details.releaseYear}
              </span>
            </div>

            <div className="pr-12 mb-3">
              <h2 className="text-2xl font-bold text-[#2C1810] tracking-tight">
                {item.name}
              </h2>
            </div>

            <p className="text-[#5C4A42] mb-4 leading-relaxed text-sm">
              {item.description}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-[#8B7355]">Master</span>
              <span className="text-xs font-bold text-[#C75B39] bg-[#F5E6D3] px-3 py-1 rounded-full border border-[#D4A574]">
                {item.details.developer}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#E8D5C4] text-[#5C4A42] px-3 py-1 text-xs font-medium rounded-full border border-[#D4A574]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={item.details.officialWebsite}
              className="inline-block w-full text-center py-3 rounded-lg bg-[#C75B39] text-[#FFFDF8] font-bold hover:bg-[#A84830] transition-colors shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enter the Dojo →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
