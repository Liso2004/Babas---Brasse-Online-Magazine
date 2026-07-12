export function FigmaSupportPanel({ as: Tag = "section", className = "", children, ...props }) {
  return (
    <Tag className={`figma-support-panel ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}

export function FigmaSupportGrid({ as: Tag = "section", className = "", children, ...props }) {
  return (
    <Tag className={`figma-support-grid ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}