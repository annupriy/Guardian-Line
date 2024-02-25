// pages/api/reports.js

import { hasReported } from '@/server/db/userReports';

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const userName = searchParams.get("userName");

  try {
    const reportsPresent = await hasReported(userName);
    return Response.json({ reportsPresent });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return Response.error("Internal Server Error' ");
  }
}
