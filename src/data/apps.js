import {
  Monitor,
  ImageIcon,
  FileText,
  Crosshair,
  Terminal,
  Cpu
} from "lucide-react";

export const APPS_DATA = [
  {
  id: "yt2-downloader",
  name: "YT2 Downloader",
  description: "Công cụ tải video YouTube thông qua đường dẫn.",
  version: "v1.0.0",
  size: "28MB",
  os: "Windows 10/11",
  screenshot: "/assets/yt2.png",
  downloadUrl: "https://github.com/TranXuanTruong-BTEC/media-desktop-app/releases/latest/download/MediaDesktopApp-Setup.exe",
  features: [
    "Tải video chất lượng cao",
    "Hỗ trợ tải MP3",
    "Không quảng cáo",
    "Không thu thập dữ liệu",
    "Nhẹ và dễ sử dụng" ]
  },
  {
    id: "image-resizer-bulk",
    name: "Image Resizer Bulk",
    os: "Windows",
    description: "Resize ảnh hàng loạt cực nhanh.",
    icon: ImageIcon,
    color: "from-purple-500 to-pink-500",
    downloadUrl: "",
    isComingSoon: true
  }
];