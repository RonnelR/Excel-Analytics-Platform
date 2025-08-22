import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, LayoutDashboard, FileText } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Name</h2>
        <nav className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer">
            <UploadCloud size={20} /> Upload New File
          </div>
          <div className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer">
            <FileText size={20} /> Uploaded Files
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold">Welcome back, Keshav</h1>
        <p className="text-gray-600 mb-6">Here's a quick overview of your data.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-medium">0</h2>
              <p className="text-gray-600">Uploaded Files</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-medium">7</h2>
              <p className="text-gray-600">Different Charts</p>
            </CardContent>
          </Card>
        </div>

        <section>
          <h2 className="text-xl font-medium mb-4">Your Recent Files:</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 mb-4">No files found.</p>
            <Button variant="outline" className="flex items-center gap-2">
              <UploadCloud size={18} /> Upload File
            </Button>
          </div>
        </section>

        <footer className="mt-10 text-center text-gray-500">
          © Copyright 2025. Designed by Rajpara
        </footer>
      </main>
    </div>
  );
}
