export async function getLatestVersion() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/TranXuanTruong-BTEC/media-desktop-app/releases/latest"
    );
    const data = await res.json();

    return data.tag_name;
  } catch (err) {
    return "N/A";
  }
}