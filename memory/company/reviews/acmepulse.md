# Review themes — AcmePulse

- Corpus: `/Users/vachanbhogi/Desktop/intel/factory/fixtures/acmepulse_reviews.json`
- Model: `qwen/qwen3.8-27b`
- Clustered at: 2026-09-27T21:57:17+00:00
- Input reviews: 108 (used with text: 108)

## 1. Broken and Unreliable Export Functionality

- **id:** `broken-export-functionality`
- **kind:** bug
- **severity:** 5/5
- **review_count:** 15
- **candidate_action:** Prioritize fixing export bugs across all formats (CSV, Excel, PDF, PNG) and add robust error handling and retry logic.

Export features (CSV, Excel, PDF, PNG) are frequently broken, producing empty files, corrupted data, or failing silently. This is blocking critical workflows like finance handoffs and board packs.

### Evidence

- (1/5, `acmepulse-0011`) "CSV export is broken again — file downloads empty or truncates mid-row."
- (1/5, `acmepulse-0013`) "Export to Excel corrupts date columns. Unusable for our finance handoff."
- (1/5, `acmepulse-0015`) "PDF export cuts off the last chart every time. Been broken for weeks."
- (2/5, `acmepulse-0020`) "Export is the #1 reason my team wants to switch tools."

## 2. Missing Dark Mode

- **id:** `missing-dark-mode`
- **kind:** feature
- **severity:** 5/5
- **review_count:** 14
- **candidate_action:** Implement a system-wide dark mode toggle with high-contrast chart support.

Users are frustrated by the lack of a dark mode option, citing eye strain, accessibility issues, and competitor parity. Several users have cancelled or threatened to leave due to this missing feature.

### Evidence

- (1/5, `acmepulse-0001`) "Please add dark mode. After hours in the dashboard my eyes are fried."
- (2/5, `acmepulse-0002`) "No dark mode in 2026? Every competitor has it. Instant dealbreaker for night work."
- (1/5, `acmepulse-0007`) "White UI at 11pm is why I cancelled. Bring dark mode and I might return."
- (1/5, `acmepulse-0080`) "Dark mode or we leave at renewal."

## 3. Noisy and Uncontrollable Notification System

- **id:** `noisy-notification-system`
- **kind:** bug
- **severity:** 4/5
- **review_count:** 13
- **candidate_action:** Address: Noisy and Uncontrollable Notification System

Users are overwhelmed by excessive notifications, including duplicates, self-notifications, and digests that cannot be fully muted. Notification settings are often ineffective or reset.

### Evidence

- (1/5, `acmepulse-0021`) "Notifications are insanely noisy. I get pinged for every tiny status change."
- (2/5, `acmepulse-0025`) "Notification preferences look like they work but resets every login."

## 4. Mobile experience is incomplete and lags behind desktop

- **id:** `mobile-experience-lag`
- **kind:** bug
- **severity:** 4/5
- **review_count:** 5
- **candidate_action:** Prioritize parity for mobile filters and improve overall mobile UI/UX performance.

Multiple users report that the mobile app feels 'half-baked' or 'rough,' specifically citing lagging filters and a poor overall experience compared to the desktop version.

### Evidence

- (5/5, `acmepulse-0099`) "filters lag behind"
- (3/5, `acmepulse-0102`) "Fix notifications and mobile filters"
- (2/5, `acmepulse-0104`) "execution on export and mobile is rough"
- (3/5, `acmepulse-0105`) "not because of the mobile experience"
- (4/5, `acmepulse-0106`) "Mobile still feels half-baked"

## 5. CSV export is unreliable and inconsistent

- **id:** `export-reliability-issues`
- **kind:** bug
- **severity:** 4/5
- **review_count:** 3
- **candidate_action:** Audit and fix CSV export logic to ensure consistent and reliable data output.

Users are frustrated by inconsistent CSV export functionality, which is preventing them from giving higher ratings and causing workflow friction.

### Evidence

- (3/5, `acmepulse-0101`) "export reliability"
- (2/5, `acmepulse-0104`) "execution on export"
- (2/5, `acmepulse-0108`) "if CSV export worked consistently"

## 6. Lack of dark mode support

- **id:** `missing-dark-mode`
- **kind:** feature
- **severity:** 3/5
- **review_count:** 2
- **candidate_action:** Implement a dark mode theme option for the application.

Users explicitly request dark mode, noting its absence as a primary reason for withholding higher ratings.

### Evidence

- (3/5, `acmepulse-0101`) "missing dark mode"
- (4/5, `acmepulse-0103`) "dark mode would make me a raving fan"
