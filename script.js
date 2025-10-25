// ============================================
// DARK MODE TOGGLE
// ============================================
function toggleDarkMode() {
  try {
    const html = document.documentElement;
    if (!html) {
      console.error("HTML element not found");
      return;
    }
    html.classList.toggle("dark-mode");
    const isDarkMode = html.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode.toString());
  } catch (error) {
    console.error("Error toggling dark mode:", error);
  }
}

function initDarkMode() {
  try {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      const html = document.documentElement;
      if (html) {
        html.classList.add("dark-mode");
      }
    }
  } catch (error) {
    console.error("Error initializing dark mode:", error);
  }
}

// ============================================
// ACCESSIBILITY MENU
// ============================================
function toggleAccessibilityMenu() {
  try {
    const dropdown = document.getElementById("accessibilityDropdown");
    if (!dropdown) {
      console.error("Accessibility dropdown not found");
      return;
    }
    dropdown.classList.toggle("active");
  } catch (error) {
    console.error("Error toggling accessibility menu:", error);
  }
}

document.addEventListener("click", function (event) {
  try {
    const menu = document.querySelector(".accessibility-menu");
    const dropdown = document.getElementById("accessibilityDropdown");

    if (!menu || !dropdown) return;

    if (!menu.contains(event.target) && dropdown.classList.contains("active")) {
      dropdown.classList.remove("active");
    }
  } catch (error) {
    console.error("Error in click-outside handler:", error);
  }
});

// ============================================
// SCROLL FUNCTIONS
// ============================================
function scrollToTop() {
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error scrolling to top:", error);
  }
}

function scrollToBottom() {
  try {
    const bodyHeight = document.body.scrollHeight;
    if (bodyHeight) {
      window.scrollTo({ top: bodyHeight, behavior: "smooth" });
    }
  } catch (error) {
    console.error("Error scrolling to bottom:", error);
  }
}

function scrollToNextSection() {
  try {
    const sections = document.querySelectorAll("section");
    if (!sections || sections.length === 0) {
      scrollToBottom();
      return;
    }

    const currentScroll = window.scrollY;
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      if (sectionTop > currentScroll + 100) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    scrollToBottom();
  } catch (error) {
    console.error("Error scrolling to next section:", error);
    scrollToBottom();
  }
}

window.addEventListener("scroll", function () {
  try {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (!scrollTopBtn) return;

    if (window.scrollY > 200) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  } catch (error) {
    console.error("Error in scroll event listener:", error);
  }
});

// ============================================
// MOBILE MENU
// ============================================
function toggleMenu() {
  try {
    const navMenu = document.querySelector(".nav-menu");
    if (!navMenu) {
      console.error("Navigation menu not found");
      return;
    }
    navMenu.classList.toggle("active");
  } catch (error) {
    console.error("Error toggling menu:", error);
  }
}

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    try {
      const navMenu = document.querySelector(".nav-menu");
      if (navMenu) {
        navMenu.classList.remove("active");
      }
    } catch (error) {
      console.error("Error closing menu on link click:", error);
    }
  });
});

// ============================================
// ACCORDION
// ============================================
function toggleAccordion(header) {
  try {
    if (!header) {
      console.error("Header element not provided");
      return;
    }

    const content = header.nextElementSibling;
    if (!content) {
      console.error("Accordion content not found");
      return;
    }

    const isActive = content.classList.contains("active");

    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item) {
        item.classList.remove("active");
      }
    });
    document.querySelectorAll(".accordion-header").forEach((item) => {
      if (item) {
        item.classList.remove("active");
      }
    });

    if (!isActive) {
      content.classList.add("active");
      header.classList.add("active");
    }
  } catch (error) {
    console.error("Error toggling accordion:", error);
  }
}

// ============================================
// CHAT FUNCTIONALITY
// ============================================
const faqDatabase = {
  passport_eligibility: {
    keywords: ["eligible", "apply", "who can", "requirement", "citizen"],
    response:
      "Only a Filipino citizen is eligible to acquire a Philippine passport. To apply, you need to set an appointment at passport.gov.ph and bring the complete set of requirements appropriate to your application type.",
  },
  passport_appointment: {
    keywords: ["appointment", "book", "schedule", "slot", "available"],
    response:
      "You can set an online appointment via passport.gov.ph. All appointments are free. If you don't see available slots, please refresh the page as appointments become available from time to time.",
  },
  passport_processing_time: {
    keywords: ["processing", "how long", "days", "release", "ready"],
    response:
      "For NCR applicants: Regular processing takes 10 working days, Expedited takes 5 working days. For applicants outside NCR: Regular takes 12 working days, Expedited takes 7 working days.",
  },
  passport_fees: {
    keywords: ["fee", "cost", "price", "how much", "payment"],
    response:
      "Passport fees: Regular Processing - PHP 950.00, Expedited Processing - PHP 1,200.00, Penalty for Lost/Mutilated ePassport - PHP 350.00.",
  },
  passport_validity: {
    keywords: ["validity", "valid", "years", "expire", "expiration"],
    response:
      "Philippine passports issued to Filipinos 18 years or older are valid for 10 years. For Filipinos under 18 years at the time of application, the passport is valid for 5 years.",
  },
};

function openChatModal() {
  try {
    const modal = document.getElementById("chatModal");
    if (!modal) {
      console.error("Chat modal not found");
      return;
    }
    modal.classList.add("active");

    const input = document.getElementById("chatInput");
    if (input && typeof input.focus === "function") {
      input.focus();
    }
  } catch (error) {
    console.error("Error opening chat modal:", error);
  }
}

function closeChatModal() {
  try {
    const modal = document.getElementById("chatModal");
    if (!modal) {
      console.error("Chat modal not found");
      return;
    }
    modal.classList.remove("active");
  } catch (error) {
    console.error("Error closing chat modal:", error);
  }
}

function sendMessage() {
  try {
    const input = document.getElementById("chatInput");
    if (!input) {
      console.error("Chat input not found");
      return;
    }

    const message = input.value.trim();
    if (message === "") {
      return;
    }

    addMessage(message, "user");
    input.value = "";

    setTimeout(() => {
      const botResponse = getBotResponse(message);
      addMessage(botResponse, "bot");
    }, 500);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

function getBotResponse(userMessage) {
  try {
    if (!userMessage || typeof userMessage !== "string") {
      return "I'm here to help with Philippine passport information! You can ask me about eligibility, application process, fees, processing times, or any other passport-related questions.";
    }

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, faq] of Object.entries(faqDatabase)) {
      if (faq && faq.keywords && Array.isArray(faq.keywords)) {
        if (faq.keywords.some((keyword) => lowerMessage.includes(keyword))) {
          return faq.response || "I'm here to help!";
        }
      }
    }
    return "I'm here to help with Philippine passport information! You can ask me about eligibility, application process, fees, processing times, or any other passport-related questions.";
  } catch (error) {
    console.error("Error getting bot response:", error);
    return "I'm here to help with Philippine passport information! You can ask me about eligibility, application process, fees, processing times, or any other passport-related questions.";
  }
}

function addMessage(text, sender) {
  try {
    const chatMessages = document.getElementById("chatMessages");
    if (!chatMessages) {
      console.error("Chat messages container not found");
      return;
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);

    // Auto-scroll to latest message
    if (typeof chatMessages.scrollTop !== "undefined") {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  } catch (error) {
    console.error("Error adding message:", error);
  }
}

function handleKeyPress(event) {
  try {
    if (!event) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  } catch (error) {
    console.error("Error handling key press:", error);
  }
}

document.addEventListener("click", function (event) {
  try {
    const modal = document.getElementById("chatModal");
    const button = document.querySelector(".floating-chatbot");

    if (!modal || !button) return;

    if (
      !modal.contains(event.target) &&
      !button.contains(event.target) &&
      modal.classList.contains("active")
    ) {
      closeChatModal();
    }
  } catch (error) {
    console.error("Error in chat modal click-outside handler:", error);
  }
});

// ============================================
// INITIALIZATION
// ============================================
window.addEventListener("DOMContentLoaded", initDarkMode);
