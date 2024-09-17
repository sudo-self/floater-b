import { generateFileContent } from '@/app/generateFileContent';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const bgImageUrl = searchParams.get('bgImageUrl') || '';
    const tooltipText = searchParams.get('tooltipText') || '';
    const iframeUrl = searchParams.get('iframeUrl') || '';

    // Basic validation (can be customized as needed)
    if (!bgImageUrl || !iframeUrl) {
      return new Response('Missing required parameters', { status: 400 });
    }

    // Generate file content
    const fileContent = generateFileContent({ bgImageUrl, tooltipText, iframeUrl });

    return new Response(fileContent, {
      headers: {
        'Content-Type': 'application/javascript',
        // Optional caching headers
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    // Handle errors
    console.error('Error generating file content:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
