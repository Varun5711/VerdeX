"use client";

import { useState } from "react";
import { Factory, MapPin, Settings, Eye, Edit, Trash2, Search, Filter } from "lucide-react";

interface Facility {
  _id: string;
  name: string;
  location?: {
    country?: string;
    region?: string;
  };
  tech?: {
    electrolyzerType?: string;
    capacityMW?: string;
    renewableSource?: string;
  };
  createdAt?: number;
}

interface FacilitiesTableProps {
  facilities: Facility[];
  onView?: (facility: Facility) => void;
  onEdit?: (facility: Facility) => void;
  onDelete?: (facility: Facility) => void;
}

export default function FacilitiesTable({ 
  facilities, 
  onView, 
  onEdit, 
  onDelete 
}: FacilitiesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Facility>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter facilities based on search term
  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.location?.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.location?.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort facilities
  const sortedFacilities = [...filteredFacilities].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column: keyof Facility) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Table Header with Search and Filters */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">Facilities</h3>
            <p className="text-gray-400 text-sm">
              {filteredFacilities.length} of {facilities.length} facilities
            </p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search facilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>
            
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Filter size={16} className="text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">
                  <Factory size={14} />
                  Facility Name
                  {sortBy === "name" && (
                    <span className="text-green-400">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors"
                onClick={() => handleSort("location")}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  Location
                  {sortBy === "location" && (
                    <span className="text-green-400">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Technology
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sortedFacilities.length > 0 ? (
              sortedFacilities.map((facility) => (
                <tr key={facility._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                        <Factory size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{facility.name}</div>
                        <div className="text-sm text-gray-400">ID: {facility._id.slice(-8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={14} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-white">
                          {facility.location?.region || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-400">
                          {facility.location?.country || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {facility.tech?.capacityMW ? `${facility.tech.capacityMW} MW` : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {facility.tech?.electrolyzerType || "N/A"}
                    </div>
                    <div className="text-sm text-gray-400">
                      {facility.tech?.renewableSource || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(facility.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(facility)}
                          className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(facility)}
                          className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded transition-colors"
                          title="Edit facility"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(facility)}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                          title="Delete facility"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Factory className="text-gray-500" size={48} />
                    <div>
                      <p className="text-gray-400 font-medium">No facilities found</p>
                      <p className="text-gray-500 text-sm">
                        {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first facility"}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}