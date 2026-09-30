/**
 * Prefixes root-relative links in Markdown/MDX with the site's base path, so docs
 * can keep writing `/docs/quick-start/` and still work when the site is served
 * from a subfolder. Covers <a href> in Markdown and `href` props on MDX
 * components such as <LinkCard>.
 */
export function rehypeBaseLinks({ base = '/' } = {}) {
  const prefix = base.replace(/\/+$/, '');
  const fix = (href) =>
    typeof href === 'string' && prefix && href.startsWith('/') && !href.startsWith('//') && !href.startsWith(`${prefix}/`)
      ? `${prefix}${href}`
      : href;

  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && node.properties) {
      node.properties.href = fix(node.properties.href);
    }
    if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && Array.isArray(node.attributes)) {
      for (const attribute of node.attributes) {
        if (attribute.type === 'mdxJsxAttribute' && attribute.name === 'href') attribute.value = fix(attribute.value);
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(visit);
  };

  return (tree) => visit(tree);
}
