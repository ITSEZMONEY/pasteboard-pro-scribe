## 2023-10-24 - Accessibility improvements for Modals
**Learning:** Icon-only buttons and naked inputs inside modals are often missing descriptive `aria-labels` or `aria-labelledby` attributes. Explicitly associating headings with inputs in this design system helps screen reader users navigate more effectively.
**Action:** Always check for `aria-label` on icon-only buttons (like Close and Rerun) and `aria-labelledby` on form elements (like textareas) inside new and existing modal components.
