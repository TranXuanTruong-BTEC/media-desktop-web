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
    id: 1,
    name: "YT2 Downloader",
    os: "Windows",
    description: "Công cụ tải video YT thông qua đường dẫn.",
    icon: Monitor,
    color: "from-blue-500 to-cyan-400",
    downloadUrl:
      "https://github.com/TranXuanTruong-BTEC/media-desktop-app/releases/latest/download/MediaDesktopApp-Setup.exe"
  },
  {
    id: 2,
    name: "Image Resizer Bulk",
    os: "Windows",
    description: "Resize ảnh hàng loạt cực nhanh.",
    icon: ImageIcon,
    color: "from-purple-500 to-pink-500",
    downloadUrl: "",
    isComingSoon: true
  }
];