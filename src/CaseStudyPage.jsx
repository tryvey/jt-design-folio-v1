import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function CaseStudyPage({ file }) {
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({});

  useEffect(() => {
    async function fetchCaseStudy() {
      const res = await fetch(file);
      const text = await res.text();
      // Parse frontmatter
      const match = text.match(/^---([\s\S]*?)---/);
      let metaObj = {};
      let body = text;
      if (match) {
        const metaStr = match[1];
        metaStr.split('\n').forEach(line => {
          const [key, ...rest] = line.split(':');
          if (key && rest.length) metaObj[key.trim()] = rest.join(':').trim();
        });
        body = text.replace(/^---([\s\S]*?)---/, '').trim();
      }
      setMeta(metaObj);
      setContent(body);
    }
    fetchCaseStudy();
  }, [file]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-3xl mx-auto py-16 px-4">
        {meta.coverImage && (
          <img src={meta.coverImage} alt={meta.title} className="rounded-2xl mb-8 w-full object-cover" style={{maxHeight: 320}} />
        )}
        <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
        {meta.excerpt && <p className="text-lg text-neutral-600 mb-6">{meta.excerpt}</p>}
        <ReactMarkdown>{content}</ReactMarkdown>
        {meta.link && (
          <a href={meta.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-8 text-blue-600 underline font-semibold">View on Figma</a>
        )}
      </div>
    </div>
  );
}
