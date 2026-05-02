import { ReactNode } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

interface Props {
  contentKey: string;
  fallback: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
}

/**
 * Inline-editable text bound to site_content.
 * Wrap any visible label/heading with <EditableText contentKey="hero.title" fallback="..." />
 * Developers can switch to "pick mode" in InlineContentEditor and click directly to edit.
 */
const EditableText = ({ contentKey, fallback, as: Tag = "span", className }: Props) => {
  const { get } = useSiteContent();
  const value = get(contentKey, fallback);
  const Component = Tag as any;
  return <Component data-content-key={contentKey} className={className}>{value}</Component>;
};

export default EditableText;