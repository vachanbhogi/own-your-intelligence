# Review tickets — AcmePulse

- Themes: `/Users/vachanbhogi/Desktop/intel/factory/data/themes_acmepulse.json`
- Model: `qwen/qwen3.8-27b`
- Minted at: 2026-09-27T22:22:51+00:00
- Input themes: 6 → tickets: 4

## 1. Unreliable Data Export Functionality

- **id:** `broken-export-functionality`
- **type:** problem
- **priority:** 5/5
- **review_count:** 15

**Statement:** Export features for CSV, Excel, PDF, and PNG frequently produce empty, corrupted, or truncated files, blocking critical workflows like finance handoffs and board packs.

**Why it matters:** This reliability issue is the primary driver for users considering switching to competitor tools.

### Evidence

- (1/5, `acmepulse-0011`) "CSV export is broken again — file downloads empty or truncates mid-row."
- (1/5, `acmepulse-0013`) "Export to Excel corrupts date columns. Unusable for our finance handoff."
- (1/5, `acmepulse-0015`) "PDF export cuts off the last chart every time. Been broken for weeks."
- (2/5, `acmepulse-0020`) "Export is the #1 reason my team wants to switch tools."
- (3/5, `acmepulse-0101`) "export reliability"
- (2/5, `acmepulse-0104`) "execution on export"
- (2/5, `acmepulse-0108`) "if CSV export worked consistently"

## 2. System-Wide Dark Mode Support

- **id:** `missing-dark-mode`
- **type:** feature
- **priority:** 5/5
- **review_count:** 14

**Statement:** The application lacks a dark mode option, causing eye strain for users working late and creating a competitive disadvantage against other tools.

**Why it matters:** The absence of this feature is directly linked to user cancellations and threats to leave at renewal.

### Evidence

- (1/5, `acmepulse-0001`) "Please add dark mode. After hours in the dashboard my eyes are fried."
- (2/5, `acmepulse-0002`) "No dark mode in 2026? Every competitor has it. Instant dealbreaker for night work."
- (1/5, `acmepulse-0007`) "White UI at 11pm is why I cancelled. Bring dark mode and I might return."
- (1/5, `acmepulse-0080`) "Dark mode or we leave at renewal."
- (3/5, `acmepulse-0101`) "missing dark mode"
- (4/5, `acmepulse-0103`) "dark mode would make me a raving fan"

## 3. Uncontrollable and Noisy Notifications

- **id:** `noisy-notification-system`
- **type:** problem
- **priority:** 4/5
- **review_count:** 13

**Statement:** The notification system sends excessive, duplicate, or self-notifications, and user preferences often fail to persist or reset upon login.

**Why it matters:** Users are overwhelmed by the noise, which disrupts their workflow and reduces trust in the platform's settings.

### Evidence

- (1/5, `acmepulse-0021`) "Notifications are insanely noisy. I get pinged for every tiny status change."
- (2/5, `acmepulse-0025`) "Notification preferences look like they work but resets every login."

## 4. Mobile experience is incomplete and lags behind desktop

- **id:** `mobile-experience-lag`
- **type:** problem
- **priority:** 4/5
- **review_count:** 5

**Statement:** Customers experience: Multiple users report that the mobile app feels 'half-baked' or 'rough,' specifically citing lagging filters and a poor overall experience compared to the desktop version.

**Why it matters:** Multiple users report that the mobile app feels 'half-baked' or 'rough,' specifically citing lagging filters and a poor overall experience compared to the desktop version.

### Evidence

- (5/5, `acmepulse-0099`) "filters lag behind"
- (3/5, `acmepulse-0102`) "Fix notifications and mobile filters"
- (2/5, `acmepulse-0104`) "execution on export and mobile is rough"
- (3/5, `acmepulse-0105`) "not because of the mobile experience"
- (4/5, `acmepulse-0106`) "Mobile still feels half-baked"
