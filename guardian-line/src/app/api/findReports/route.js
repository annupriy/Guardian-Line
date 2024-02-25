// pages/api/reports.js

import { hasReported } from '@/server/db/userReports';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Not fetching' });
  }

  const { userName } = req.query;

  try {
    const reportsPresent = await hasReported(userName);
    res.status(200).json({ reportsPresent });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
