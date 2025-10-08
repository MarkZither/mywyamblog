# Heart Surgery Series Day Numbering Fix Summary

## Problem Identified
The heart surgery recovery blog posts had inconsistent day numbering, treating the surgery day as both Day 0 and Day 1, resulting in gaps and confusion.

## Consistent Naming Strategy Defined
- **Day 0**: Surgery day - Thursday, 3rd October (evening post-op)
- **Day 1**: First full day - Friday, 4th October  
- **Day 2**: Saturday, 5th October
- **Day 3**: Sunday, 6th October
- **Day 4**: Monday, 7th October (moving to normal ward)
- **Day 5**: Tuesday, 8th October (first full day on normal ward)

## Fixes Applied to Main Repository

### 1. Fixed date error in day-2-post-surgery-recovery.md
- **Issue**: Body text said "Saturday and Sunday, 4th-5th October"
- **Fix**: Changed to "Saturday and Sunday, 5th-6th October"
- **Files**: Both Statiq and Docusaurus versions

### 2. Renamed and retitled day-5 post to day-4
- **Issue**: Post dated Oct 7 was titled "Day 5" but Oct 7 is Day 4
- **Fix**: 
  - Renamed: `2025-10-07-day-5-move-to-normal-ward.md` → `2025-10-07-day-4-move-to-normal-ward.md`
  - Changed title from "Day 5 of Recovery" to "Day 4 of Recovery"
- **Files**: Both Statiq and Docusaurus versions

## Fixes Needed for PR #49

PR #49 titled "Add Day 6 blog post about progress on normal ward" needs the following corrections:

### Issue
- Post is titled "Day 6" and dated "Monday, 7th October 2025"
- But October 7 is Day 4 (when patient moved TO the ward)
- The "first full day ON the ward" would be the next day (Day 5)

### Required Changes
1. **Rename files**:
   - `2025-10-07-day-6-normal-ward-progress.md` → `2025-10-08-day-5-normal-ward-progress.md`

2. **Update frontmatter**:
   - Change `Title: Day 6` to `Title: Day 5` (Statiq)
   - Change `title: "Day 6"` to `title: "Day 5"` (Docusaurus)
   - Change `Published: 2025-10-07` to `Published: 2025-10-08`
   - Change `Date: 2025-10-07` to `Date: 2025-10-08`
   - Change `date: "2025-10-07"` to `date: "2025-10-08"` (Docusaurus)

3. **Update body text**:
   - Change "Monday, 7th October 2025" to "Tuesday, 8th October 2025"

### Files to Update in PR #49
- `src/blog/input/posts/2025-10-07-day-6-normal-ward-progress.md`
- `src/docs/blog/2025-10-07-day-6-normal-ward-progress.md`

## Verification
Both Statiq (.NET) and Docusaurus (Node.js) builds pass successfully with the applied fixes.
