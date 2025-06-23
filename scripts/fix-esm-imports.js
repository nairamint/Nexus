#!/usr/bin/env node

/**
 * ESM Import Fixer
 * 
 * This script automatically adds .js extensions to relative import and export statements
 * in TypeScript files, which is necessary for ES module compatibility with
 * NodeNext module resolution.
 * 
 * Usage: node scripts/fix-esm-imports.js [--verbose]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const rootDir = path.resolve(__dirname, '../src');
const verbose = process.argv.includes('--verbose');

// Regular expressions for finding import and export statements
// These handle paths with separators (e.g., './path/to/module')
const importRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"](\.\.\/|\.\/)([\w\/\-_]+)['"]/g;
const exportRegex = /export\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"](\.\.\/|\.\/)([\w\/\-_]+)['"]/g;

// These handle imports without path separators (e.g., './types', '../types')
const importRelativeRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"](\.\.\/|\.\/)(\w+)['"]/g;
const importLocalRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"](\w+)['"]/g;
const exportRelativeRegex = /export\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"](\.\.\/|\.\/)(\w+)['"]/g;
const exportLocalRegex = /export\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"](\w+)['"]/g;

// Function to check if a path already has a .js extension
function hasJsExtension(path) {
  return path.endsWith('.js');
}

// Function to add .js extension to import/export paths if needed
function addJsExtension(match, prefix, importPath) {
  // If the path already has a .js extension or ends with .json, don't modify it
  if (hasJsExtension(importPath) || importPath.endsWith('.json')) {
    return match;
  }
  
  // Remove any existing duplicate .js extensions
  if (importPath.includes('.js.js')) {
    importPath = importPath.replace(/\.js\.js+/g, '');
  }
  
  // Add .js extension
  return match.replace(`${prefix}${importPath}`, `${prefix}${importPath}.js`);
}

// Function to process a TypeScript file
function processFile(filePath) {
  if (verbose) {
    console.log(`Processing ${filePath}...`);
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix imports and exports with path separators
    content = content.replace(importRegex, (match, prefix, importPath) => {
      return addJsExtension(match, prefix, importPath);
    });
    
    content = content.replace(exportRegex, (match, prefix, importPath) => {
      return addJsExtension(match, prefix, importPath);
    });
    
    // Fix imports and exports without path separators
    content = content.replace(importRelativeRegex, (match, prefix, importPath) => {
      return addJsExtension(match, prefix, importPath);
    });
    
    content = content.replace(exportRelativeRegex, (match, prefix, importPath) => {
      return addJsExtension(match, prefix, importPath);
    });
    
    // Fix any duplicate .js extensions
    content = content.replace(/\.js\.js+/g, '.js');
    
    // Only write to the file if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      if (verbose) {
        console.log(`Updated ${filePath}`);
      }
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Function to recursively process all TypeScript files in a directory
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  let processedFiles = 0;
  let modifiedFiles = 0;
  let fixedImports = 0;
  
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      const stats = processDirectory(entryPath);
      processedFiles += stats.processedFiles;
      modifiedFiles += stats.modifiedFiles;
      fixedImports += stats.fixedImports;
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) && !entry.name.endsWith('.d.ts')) {
      processedFiles++;
      
      const originalContent = fs.readFileSync(entryPath, 'utf8');
      const wasModified = processFile(entryPath);
      
      if (wasModified) {
        modifiedFiles++;
        
        // Count the number of fixed imports
        const newContent = fs.readFileSync(entryPath, 'utf8');
        const importMatches = (originalContent.match(importRegex) || []).length + 
                             (originalContent.match(exportRegex) || []).length +
                             (originalContent.match(importRelativeRegex) || []).length +
                             (originalContent.match(exportRelativeRegex) || []).length;
                             
        const newImportMatches = (newContent.match(importRegex) || []).length + 
                               (newContent.match(exportRegex) || []).length +
                               (newContent.match(importRelativeRegex) || []).length +
                               (newContent.match(exportRelativeRegex) || []).length;
                               
        // This is a rough estimate of fixed imports
        fixedImports += Math.abs(newImportMatches - importMatches);
      }
    }
  }
  
  return { processedFiles, modifiedFiles, fixedImports };
}

// Main execution
console.log(`Fixing ESM imports in ${rootDir}...`);
const stats = processDirectory(rootDir);
console.log(`Processed ${stats.processedFiles} files, modified ${stats.modifiedFiles} files, fixed ${stats.fixedImports} import statements.`);