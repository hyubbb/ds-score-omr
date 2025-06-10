// HTML 태그 제거
export function removeTags(html: string): string {
  const cleanHtml = html.replace(/<[^>]*>|&nbsp;/g, '');
  return cleanHtml;
}

export const renderHTML = (htmlContent: string) => {
  // Function to add padding after <br> tags inside <p> tags
  const htmlWithGap = htmlContent?.replace(/<p>(.*?)<\/p>/g, (match, pContent) => {
    // Add 8px margin after <br> tags within <p> content
    const contentWithGap = pContent?.replace(/<br\s*\/?>/g, '<br style="margin-bottom: 8px;" />');
    return `<p>${contentWithGap}</p>`;
  });

  return { __html: htmlWithGap };
};
