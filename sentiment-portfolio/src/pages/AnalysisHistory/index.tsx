import React, { useEffect, useState } from 'react';
import { sentimentService } from '../../services/sentimentService.ts';
import { Card } from '../../components/common/Card.tsx';
import { Button } from '../../components/common/Button.tsx';
import { SentimentAnalysis } from '../../types';

export const AnalysisHistory: React.FC = () => {
  const [history, setHistory] = useState<SentimentAnalysis[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await sentimentService.getAnalysisHistory(pageNum, 10);
      setHistory(res.data);
      setPages(res.pagination.pages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl px-4 mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Analysis History</h1>
        <Card>
          {loading ? (
            <div className="py-10 text-center text-gray-400">Loading...</div>
          ) : history.length === 0 ? (
            <div className="py-10 text-center text-gray-400">No analyses found.</div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {history.map(item => (
                <li key={item.id} className="flex flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 capitalize dark:text-white">
                      {item.sentiment} <span className="text-xs text-gray-500">({Math.round(item.confidence * 100)}%)</span>
                    </div>
                    <div className="max-w-xs text-sm text-gray-500 truncate">{item.text.slice(0, 60)}{item.text.length > 60 ? '…' : ''}</div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <span className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</span>
                    {/* Could add a details button/modal here */}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              Prev
            </Button>
            <span className="px-3 py-1 text-sm">{page} / {pages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}>
              Next
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AnalysisHistory;
