// --- Phản hồi cho 2 chế độ ---
const voiceCompliments = [
  "Bé đọc rất hay và rõ ràng luôn 🎉",
  "Tốt lắm! Giọng bé dễ thương ghê 😄",
  "Chữ nào cũng rõ, bé giỏi quá 👏",
  "Cố lên nha, bé đọc giỏi thêm từng ngày 🌟",
  "Rất tốt, chỉ cần chậm lại một chút thôi 🐢",
  "Thỏ rất tự hào về bé đó 🐰💖",
  "Bé đọc giỏi như thỏ nhảy nhanh luôn 🥕",
  "Tuyệt vời! Bé khiến Thỏ mỉm cười rồi nè 😊",
];

const voiceCorrections = [
  "Thử đọc lại nhé, phát âm chữ 'ch' cho rõ hơn nha 👂",
  "Có vài chỗ hơi nhanh, bé chậm lại một chút nè ⏳",
  "Thiếu dấu nhẹ thôi, nhưng bé làm rất tốt 💪",
  "Cố gắng lên, mỗi lần đọc lại là tiến bộ thêm 🎯",
  "Hôm nay bé đọc 95% chính xác rồi đó 🐇✨",
  "Thỏ nghe hơi lẫn chữ 'r' và 'd' đó, thử lại nha 💬",
  "Bé sắp hoàn hảo rồi, chỉ cần chỉnh tí xíu thôi 🌸",
];

const textCompliments = [
  "Bé viết câu rất mạch lạc luôn 📝",
  "Diễn đạt tốt lắm, ý rõ ràng ghê 👏",
  "Từ ngữ bé chọn rất hay 🌸",
  "Câu văn tự nhiên và dễ hiểu lắm 🌿",
  "Thỏ thích cách bé viết nè 🐰💖",
  "Cấu trúc câu rất ổn, bé làm tốt đó 😄",
  "Bé viết có cảm xúc ghê đó ✨",
  "Đọc đoạn này mà Thỏ thấy vui luôn 💕",
];

const textCorrections = [
  "Thỏ thấy có vài lỗi chính tả nhỏ, bé thử xem lại nhé ✏️",
  "Bé thêm dấu câu sẽ hay hơn đó 📚",
  "Câu hơi dài chút, chia nhỏ sẽ dễ hiểu hơn nè 🌼",
  "Thử dùng thêm từ nối cho mạch văn trôi chảy hơn nha 💬",
  "Ý bé hay lắm, chỉ cần chỉnh vài chữ thôi 🎯",
  "Bé đang tiến bộ rõ luôn, cố lên nhé 💪",
];

// --- Lấy phần tử DOM ---
const voiceModeBtn = document.getElementById("voiceMode");
const textModeBtn = document.getElementById("textMode");
const voiceSection = document.getElementById("voiceSection");
const textSection = document.getElementById("textSection");
const startVoiceBtn = document.getElementById("startVoice");
const checkTextBtn = document.getElementById("checkText");
const voiceFeedback = document.getElementById("voiceFeedback");
const textFeedback = document.getElementById("textFeedback");
const textInput = document.getElementById("textInput");
const voiceProgressContainer = document.getElementById("voiceProgressContainer");
const textProgressContainer = document.getElementById("textProgressContainer");
const voiceProgressBar = document.getElementById("voiceProgressBar");
const textProgressBar = document.getElementById("textProgressBar");

// --- Giọng nữ tiếng Việt ---
let vietnameseFemale = null;
speechSynthesis.onvoiceschanged = () => {
  const voices = speechSynthesis.getVoices();
  vietnameseFemale = voices.find(
    (v) =>
      v.lang.startsWith("vi") &&
      (v.name.toLowerCase().includes("female") ||
       v.name.toLowerCase().includes("viet") ||
       v.name.toLowerCase().includes("google"))
  );
  console.log("🎤 Đã tải giọng:", vietnameseFemale?.name || "Không tìm thấy giọng Việt");
};

function speak(text) {
  const utter = new SpeechSynthesisUtterance(
    text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
  );
  utter.lang = "vi-VN";
  utter.rate = 1.0;
  utter.pitch = 1.2;
  if (vietnameseFemale) utter.voice = vietnameseFemale;
  speechSynthesis.speak(utter);
}

// --- Chuyển chế độ ---
voiceModeBtn.onclick = () => {
  voiceSection.classList.remove("hidden");
  textSection.classList.add("hidden");
  resetProgress();
};
textModeBtn.onclick = () => {
  textSection.classList.remove("hidden");
  voiceSection.classList.add("hidden");
  resetProgress();
};

// --- Hiển thị thanh tiến độ ---
function showProgress(bar, container, callback) {
  container.classList.remove("hidden");
  bar.style.width = "0";
  setTimeout(() => (bar.style.width = "100%"), 100);
  setTimeout(() => {
    callback();
    bar.style.width = "0";
    container.classList.add("hidden");
  }, 2000);
}

function resetProgress() {
  voiceProgressContainer.classList.add("hidden");
  textProgressContainer.classList.add("hidden");
  voiceFeedback.textContent = "";
  textFeedback.textContent = "";
}

// --- Chế độ GIỌNG NÓI ---
startVoiceBtn.onclick = () => {
  voiceFeedback.textContent = "🎙️ Thỏ đang lắng nghe...";
  showProgress(voiceProgressBar, voiceProgressContainer, () => {
    const feedback =
      Math.random() > 0.5
        ? voiceCompliments[Math.floor(Math.random() * voiceCompliments.length)]
        : voiceCorrections[Math.floor(Math.random() * voiceCorrections.length)];
    voiceFeedback.textContent = feedback;
    speak(feedback);
  });
};

// --- Chế độ GÕ VĂN BẢN ---
checkTextBtn.onclick = () => {
  const text = textInput.value.trim();
  if (!text) {
    textFeedback.textContent = "Bé chưa nhập gì hết nè 🧐";
    speak("Bé chưa nhập gì hết nè");
    return;
  }
  textFeedback.textContent = "🤖 Thỏ đang kiểm tra...";
  showProgress(textProgressBar, textProgressContainer, () => {
    const score = Math.floor(80 + Math.random() * 20);
    const feedback =
      (Math.random() > 0.5
        ? textCompliments[Math.floor(Math.random() * textCompliments.length)]
        : textCorrections[Math.floor(Math.random() * textCorrections.length)]) +
      ` Bé đạt ${score}% chính xác đó 🎯`;
    textFeedback.textContent = feedback;
    speak(feedback);
  });
};
