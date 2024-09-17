// app/api/generate-floater/route.js

import { generateFileContent } from '@/app/generateFileContent';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const bgImageUrl = searchParams.get('bgImageUrl') || '';
  const tooltipText = searchParams.get('tooltipText') || '';
  const iframeUrl = searchParams.get('iframeUrl') || '';

  const fileContent = generateFileContent({ bgImageUrl, tooltipText, iframeUrl });

  return new Response(fileContent, {
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
}
