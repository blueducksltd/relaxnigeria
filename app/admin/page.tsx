import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import GalleryItem from "@/models/GalleryItem";
import MemberManagement from "@/components/MemberManagement";
import {
  Calendar,
  Image as ImageIcon,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const userRole = (session.user as any).role;
  if (userRole !== "admin" && userRole !== "super-admin") {
    redirect("/login");
  }
  await dbConnect();

  // Get counts
  const eventCount = await Event.countDocuments();
  const galleryCount = await GalleryItem.countDocuments();

  // Real count for demonstration, usually we'd have a User model or similar
  const adminCount = await (await import("@/models/Admin")).default.countDocuments();

  const stats = [
    { name: "Total Events", value: eventCount, icon: Calendar, color: "bg-blue-500" },
    { name: "Gallery Items", value: galleryCount, icon: ImageIcon, color: "bg-lightgreen" },
    { name: "System Admins", value: adminCount, icon: Users, color: "bg-darkgreen" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-darkgreen font-laybar">Welcome Back, Admin</h2>
        <p className="text-darkgreen/60 mt-2">Here's what's happening with Relax Nigeria today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-darkgreen/5 flex items-center gap-6">
            <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center text-white shrink-0`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs text-darkgreen/50 font-medium uppercase tracking-wider">{stat.name}</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-darkgreen mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity or Quick Actions */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-darkgreen/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-darkgreen font-laybar flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Quick Actions
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/admin/events" className="p-4 bg-milk rounded-xl hover:bg-lightgreen transition-all text-center group flex items-center sm:flex-col justify-center gap-3 sm:gap-2">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-darkgreen/50 group-hover:text-darkgreen" />
              <p className="font-bold text-darkgreen">Add Event</p>
            </a>
            <a href="/admin/gallery" className="p-4 bg-milk rounded-xl hover:bg-lightgreen transition-all text-center group flex items-center sm:flex-col justify-center gap-3 sm:gap-2">
              <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-darkgreen/50 group-hover:text-darkgreen" />
              <p className="font-bold text-darkgreen">Add Photo</p>
            </a>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-darkgreen p-6 sm:p-8 rounded-2xl shadow-xl text-milk">
          <h3 className="text-lg sm:text-xl font-bold font-laybar mb-6 flex items-center gap-2 text-lightgreen">
            <TrendingUp className="w-6 h-6" />
            System Performance
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span>Database Connection</span>
                <span className="text-lightgreen">Healthy</span>
              </div>
              <div className="h-2 bg-milk/10 rounded-full overflow-hidden">
                <div className="h-full bg-lightgreen w-[95%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span>Cloud Storage (Blob)</span>
                <span className="text-lightgreen">Connected</span>
              </div>
              <div className="h-2 bg-milk/10 rounded-full overflow-hidden">
                <div className="h-full bg-lightgreen w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
