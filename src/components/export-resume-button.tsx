"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Download } from "lucide-react";

interface ExportResumeButtonProps {
  resumeMarkdown: string;
}

export function ExportResumeButton({ resumeMarkdown }: ExportResumeButtonProps) {
  const handleExportPDF = () => {
    // Get the rendered HTML content
    const article = document.querySelector("#resume-content");
    if (!article) return;

    // Get computed styles from the current page
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (e) {
          return "";
        }
      })
      .join("\n");

    // Create a full HTML document with the resume content
    const printContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alex Kates - Resume</title>
        <style>
          ${styles}
          
          @page {
            size: portrait;
            margin: 0.75in;
          }
          
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            max-width: 100%; 
            margin: 0;
            padding: 0;
            line-height: 1.6;
          }
          
          @media print {
            body { 
              margin: 0; 
              padding: 0;
            }
          }
        </style>
      </head>
      <body>${article.innerHTML}</body>
      </html>
    `;

    // Create a hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Write content to iframe
    iframeDoc.open();
    iframeDoc.write(printContent);
    iframeDoc.close();

    // Wait for content to load, then print
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.print();
        // Remove iframe after printing
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 100);
      }, 100);
    };
  };

  const handleExportWord = () => {
    // Get the rendered HTML content
    const article = document.querySelector("#resume-content");
    if (!article) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Alex Kates - Resume</title></head>
      <body>${article.innerHTML}</body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "alex-kates-resume.doc";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportHTML = () => {
    // Get the rendered HTML content
    const article = document.querySelector("#resume-content");
    if (!article) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alex Kates - Resume</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
          h1 { font-size: 2rem; font-weight: 600; margin-bottom: 1.5rem; }
          h2 { font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; }
          h3 { font-size: 1.25rem; font-weight: 500; margin-top: 1.5rem; margin-bottom: 0.75rem; }
          p { margin: 1rem 0; }
          ul { margin-left: 1.5rem; }
          li { margin: 0.5rem 0; }
          a { color: #0066cc; text-decoration: underline; }
          hr { margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>${article.innerHTML}</body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "alex-kates-resume.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([resumeMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "alex-kates-resume.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export as
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF}>PDF</DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportWord}>Word</DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportHTML}>HTML</DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportMarkdown}>Markdown</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
