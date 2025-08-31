"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

interface DocumentUploadData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  batchId?: string;
  facilityId?: string;
  documentType: string;
  expiryDate?: string;
  blockchainHash?: string;
}

interface UploadedFile {
  file: File;
  hash: string;
  size: number;
  type: string;
  preview?: string;
}

const DOCUMENT_CATEGORIES = [
  "Production Data",
  "Quality Assurance",
  "Environmental Compliance",
  "Safety Documentation",
  "Technical Specifications",
  "Audit Reports",
  "Certification",
  "Other"
];

const DOCUMENT_TYPES = [
  "PDF",
  "Image",
  "Spreadsheet",
  "Text Document",
  "CAD Drawing",
  "Video",
  "Audio",
  "Other"
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export default function DocumentUpload({ 
  orgId, 
  batchId, 
  facilityId, 
  onSuccess 
}: { 
  orgId: string; 
  batchId?: string; 
  facilityId?: string; 
  onSuccess?: () => void; 
}) {
  const { user } = useUser();
  const { address } = useAccount();
  const createDocument = useMutation(api.docs.create);
  
  const [formData, setFormData] = useState<DocumentUploadData>({
    title: "",
    description: "",
    category: "",
    tags: [],
    batchId: batchId || "",
    facilityId: facilityId || "",
    documentType: "",
    expiryDate: "",
    blockchainHash: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [tagInput, setTagInput] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateFileHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hash = ethers.keccak256(new Uint8Array(buffer));
    return hash;
  };

  const handleFileUpload = async (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    for (const file of Array.from(files)) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError(`File ${file.name} is too large. Maximum size is 50MB.`);
        continue;
      }

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError(`File type ${file.type} is not supported.`);
        continue;
      }

      try {
        const hash = await generateFileHash(file);
        const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
        
        newFiles.push({
          file,
          hash,
          size: file.size,
          type: file.type,
          preview
        });
      } catch (err) {
        setError(`Failed to process file ${file.name}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setError(null);
    }
  };

  const removeFile = (index: number) => {
    const file = uploadedFiles[index];
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateBlockchainHash = () => {
    if (uploadedFiles.length === 0) {
      setError("No files uploaded to generate hash");
      return;
    }

    const fileHashes = uploadedFiles.map(f => f.hash).sort();
    const combinedHash = ethers.keccak256(ethers.toUtf8Bytes(fileHashes.join('')));
    setFormData(prev => ({ ...prev, blockchainHash: combinedHash }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !address) {
      setError("Please connect your wallet and sign in");
      return;
    }

    if (uploadedFiles.length === 0) {
      setError("Please upload at least one file");
      return;
    }

    if (!formData.title.trim()) {
      setError("Document title is required");
      return;
    }

    if (!formData.category) {
      setError("Please select a document category");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create document records for each uploaded file
      for (const uploadedFile of uploadedFiles) {
        await createDocument({
          clerkUserId: user.id,
          orgId: orgId as any,
          batchId: formData.batchId as any,
          facilityId: formData.facilityId as any,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          tags: formData.tags,
          documentType: uploadedFile.type,
          fileName: uploadedFile.file.name,
          fileSize: uploadedFile.size,
          fileHash: uploadedFile.hash,
          blockchainHash: formData.blockchainHash || uploadedFile.hash,
          expiryDate: formData.expiryDate ? new Date(formData.expiryDate).getTime() : undefined,
        });
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        tags: [],
        batchId: batchId || "",
        facilityId: facilityId || "",
        documentType: "",
        expiryDate: "",
        blockchainHash: "",
      });

      // Clean up uploaded files
      uploadedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      setUploadedFiles([]);

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload documents");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof DocumentUploadData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Upload Documents</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Document Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Document Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Q1 Production Report"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select Category</option>
                {DOCUMENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe the document content and purpose..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Type a tag and press Enter to add..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blockchain Hash
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.blockchainHash}
                  onChange={(e) => handleInputChange("blockchainHash", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                  placeholder="0x... (auto-generated)"
                  readOnly
                />
                <button
                  type="button"
                  onClick={generateBlockchainHash}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">File Upload</h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF, images, spreadsheets, and text files up to 50MB
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Select Files
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ALLOWED_FILE_TYPES.join(',')}
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Uploaded Files</h3>
            
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {file.preview ? (
                      <img src={file.preview} alt="Preview" className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} • {file.type}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        Hash: {file.hash.slice(0, 16)}...
                      </p>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wallet Connection Status */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Wallet Status:</span>
            <span className={`text-sm font-medium ${address ? 'text-green-600' : 'text-red-600'}`}>
              {address ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected'}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !address || uploadedFiles.length === 0}
            className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${
              isSubmitting || !address || uploadedFiles.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500'
            }`}
          >
            {isSubmitting ? 'Uploading...' : `Upload ${uploadedFiles.length} Document${uploadedFiles.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </form>
    </div>
  );
}
