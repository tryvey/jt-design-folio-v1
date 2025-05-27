import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { parseFrontmatter } from './utils';

export default function CaseStudyPage({ file }) {
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({});

  useEffect(() => {
    async function fetchCaseStudy() {
      const res = await fetch(file);
      const text = await res.text();
      const { meta, body } = parseFrontmatter(text);
      setMeta(meta);
      setContent(body);
    }
    fetchCaseStudy();
  }, [file]);

  return (
    <section className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-3xl mx-auto py-16 px-4 ">
        {meta.coverImage && (
          <img src={meta.coverImage} alt={meta.title} className="rounded-3xl mb-8 w-full object-cover" style={{maxHeight: 320}} />
        )}
        <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
        {meta.excerpt && <p className="text-lg text-neutral-600 mb-6">{meta.excerpt}</p>}

        <div className='text-left custom-markdown-style'><ReactMarkdown>{content}</ReactMarkdown></div>
        

      </div>
    </section>
  );
}
